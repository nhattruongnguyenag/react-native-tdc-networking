import { Keyboard, Platform, View, Text, StyleSheet, Animated, PanResponder, Modal, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { WINDOW_HEIGHT } from '../../utils/SystemDimensions'
import { COLOR_BLACK, COLOR_BUTTON, COLOR_GREY, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomizeComment from '../post/CustomizeComment';
import { useAppDispatch, useAppSelector } from '../../redux/Hook';
import { closeModalComments } from '../../redux/Slice';
import { TEXT_HIDDEN_COMMENTS, TEXT_PLACEHOLDER_INPUT_COMMENT, TEXT_SEE_MORE_COMMENTS, TEXT_TITLE_COMMENT } from '../../constants/StringVietnamese';
import { userIdTest } from '../DataBase';
import { Comment } from '../../types/Comment';
import { formatDateTime } from '../../utils/FormatTime';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../constants/SystemConstant';
import { callApiComment } from '../../api/CallApi';

//  Constant
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.9;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.5;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const CustomizeModalComments = () => {

    // Variable

    const urlApiCreateComment = SERVER_ADDRESS + 'api/posts/comment'
    const inputRef = useRef<any>();
    const [myComment, setMyComment] = useState('');
    const [idReply, setIdReply] = useState(0);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const { modalCommentData } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const dispatch = useAppDispatch();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);

    // Function

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

    const handleClickIntoBtnIconClose = () => {
        dispatch(closeModalComments());
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
    const handleSubmitEvent = async () => {
        if (myComment.trim() !== '' || myComment.trim() !== null) {
            Keyboard.dismiss();
            const comments = {
                "postId": modalCommentData?.id,
                "userId": userIdTest,
                "content": myComment,
                "parentCommentId": idReply
            }
            const result = await callApiComment(urlApiCreateComment, comments);
            console.log(result);
            setMyComment('');
        }
    }

    // Reply comment
    const handleClickToCommentReplyEvent = (commentReplyId: number) => {
        console.log(commentReplyId);
        setIdReply(commentReplyId);
        inputRef.current.focus();
    }

    // Delete comments
    const handleClickToDeleteCommentsEvent = (commentDeleteId: number) => {
        console.log('delete comment have id: ' + commentDeleteId + " by author have id not finish by hong developer");
    }

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
                            <Text style={styles.headerTitle}>{TEXT_TITLE_COMMENT}</Text>
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
                        <FlatList
                            refreshing={false}
                            onRefresh={() => { console.log('call api comment pls') }}
                            automaticallyAdjustKeyboardInsets={true}
                            contentContainerStyle={{ paddingBottom: '50%' }}
                            showsVerticalScrollIndicator={false}
                            data={modalCommentData?.commentFather}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                return item.parentId === null ? <>
                                    <CommentExport
                                        commentItem={item}
                                        handleClickToCommentReplyEvent={handleClickToCommentReplyEvent}
                                        handleClickToDeleteCommentsEvent={handleClickToDeleteCommentsEvent} />
                                </> : <></>
                            }}
                        />
                    </View>
                </Animated.View>
                <SafeAreaView style={keyboardStatus ? [styles.textInput, { bottom: '41%' }] : [styles.textInput, { bottom: '0%' }]}>
                    <TextInput
                        ref={inputRef}
                        value={myComment}
                        onChangeText={(value) => {
                            setMyComment(value)
                        }}
                        placeholderTextColor={COLOR_BLACK}
                        style={styles.txtPlaceholder}
                        placeholder={TEXT_PLACEHOLDER_INPUT_COMMENT}
                    />
                    <TouchableOpacity
                        onPress={() => handleSubmitEvent()}>
                        <IconFontAwesome
                            name='send' size={25} color={COLOR_BUTTON} />
                    </TouchableOpacity>
                </SafeAreaView>
            </View >
        </Modal >
    )
}

export interface CommentChildrenType {
    commentItem: Comment,
    handleClickToCommentReplyEvent: (id: number) => void,
    handleClickToDeleteCommentsEvent: (idComment: number) => void
}

const CommentExport = (item: CommentChildrenType) => {
    const hasChildren = item.commentItem.childrens && item.commentItem.childrens.length > 0;
    const [seeMore, setSeeMore] = useState(false);
    const handleSeeMoreClick = () => {
        setSeeMore(!seeMore);
    }
    return <>
        <CustomizeComment
            userId={userIdTest}
            authorCommentId={userIdTest}
            type={item.commentItem.parentId === null ? 0 : 1}
            key={item.commentItem.id}
            id={item.commentItem.id}
            name={item.commentItem.user.name}
            content={item.commentItem.content}
            avatar={item.commentItem.user.image}
            timeCreated={formatDateTime(item.commentItem.createdAt)}
            handleClickToCommentReplyEvent={item.handleClickToCommentReplyEvent}
            handleClickToDeleteCommentsEvent={item.handleClickToDeleteCommentsEvent}
        />
        {
            hasChildren && (<>
                <TouchableOpacity
                    onPress={() => { setSeeMore(!seeMore) }}
                    style={styles.txtActivity}
                >
                    <Text style={{ color: COLOR_GREY }}>{seeMore ? TEXT_HIDDEN_COMMENTS : TEXT_SEE_MORE_COMMENTS}</Text>
                </TouchableOpacity>
                {
                    seeMore && (<>
                        <FlatList
                            data={item.commentItem.childrens}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item: child }) => <CommentExport
                                commentItem={child}
                                handleClickToCommentReplyEvent={item.handleClickToCommentReplyEvent}
                                handleClickToDeleteCommentsEvent={item.handleClickToDeleteCommentsEvent}
                            />}
                        />
                    </>)
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
export default CustomizeModalComments
