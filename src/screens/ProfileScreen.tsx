import { FlatList, View, ScrollView, RefreshControl, StyleSheet, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { API_URL_DELETE_POST, API_URL_FOLLOW, API_URL_LIKE, API_URL_SAVE_POST } from '../constants/Path';
import CustomizePost from '../components/post/CustomizePost';
import { LikeAction } from '../types/LikeActions';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, setSelectConversation } from '../redux/Slice';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import { CALL_ACTION, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND } from '../constants/Variables';
import { MESSENGER_SCREEN, OPTION_SCREEN } from '../constants/Screen';
import { useNavigation, useIsFocused, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomizeModalBigImageShow from '../components/modal/CustomizeModalBigImageShow';
import { Student } from '../types/Student';
import { Faculty } from '../types/Faculty';
import { Business } from '../types/Business';
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { COLOR_BLACK, COLOR_WHITE } from '../constants/Color';
import { getGroupForPost } from '../utils/GetGroup';
import { User } from '../types/User';
import { deletePostAPI, followAPI, likePostAPI, savePostAPI, updateImageUserProfile } from '../api/CallApi';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { ToastMessenger } from '../utils/ToastMessenger';
import { useTranslation } from 'react-multi-lang';
import ActionSheet from 'react-native-actionsheet';
import CustomizeModalShowBackgroundUpdate from '../components/modal/CustomizeModalShowBackgroundUpdate';
import SkeletonPost from '../components/SkeletonPost';
import { useGetPostsByIdQuery } from '../redux/Service';
import { getPostActive } from '../utils/GetPostActive';
import { getFacultyTranslated } from '../utils/GetFacultyTranslated ';
import { Post } from '../types/Post';
import ImagePicker from '../components/ImagePicker';
import { handleUploadImage } from '../utils/ImageHelper';
import { Asset } from 'react-native-image-picker';

const ProfileScreen = () => {
    const t = useTranslation();
    const [imagePicker, setImagePicker] = useState<Asset[] | null>(null);
    const route = useRoute<RouteProp<RootStackParamList, 'PROFILE_SCREEN'>>()
    const [imageFocus, setImageFocus] = useState<string>("");
    const { userId, group } = route.params ?? { userId: 0, group: "" };
    const [loadingBackground, setLoadingBackground] = useState(false);
    const [isCalled, setIsCalled] = useState(false);
    const [isShowAvatar, setIsShowAvatar] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const [post, setPost] = useState<Post[]>([]);
    const [userInfo, setUserInfo] = useState<Student | Faculty | Business | null>();
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [typeAuthorPost, setTypeAuthorPost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>();
    const [userInformation, setUserInfomation] = useState({
        userId: userLogin?.id ?? 0,
        avatar: undefined
    });
    const dispatch = useAppDispatch()

    const { data, isFetching } = useGetPostsByIdQuery(
        {
            userId: userId,
            groupCode: group,
            userLogin: userLogin?.id ?? 0
        },
        {
            pollingInterval: 2000
        }
    );

    console.log();

    useEffect(() => {
        if (data) {
            setIsLoading(false);
            setIsCalled(true);
            if (data.data.user !== null) {
                setTypeAuthorPost(data.data.user['roleCodes']);
                setUserInfo(data.data.user);
            }
            setIsFollow(data.data.isFollow)
            setPost(data.data.posts);
            setIsLoading(false);
        }
    }, [data])


    useEffect(() => {
        if (Boolean(post)) {
            if (post.length != 0 || isCalled) {
                setIsLoading(false);
            }   
        }
    }, [post, isCalled])

    useEffect(() => {
        dispatch(setCurrentScreenNowIsProfileScreen(true));
    }, [])

    useEffect(() => {
        dispatch(goToProfileScreen(userId))
    }, [userId])

    const likeAction = (obj: LikeAction) => {
        like(obj)
    }

    const like = useCallback(async (likeData: LikeAction) => {
        const data = {
            "postId": likeData.postId,
            "userId": likeData.userId
        }
        const status = await likePostAPI(API_URL_LIKE, data);
        ToastMessenger(status, 201, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
    }, [])

    const handleDeletePost = async (id: number) => {
        const status = await deletePostAPI(API_URL_DELETE_POST, id);
        ToastMessenger(status, 200, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
    }

    const handleSavePost = async (id: number) => {
        const data = {
            "userId": userLogin?.id,
            "postId": id
        }
        const status = await savePostAPI(API_URL_SAVE_POST, data);
        ToastMessenger(status, 201, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
    }

    const renderItem = useCallback((item: any) => {
        if (getPostActive(item.active)) {
            return (
                <CustomizePost
                    id={item.id}
                    userId={item.user['id']}
                    name={item.user['name']}
                    avatar={item.user['image']}
                    typeAuthor={item.user['roleCodes']}
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
                    handleUnSave={handleSavePost}
                    handleDelete={handleDeletePost}
                    active={item.active}
                />
            )
        } else {
            return null;
        }
    }, [post]
    )


    const handleClickButtonEvent = (flag: number) => {
        if (flag === MESSENGER_ACTION) {
            if (userLogin && userInfo) {
                dispatch(setSelectConversation({
                    receiver: userInfo as User,
                    sender: userLogin
                }))
            }
            navigation.navigate(MESSENGER_SCREEN)
        } else if (flag === FOLLOW_ACTION) {
            handleClickFollowEvent();
        } else if (flag === CALL_ACTION) {
            console.log('call');
        } else {
            handleClickIntoButtonMenu3dotEvent();
        }
    }

    const handleClickFollowEvent = async () => {
        const followData = {
            "userFollowId": userId,
            "userId": userLogin?.id
        }
        setIsFollow(!isFollow);
        const status = await followAPI(API_URL_FOLLOW, followData);
        ToastMessenger(status, 200, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
    }

    const handleClickIntoButtonMenu3dotEvent = () => {
        navigation.navigate(OPTION_SCREEN, { userData: userInfo ?? null });
    }

    const handleClickIntoHeaderComponentEvent = (flag: number) => {
        switch (flag) {
            case CLICK_CAMERA_BACKGROUND_EVENT:
                imagePickerOption?.show();
                break;
            case SEE_AVATAR:
                setImageFocus(userInfo?.image + "");
                setIsShowAvatar(true)
                break;
            case SEE_BACKGROUND:
                setImageFocus(userInfo?.background + "");
                setIsShowAvatar(true)
                break;
            default:
                break;
        }
    }

    const handleCloseModal = useCallback(() => {
        setIsShowAvatar(false);
    }, [])

    const handleShowImageBackgroundUpdate = (flag: boolean) => {
        if (flag) {
            handleUploadImage(imagePicker ?? [], (data) => {
                const status = updateImageUserProfile(SERVER_ADDRESS + "api/users/change/image", { ...userInformation, background: data[0] });
            })
        }
        setImagePicker(null);
    }

    return (
        <View>
            {
                Boolean(imagePicker) && isFocused && (
                    <CustomizeModalShowBackgroundUpdate
                        t={t}
                        image={(imagePicker?.[0]?.uri) ?? ''}
                        handleShowImageBackgroundUpdate={handleShowImageBackgroundUpdate}
                    />
                )
            }
            {
                isLoading ? <SkeletonPost /> : <>
                    <CustomizeModalBigImageShow
                        visible={isShowAvatar}
                        image={imageFocus + ""}
                        handleCloseModal={handleCloseModal} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={() => {
                                }}
                            />
                        }
                    >
                        <CustomizeProfile
                            isFollow={isFollow}
                            data={post}
                            role={typeAuthorPost}
                            userData={userInfo}
                            handleClickButtonEvent={handleClickButtonEvent}
                            handleClickIntoHeaderComponentEvent={handleClickIntoHeaderComponentEvent} />
                        {
                            (userInfo !== undefined && getGroupForPost(group, t) !== "") && <View style={styles.titlePostArea}>
                                <Text style={styles.txtTitlePostArea}>
                                    {
                                        getFacultyTranslated(userInfo?.name + "", t)
                                    }
                                    {' '}
                                    <IconAntDesign name='caretright' size={15} color={COLOR_BLACK} />
                                    {' '}
                                    {
                                        getGroupForPost(group, t)
                                    }
                                </Text>
                            </View>
                        }
                        <View style={styles.wrapperPost}>
                            {
                                (Boolean(post)) &&
                                <>
                                    {
                                        post.length !== 0 && <FlatList
                                            extraData={post}
                                            scrollEnabled={false}
                                            showsVerticalScrollIndicator={false}
                                            data={post}
                                            renderItem={({ item }) => renderItem(item)}
                                        />
                                    }</>
                            }
                        </View>
                    </ScrollView>
                    <ImagePicker
                        optionsRef={(ref) => setImagePickerOption(ref)}
                        onResult={(result) => {
                            setImagePicker(result)
                        }}
                    />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperCreateNormalPostToolbar: {
        marginBottom: 20,
    },
    titlePostArea: {
        backgroundColor: COLOR_WHITE,
        paddingVertical: 5,
        marginBottom: 1,
        paddingLeft: 10,
    },
    txtTitlePostArea: {
        color: COLOR_BLACK
    },
    wrapperPost: {
        marginTop: 5,
    }
})
export default ProfileScreen
