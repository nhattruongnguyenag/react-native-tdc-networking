import { Keyboard, Platform, View, Text, StyleSheet, Animated, PanResponder, Modal, TouchableOpacity, TextInput, SafeAreaView, FlatList, Alert } from 'react-native'
import React, { useRef, useState, useEffect, useCallback, memo } from 'react'
import { WINDOW_HEIGHT } from '../../utils/SystemDimensions'
import { COLOR_BLACK, COLOR_BLUE_BANNER, COLOR_BUTTON, COLOR_GREY, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomizeComment from '../post/CustomizeCommentPost';
import { useAppDispatch, useAppSelector } from '../../redux/Hook';
import { closeModalComments, updatePostWhenHaveChangeComment } from '../../redux/Slice';
import { Comment } from '../../types/Comment';
import { numberDayPassed } from '../../utils/FormatTime';
import { isBlank, isLengthInRange, isNotBlank } from '../../utils/ValidateUtils';
import { Client, Frame } from 'stompjs';
import { getStompClient } from '../../sockets/SocketClient';
import { NUMBER_MAX_CHARACTER, NUMBER_MIN_CHARACTER } from '../../constants/Variables';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { PROFILE_SCREEN } from '../../constants/Screen';
import { useTranslation } from 'react-multi-lang';
import { getFacultyTranslated } from '../../utils/GetFacultyTranslated ';
import { ActivityIndicator } from 'react-native-paper';

//  Constant
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.9;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.5;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
let stompClient: Client

interface LoadingCommentProps {
    t: ReturnType<typeof useTranslation>
}
export function LoadingComment(props: Readonly<LoadingCommentProps>) {
    return <View
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60%' }}
    ><View><ActivityIndicator color={COLOR_BLUE_BANNER} /><Text style={{ color: COLOR_GREY }}>{props.t("ModalLoadingComment.modalLoadingCommentTitle")}</Text></View></View>
}

const CustomizeModalComments = () => {
    const t = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { modalCommentData, userIdOfProfileNow, currentScreenNowIsProfileScreen } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const [haveChange, setHaveChange] = useState(false);
    // Variable
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState();
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
    const inputRef = useRef<TextInput>(null);
    const [myComment, setMyComment] = useState<string>('');
    const [idReply, setIdReply] = useState(0);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const dispatch = useAppDispatch();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gesture) => {
                animatedValue.setOffset(lastGestureDy.current)
            },
            onPanResponderMove: (e, gesture) => {
                animatedValue.setValue(gesture.dy);
            },
            onPanResponderRelease: (e, gesture) => {
                animatedValue.flattenOffset()
                if (gesture.dy > 0) {
                    if (gesture.dy <= DRAG_THRESHOLD) {
                        springAnimation('up')
                    } else {
                        springAnimation('down')
                    }
                } else {
                    if (gesture.dy >= -DRAG_THRESHOLD) {
                        springAnimation('down')
                    } else {
                        springAnimation('up')
                    }
                }
            }
        }),
    ).current


    const bottomSheetAnimation = {
        transform: [{
            translateY: animatedValue.interpolate({
                inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                extrapolate: 'clamp'
            })
        }]
    }

    const springAnimation = (direction: 'up' | 'down') => {
        lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y
        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: true,
        }).start();
    }

    const handleClickIntoBtnIconClose = async () => {
        dispatch(closeModalComments());
        if (haveChange) {
            dispatch(updatePostWhenHaveChangeComment(true))
        }

    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e: any) => {
            setKeyboardStatus(true);
            springAnimation('up');
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [keyboardStatus]);

    // Send data to server
    const handleSubmitEvent = () => {
        if (isNotBlank(myComment.trim()) && isLengthInRange(myComment, NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER)) {
            setHaveChange(true);
            Keyboard.dismiss();
            const newComment = {
                postId: modalCommentData?.id,
                userId: userLogin?.id,
                content: myComment,
                parentCommentId: idReply
            }
            createComment(newComment);
            setIdReply(0);
        } else {
            if (isBlank(myComment.trim()) && isLengthInRange(myComment, NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER)) {
                Alert.alert(t("ModalComment.modalCommentCreateFail"), t("ModalComment.modalCommentCommentNotNull") + ", " + t("ModalComment.modalCommentTextNumberLimited") + NUMBER_MAX_CHARACTER + " " + t("ModalComment.modalCommentTextChar"));
            } else if (isBlank(myComment.trim())) {
                Alert.alert(t("ModalComment.modalCommentCreateFail"), t("ModalComment.modalCommentCommentNotNull"));
            } else {
                Alert.alert(t("ModalComment.modalCommentCreateFail"), t("ModalComment.modalCommentCommentNotNull") + NUMBER_MAX_CHARACTER + " " + t("ModalComment.modalCommentTextNumberLimited"));
            }
        }
    }

    // Reply comment
    const handleClickToCommentReplyEvent = useCallback((commentReplyId: number) => {
        setIdReply(commentReplyId);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    // Delete comments
    const handleClickToDeleteCommentsEvent = useCallback(async (commentDeleteId: number) => {
        const dataToDeleteComment = {
            "commentId": commentDeleteId,
            "postId": modalCommentData?.id,
            "userId": userLogin?.id
        }
        deleteComment(dataToDeleteComment);
    }, [])

    // 
    const handleClickToAvatarAndName = useCallback((userId: number) => {
        if (userIdOfProfileNow !== userId) {
            dispatch(closeModalComments());
            if (currentScreenNowIsProfileScreen) {
                navigation.replace(PROFILE_SCREEN, { userId: userId, group: modalCommentData?.group ?? '' })
            } else {
                navigation.navigate(PROFILE_SCREEN, { userId: userId, group: modalCommentData?.group ?? '' })
            }
        }
    }, [])

    // Socket
    useEffect(() => {
        stompClient = getStompClient()
        const onConnected = () => {
            stompClient.subscribe(`/topic/posts/${modalCommentData?.id}`, onMessageReceived)
            stompClient.send(`/app/posts/${modalCommentData?.id}/comments/listen`)
        }
        const onMessageReceived = (payload: any) => {
            setComments(JSON.parse(payload.body));
            setIsLoading(false);
        }

        const onError = (err: string | Frame) => {
        }
        stompClient.connect({}, onConnected, onError)
    }, [])

    const createComment = useCallback((newComment: object) => {
        stompClient.send(`/app/posts/${modalCommentData?.id}/comments`, {}, JSON.stringify(newComment))
        setMyComment('');
    }, [myComment])

    const deleteComment = useCallback((comment: object) => {
        setHaveChange(true);
        stompClient.send(`/app/posts/${modalCommentData?.id}/comments/delete`, {}, JSON.stringify(comment))
        setMyComment('');
    }, [myComment])

    return (
        <Modal
            animationType='slide'
            transparent
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
                    <View style={styles.dragHandleArea}
                        {...panResponder.panHandlers}>
                        <View style={styles.dragHandle}>
                            <Text style={styles.headerTitle}>{t("Comment.modalListCommentTitle")}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleClickIntoBtnIconClose()}
                            style={styles.btnIconClose}
                        >
                            <IconAntDesign
                                name='close' size={25} color={COLOR_BLACK} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerComments}>
                        {
                            isLoading ? <LoadingComment t={t} /> : <FlatList
                                automaticallyAdjustKeyboardInsets={true}
                                contentContainerStyle={{ paddingBottom: '50%' }}
                                showsVerticalScrollIndicator={false}
                                data={comments}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                    return item.parent === null ?
                                        <CommentExport
                                            t={t}
                                            userCreatedPostId={modalCommentData?.userCreatedPostId ?? 0}
                                            commentItem={item}
                                            userLoginId={userLogin?.id}
                                            handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
                                            handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent}
                                            handleClickToAvatarAndName={handleClickToAvatarAndName}
                                        />
                                        : <></>
                                }}
                            />
                        }
                    </View>
                </Animated.View>
                {
                    !isLoading && <SafeAreaView style={keyboardStatus ? [styles.textInput, { bottom: '41%' }] : [styles.textInput, { bottom: '0%' }]}>
                        <TextInput
                            ref={inputRef}
                            value={myComment}
                            onChangeText={(value) => {
                                setMyComment(value)
                            }}
                            placeholderTextColor={COLOR_BLACK}
                            style={styles.txtPlaceholder}
                            placeholder={t("CreateCommentToolbar.commentPlaceholderInput")}
                        />
                        <TouchableOpacity
                            onPress={() => handleSubmitEvent()}>
                            <IconFontAwesome
                                name='send' size={25} color={COLOR_BUTTON} />
                        </TouchableOpacity>
                    </SafeAreaView>
                }
            </View >
        </Modal >
    )
}

export interface CommentChildrenType {
    t: ReturnType<typeof useTranslation>
    userCreatedPostId: number,
    commentItem: Comment,
    userLoginId: number | undefined,
    handleClickToCommentReplyEvent: (id: number) => void,
    handleClickToDeleteCommentsEvent: (idComment: number) => void,
    handleClickToAvatarAndName: (userId: number) => void,
}

const CommentExport = (item: CommentChildrenType) => {
    const hasChildren = item.commentItem.childrens && item.commentItem.childrens.length > 0;
    const [seeMore, setSeeMore] = useState(false);
    const handleSeeMoreClick = () => {
        setSeeMore(!seeMore);
    }
    return <>
        <CustomizeComment
            tagName={getFacultyTranslated(item.commentItem?.parent?.['name'] ?? "", item.t)}
            userId={item.userLoginId}
            authorCommentId={item.commentItem.user['id']}
            type={item.commentItem.parent === null ? 0 : 1}
            key={item.commentItem.id}
            id={item.commentItem.id}
            name={getFacultyTranslated(item.commentItem.user.name, item.t)}
            content={item.commentItem.content}
            avatar={item.commentItem.user.image}
            timeCreated={numberDayPassed(item.commentItem.createdAt)}
            handleClickToCommentReplyEvent={item.handleClickToCommentReplyEvent}
            handleClickToDeleteCommentsEvent={item.handleClickToDeleteCommentsEvent}
            handleClickToAvatarAndName={item.handleClickToAvatarAndName}
            textDelete={item.t("Comment.commentDeleteComment")}
            textReply={item.t("Comment.commentReplyComment")}
            textCommentOfAuthor={item.t("Comment.commentAuthor")}
            userCreatedPostId={item.userCreatedPostId}
        />
        {
            hasChildren && (<>
                <TouchableOpacity
                    onPress={() => { setSeeMore(!seeMore) }}
                    style={styles.txtActivity}
                >
                    <Text style={{ color: COLOR_GREY }}>{seeMore ? item.t("CommentContainer.commentContainerComponentHidden") : item.t("CommentContainer.commentContainerComponentSeeMore")}</Text>
                </TouchableOpacity>
                {
                    seeMore && (
                        <FlatList
                            data={item.commentItem.childrens}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item: child }) => <CommentExport
                                t={item.t}
                                userCreatedPostId={item.userCreatedPostId}
                                commentItem={child}
                                handleClickToCommentReplyEvent={item.handleClickToCommentReplyEvent}
                                handleClickToDeleteCommentsEvent={item.handleClickToDeleteCommentsEvent}
                                userLoginId={item.userLoginId}
                                handleClickToAvatarAndName={item.handleClickToAvatarAndName} />}
                        />
                    )
                }
            </>
            )
        }
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_MODAL
    },
    bottomSheet: {
        position: 'absolute',
        width: '100%',
        height: BOTTOM_SHEET_MAX_HEIGHT,
        bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
        backgroundColor: COLOR_WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: COLOR_BLACK,
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
            },
        })
    },
    dragHandleArea: {
        width: '100%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center",
        borderBottomWidth: 0.2,
        borderColor: COLOR_GREY
    },
    dragHandle: {
        width: 100,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnIconClose: {
        position: 'absolute',
        right: 20
    },
    headerTitle: {
        color: COLOR_BLACK,
        fontWeight: 'bold',
        fontSize: 16
    },
    containerComments: {
    },
    txtActivity: {
        color: COLOR_GREY,
        marginLeft: 55
    },
    textInput: {
        position: "absolute",
        backgroundColor: 'rgb(250 250 250)',
        height: 60,
        width: '100%',
        borderTopWidth: 0.2,
        borderTopColor: COLOR_GREY,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtPlaceholder: {
        width: '90%', height: '100%', paddingLeft: 20
    }
})
export default memo(CustomizeModalComments)