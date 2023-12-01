import { FlatList, View, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL_DELETE_POST, API_URL_GET_POST_BY_USER_ID, API_URL_LIKE, API_URL_SAVE_POST } from '../constants/Path';
import CustomizePost from '../components/post/CustomizePost';
import { LikeAction } from '../types/LikeActions';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, setImagesUpload, setSelectConversation} from '../redux/Slice';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import { CALL_ACTION, CLICK_CAMERA_BACKGROUND_EVENT, FOLLOW_ACTION, MESSENGER_ACTION, SEE_AVATAR, SEE_BACKGROUND} from '../constants/Variables';
import { MESSENGER_SCREEN, OPTION_SCREEN } from '../constants/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomizeModalBigImageShow from '../components/modal/CustomizeModalBigImageShow';
import { useIsFocused } from '@react-navigation/native';
import { Student } from '../types/Student';
import { Faculty } from '../types/Faculty';
import { Business } from '../types/Business';
import { COLOR_BLACK, COLOR_WHITE } from '../constants/Color';
import { User } from '../types/User';
import { deletePostAPI, followAPI, savePostAPI, updateImageUserProfile } from '../api/CallApi';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { ToastMessenger } from '../utils/ToastMessenger';
import { useTranslation } from 'react-multi-lang';
import { TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../constants/StringVietnamese';
import SkeletonPost from '../components/SkeletonPost';
import CustomizedImagePicker from '../components/CustomizedImagePicker';
import ActionSheet from 'react-native-actionsheet';
import CustomizeModalShowBackgroundUpdate from '../components/modal/CustomizeModalShowBackgroundUpdate';
import { useGetPostsByIdQuery } from '../redux/Service';

const MyProfileScreen = () => {
  const t = useTranslation();
  const [imageFocus, setImageFocus] = useState<string>("");
  const [loadingBackground, setLoadingBackground] = useState(false);
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [group, setGroup] = useState((userLogin?.roleCodes.includes(TYPE_POST_STUDENT) || userLogin?.roleCodes.includes(TYPE_POST_FACULTY)) ? userLogin.facultyGroupCode : 'group_connect_business');
  const [isCalled, setIsCalled] = useState(false);
  const [isShowAvatar, setIsShowAvatar] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [post, setPost] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<Student | Faculty | Business | null>();
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [typeAuthorPost, setTypeAuthorPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>();
  const dispatch = useAppDispatch();
  const { imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer);

  const { data, isFetching } = useGetPostsByIdQuery(
    {
      userId: userLogin?.id ?? 0,
      groupCode: group,
      userLogin: userLogin?.id ?? 0
    },
    {
      pollingInterval: 2000
    }
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setPost([]);
      setPost(data.data.posts);
      setIsCalled(true);
    }
  }, [data])

  useEffect(() => {
    if (post.length != 0 || isCalled) {
      setIsLoading(false);
    }
  }, [post, isCalled])

  const getPostByUserIdAPI = useCallback(() => {
    axios.post(API_URL_GET_POST_BY_USER_ID, {
      // same user
      "userId": userLogin?.id,
      "groupCode": group,
      "userLogin": userLogin?.id
    })
      .then((response) => {
        setTypeAuthorPost(response.data.data.user['roleCodes']);
        setUserInfo(response.data.data.user);
        setIsFollow(response.data.data.isFollow)
        setPost(response.data.data.posts);
        setIsLoading(false);
      }).catch((error) => {
      })
  }, [userLogin?.id])

  useEffect(() => {
    setGroup((userLogin?.roleCodes.includes(TYPE_POST_STUDENT) || userLogin?.roleCodes.includes(TYPE_POST_FACULTY)) ? userLogin.facultyGroupCode : 'group_connect_business');
    setIsLoading(true);
    getPostByUserIdAPI();
  }, [userLogin, loadingBackground])

  const likeAction = (obj: LikeAction) => {
    like(obj)
  }

  useEffect(() => {
    if (isFocused) {
      dispatch(goToProfileScreen(userLogin?.id ?? -1));
      dispatch(setCurrentScreenNowIsProfileScreen(true));
    } else {
      dispatch(goToProfileScreen(-1));
      dispatch(setCurrentScreenNowIsProfileScreen(false));
    }
  }, [isFocused])


  const like = useCallback(async (likeData: LikeAction) => {
    axios.post(API_URL_LIKE, {
      "postId": likeData.postId,
      "userId": likeData.userId
    }).then((response) => {
      let status = response.data.status;
      ToastMessenger(status, 201, t("ToastMessenger.toastMessengerTextTitle"), t("ToastMessenger.toastMessengerTextWarning"));
    }).catch((error) => {
      console.error(error);
    })
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
  }

  const renderItem = (item: any) => {
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
        group={group ?? ""}
        handleUnSave={handleSavePost}
        handleDelete={handleDeletePost}
      />
    )
  }

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
      "userFollowId": userLogin?.id,
      "userId": userLogin?.id
    }
    setIsFollow(!isFollow);
    const status = await followAPI(SERVER_ADDRESS + 'api/users/follow', followData);
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

  const handleCloseModal = () => {
    setIsShowAvatar(false);
  }

  const handleShowImageBackgroundUpdate = (flag: boolean) => {
    if (flag) {
      const data = {
        userId: userLogin?.id,
        avatar: undefined,
        background: imagesUpload !== null ? imagesUpload[0] : undefined
      }
      const status = updateImageUserProfile(SERVER_ADDRESS + "api/users/change/image", data);
      setLoadingBackground(!loadingBackground);
    }
    dispatch(setImagesUpload([]));
  }

  return (
    <View>
      {
        imagesUpload !== null && <>
          {
            (imagesUpload?.length !== 0 && isFocused) && <CustomizeModalShowBackgroundUpdate
              t={t}
              image={imagesUpload?.length !== 0 ? imagesUpload[0] : ""}
              handleShowImageBackgroundUpdate={handleShowImageBackgroundUpdate} />
          }
        </>
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
                  getPostByUserIdAPI();
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
              post.length !== 0 && <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={post}
                renderItem={({ item }) => renderItem(item)}
              />
            }
          </ScrollView>
          <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
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
export default MyProfileScreen

