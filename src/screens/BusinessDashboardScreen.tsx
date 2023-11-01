import { FlatList, StyleSheet, View, RefreshControl, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLOR_BOTTOM_AVATAR } from '../constants/Color'
import CustomizeModalImage from '../components/modal/CustomizeModalImage'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import CustomizeModalComments from '../components/modal/CustomizeModalComments'
import CustomizeModalUserReacted from '../components/modal/CustomizeModalUserReacted'
import messaging from '@react-native-firebase/messaging'
import { setConversations, setDeviceToken, updatePostWhenHaveChangeComment } from '../redux/Slice'
import { useSaveDeviceTokenMutation } from '../redux/Service'
import { getStompClient } from '../sockets/SocketClient'
import { Client, Frame, Message } from 'stompjs'
import { postAPI } from '../api/CallApi'
import { handleDataClassification } from '../utils/DataClassfications'
import { TYPE_POST_BUSINESS } from '../constants/StringVietnamese'
import CustomizePost from '../components/post/CustomizePost'
import { LikeAction } from '../types/LikeActions'
import { API_URL_POST } from '../constants/Path'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../constants/Variables'

let stompClient: Client
// man hinh hien thi bai viet doanh nghiep
export default function BusinessDashboardScreen() {
  // Variable
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [businessPost, setBusinessPost] = useState([]);
  const { isOpenModalImage, isOpenModalComments, isOpenModalUserReaction, updatePost } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [updateToken, updateTokenResponse] = useSaveDeviceTokenMutation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  // Function area

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
  }, [businessPost])

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

  const getDataBusinessApi = async () => {
    try {
      const data = await postAPI(API_URL_POST)
      const result = handleDataClassification(data, TYPE_POST_BUSINESS)
      setBusinessPost(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/posts/${TYPE_POST_BUSINESS}`, onMessageReceived)
      stompClient.send(`/app/posts/${TYPE_POST_BUSINESS}/listen`)
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
    stompClient.send(`/app/posts/${likeData.code}/like`, {}, JSON.stringify(likeData))
  }, [])

  useEffect(() => {
    getDataBusinessApi()
    dispatch(updatePostWhenHaveChangeComment(false))
  }, [updatePost])

  const handleClickToCreateButtonEvent = (type: string) => {
    if (type === TYPE_NORMAL_POST) {
      navigation.navigate(CREATE_NORMAL_POST_SCREEN);
    } else if (type === TYPE_RECRUITMENT_POST) {
      navigation.navigate(CREATE_RECRUITMENT_SCREEN);
    } else {
      navigation.navigate(CREATE_SURVEY_SCREEN);
    }
  }

  const handleClickIntoAvatar = () => {
    navigation.navigate(PROFILE_SCREEN, { userId: userLogin?.id ?? 0 })
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
      />
    )
  }


  return (


    <View style={styles.container}>
      {
        isOpenModalImage && <CustomizeModalImage />
      }
      {
        isOpenModalUserReaction && <CustomizeModalUserReacted />
      }
      {
        isLoading && <SkeletonPost />
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl
          refreshing={false}
          onRefresh={() => getDataBusinessApi()}
        />}
      >
        {/* Create post area */}
        {
          userLogin?.roleCodes === TYPE_POST_BUSINESS ?
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
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={businessPost}
          renderItem={({ item }) => renderItem(item)}
        />
      </ScrollView>
      {isOpenModalComments && <CustomizeModalComments />}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  },
  toolbarCreatePost: {
    marginBottom: 20,
  }
})
