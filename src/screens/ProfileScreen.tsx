import { FlatList, View, ScrollView, RefreshControl, StyleSheet, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL_GET_POST_BY_USER_ID, API_URL_LIKE } from '../constants/Path';
import CustomizePost from '../components/post/CustomizePost';
import { LikeAction } from '../types/LikeActions';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, updatePostWhenHaveChangeComment } from '../redux/Slice';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import CustomizeModalLoading from '../components/modal/CustomizeModalLoading';
import { CALL_ACTION, CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND, TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../constants/Variables';
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, OPTION_SCREEN, PROFILE_SCREEN } from '../constants/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomizeModalBigImageShow from '../components/modal/CustomizeModalBigImageShow';
import { useIsFocused } from '@react-navigation/native';
import { Student } from '../types/Student';
import { Faculty } from '../types/Faculty';
import { Business } from '../types/Business';
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { COLOR_BLACK, COLOR_WHITE } from '../constants/Color';

const ProfileScreen = ({ route }: any) => {
    const [imageToShow, setImageToShow] = useState<string>('');
    const [isShowAvatar, setIsShowAvatar] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const { userId, group } = route.params;
    const [post, setPost] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<Student | Faculty | Business | null>();
    const [typeAuthorPost, setTypeAuthorPost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { updatePost } = useAppSelector((state) => state.TDCSocialNetworkReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPostByUserIdAPI();
        dispatch(updatePostWhenHaveChangeComment(false))
    }, [updatePost])

    useEffect(() => {
        if (post.length != 0) {
            setIsLoading(false);
        }
    }, [post])

    useEffect(() => {
        dispatch(setCurrentScreenNowIsProfileScreen(true));
    }, [])

    const getPostByUserIdAPI = useCallback(() => {
        dispatch(goToProfileScreen(userId))
        axios.post(API_URL_GET_POST_BY_USER_ID, {
            "userId": userId,
            "groupCode": group,
            "userLogin": userLogin?.id
        })
            .then((response) => {
                setTypeAuthorPost(response.data.data.user['roleCodes']);
                setUserInfo(response.data.data.user);
                setPost(response.data.data.posts);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        getPostByUserIdAPI();
    }, [getPostByUserIdAPI, isFocused])

    const likeAction = (obj: LikeAction) => {
        like(obj)
    }

    const like = useCallback(async (likeData: LikeAction) => {
        axios.post(API_URL_LIKE, {
            "postId": likeData.postId,
            "userId": likeData.userId
        }).then((response) => {
            if (response.data.status === 201) {
                getPostByUserIdAPI();
            }
        }).catch((error) => {
            console.error(error);
        })
    }, [])

    const handleClickToCreateButtonEvent = (type: string) => {
        if (type === TYPE_NORMAL_POST) {
            navigation.navigate(CREATE_NORMAL_POST_SCREEN, { group: -1 });
        } else if (type === TYPE_RECRUITMENT_POST) {
            navigation.navigate(CREATE_RECRUITMENT_SCREEN);
        } else {
            navigation.navigate(CREATE_SURVEY_SCREEN);
        }
    }

    const handleClickIntoAvatar = () => {
        navigation.navigate(PROFILE_SCREEN, { userId: userLogin?.id ?? 0, group: group })
    }

    const handleUnSave = () => {
        
    }

    const renderItem = (item: any) => {
        return (
            <CustomizePost
                id={item.id}
                userId={item.user['id']}
                name={item.user['name']}
                avatar={item.user['image']}
                typeAuthor={'Doanh Nghiệp'}
                available={null}
                timeCreatePost={item.createdAt}
                content={item.content}
                type={item.type}
                likes={item.likes}
                comments={item.comment}
                commentQty={item.commentQuantity}
                images={item.images}
                role={item.user['roleCodes']}
                likeAction={likeAction}
                location={item.location ?? null}
                title={item.title ?? null}
                expiration={item.expiration ?? null}
                salary={item.salary ?? null}
                employmentType={item.employmentType ?? null}
                description={item.description ?? null}
                isSave={item.isSave}
                group={group} 
                handleUnSave={handleUnSave}                
            />
        )
    }

    const handleClickButtonEvent = (flag: number) => {
        if (flag === MESSENGER_ACTION) {
            console.log('chat');
        } else if (flag === FOLLOW_ACTION) {
            console.log('follow');
        } else if (flag === CALL_ACTION) {
            console.log('call');
        } else {
            handleClickIntoButtonMenu3dotEvent();
        }
    }

    const handleClickIntoButtonMenu3dotEvent = () => {
        navigation.navigate(OPTION_SCREEN);
    }

    const handleClickIntoHeaderComponentEvent = (flag: number) => {
        switch (flag) {
            case CLICK_CAMERA_AVATAR_EVENT:
                console.log('CLICK_CAMERA_AVATAR_EVENT');
                break;
            case CLICK_CAMERA_BACKGROUND_EVENT:
                console.log('CLICK_CAMERA_BACKGROUND_EVENT');
                break;
            case SEE_AVATAR:
                // setImageToShow(userInfo?.image ?? '')
                setIsShowAvatar(true)
                break;
            case SEE_BACKGROUND:
                // setImageToShow(userInfo?.background ?? '')
                setIsShowAvatar(true)
                break;
            default:
                break;
        }
    }

    const handleCloseModal = () => {
        setIsShowAvatar(false);
    }

    return (
        <View>
            {
                isLoading ? <CustomizeModalLoading /> : <>
                    <CustomizeModalBigImageShow
                        visible={isShowAvatar}
                        image={userInfo?.image ?? ''}
                        handleCloseModal={handleCloseModal} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={() => {
                                    getPostByUserIdAPI();
                                }}
                            />
                        }
                    >
                        <CustomizeProfile
                            data={post}
                            role={typeAuthorPost}
                            userData={userInfo}
                            handleClickButtonEvent={handleClickButtonEvent}
                            handleClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent} />

                        <View style={styles.titlePostArea}>
                            <Text style={styles.txtTitlePostArea}>
                                {
                                    userInfo?.name
                                }
                                {' '}
                                <IconAntDesign name='caretright' size={15} color={COLOR_BLACK} />
                                {' '}
                                {
                                    group
                                }
                            </Text>
                        </View>
                        {
                            post.length !== 0 && <FlatList
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                data={post}
                                renderItem={({ item }) => renderItem(item)}
                            />
                        }
                    </ScrollView>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperCreateNormalPostToolbar: {
        marginBottom: 20
    },
    titlePostArea: {
        backgroundColor: COLOR_WHITE,
        paddingVertical: 5,
        marginBottom: 1,
        paddingLeft: 10,
    },
    txtTitlePostArea: {
        color: COLOR_BLACK
    }
})
export default ProfileScreen

