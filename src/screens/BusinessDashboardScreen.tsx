import { FlatList, StyleSheet, View, RefreshControl, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizeModalImage from '../components/modal/CustomizeModalImage'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import CustomizeModalComments from '../components/modal/CustomizeModalComments'
import CustomizeModalUserReacted from '../components/modal/CustomizeModalUserReacted'
import messaging from '@react-native-firebase/messaging'
import { setConversations, setDefaultLanguage, setDeviceToken } from '../redux/Slice'
import { useGetBusinessPostsQuery, useSaveDeviceTokenMutation } from '../redux/Service'
import { getStompClient } from '../sockets/SocketClient'
import { Client, Frame, Message } from 'stompjs'
import { deletePostAPI, savePostAPI } from '../api/CallApi'
import CustomizePost from '../components/post/CustomizePost'
import { LikeAction } from '../types/LikeActions'
import { API_URL_DELETE_POST, API_URL_SAVE_POST } from '../constants/Path'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, groupBusiness, TYPE_POST_BUSINESS } from '../constants/Variables'
import { ToastMessenger } from '../utils/ToastMessenger'
import { useTranslation } from 'react-multi-lang'
import { useNavigation } from '@react-navigation/native'
import { GROUP_CONNECT_BUSINESS_ID } from '../constants/Groups'
import { getPostActive } from '../utils/GetPostActive'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEFAULT_LANGUAGE } from '../constants/KeyValue'
import { useIsFocused } from '@react-navigation/native';

let stompClient: Client
export default function BusinessDashboardScreen() {
  const t = useTranslation();
  const isFocused = useIsFocused();
  const code = groupBusiness;
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [businessPost, setBusinessPost] = useState<any[]>([]);
  const { isOpenModalImage, isOpenModalComments, isOpenModalUserReaction, updatePost } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [updateToken, updateTokenResponse] = useSaveDeviceTokenMutation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { data, isFetching } = useGetBusinessPostsQuery(
    { id: userLogin?.id ?? 0 },
    {
      pollingInterval: 2000
    }
  );

  useEffect(()=> {
    setTimeout(() => {
      axios.post(`${SERVER_ADDRESS}api/option/get`,{
        userId: userLogin?.id,
        optionKey: 'language'
      }).then((response) => {
        dispatch(setDefaultLanguage(response.data.data.value))
        AsyncStorage.setItem(DEFAULT_LANGUAGE, JSON.stringify(response.data.data.value))
      })
    }, 6000)
  })

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setBusinessPost([]);
      setBusinessPost(data.data);
      setIsCalled(true);
    }
  }, [data])

  useEffect(() => {
    const getFCMToken = async () => {
      try {
        const token = await messaging().getToken()
        dispatch(setDeviceToken(token))
      } catch (error) {
        console.log(error)
      }
    }
    getFCMToken()
  }, [])

  useEffect(() => {
    if (businessPost.length > 0 || isCalled) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [businessPost, isCalled])

  const updateUserStatusToOnline = useCallback(() => {
    const stompClient: Client = getStompClient()
    const onConnected = () => {
      stompClient.subscribe('/topic/conversations', onMessageReceived)
      stompClient.send(`/app/conversations/online/${userLogin?.id}`)
    }

    const onMessageReceived = async (payload: Message) => {
      dispatch(setConversations(JSON.parse(payload.body)))
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }

    stompClient.connect({}, onConnected, onError)
  }, [])

  useEffect(() => {
    console.log('device-token', deviceToken)
    if (userLogin && deviceToken) {
      updateToken({
        userId: userLogin.id,
        deviceToken: deviceToken
      })
      updateUserStatusToOnline()
    }
  }, [deviceToken])


  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/group/${code}`, onMessageReceived)
      stompClient.send(`/app/posts/group/${code}/listen/${userLogin?.id}`)
    }
    const onMessageReceived = (payload: any) => {
      setBusinessPost(JSON.parse(payload.body))
      setIsCalled(true);
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }
    stompClient.connect({}, onConnected, onError)
  }, [])

  const likeAction = (obj: LikeAction) => {
    obj.code = TYPE_POST_BUSINESS
    like(obj)
  }

  const like = useCallback((likeData: LikeAction) => {
    stompClient.send(`/app/posts/group/${code}/like`, {}, JSON.stringify(likeData))
  }, [code])

  const handleClickToCreateButtonEvent = (type: string) => {
    if (type === TYPE_NORMAL_POST) {
      navigation.navigate(CREATE_NORMAL_POST_SCREEN, { group: GROUP_CONNECT_BUSINESS_ID });
    } else if (type === TYPE_RECRUITMENT_POST) {
      navigation.navigate(CREATE_RECRUITMENT_SCREEN, { groupId: GROUP_CONNECT_BUSINESS_ID });
    } else {
      navigation.navigate(CREATE_SURVEY_SCREEN, { groupId: GROUP_CONNECT_BUSINESS_ID });
    }
  }

  const handleClickIntoAvatar = () => {
    navigation.navigate(PROFILE_SCREEN, { userId: userLogin?.id ?? 0, group: code })
  }

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
          group={code}
          handleUnSave={handleSavePost}
          handleDelete={handleDeletePost}
          active={item.active} />
      )
    } else {
      return null
    }
  }, [businessPost])

  return (
    <View style={styles.container}>
      {
        isOpenModalImage && <CustomizeModalImage />
      }
      {
        isOpenModalUserReaction && <CustomizeModalUserReacted />
      }
      {isOpenModalComments && <CustomizeModalComments />}
      {
        isLoading && <SkeletonPost />
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={false}
          onRefresh={() => {
          }}
        />}
      >
        {
          userLogin?.roleCodes?.includes(TYPE_POST_BUSINESS) ?
            <View style={styles.toolbarCreatePost}>
              <CustomizeCreatePostToolbar
                role={userLogin?.roleCodes ?? ''}
                handleClickToCreateButtonEvent={handleClickToCreateButtonEvent}
                handleClickIntoAvatar={handleClickIntoAvatar}
                image={userLogin?.image ?? null}
                name={userLogin?.name ?? ''}
              />
            </View> : null
        }
        <View style={styles.wrapperPost}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            extraData={businessPost}
            data={businessPost}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  },
  toolbarCreatePost: {
    marginBottom: 20,
  },
  wrapperPost: {
    marginTop: 5,
  }
})