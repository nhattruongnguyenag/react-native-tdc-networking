import { FlatList, StyleSheet, View } from 'react-native'
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
import { formatDateTime } from '../utils/FormatTime'
import CustomizePost from '../components/post/CustomizePost'
import { LikeAction } from '../types/LikeActions'
import { API_URL_POST } from '../constants/Path'
import SkeletonPost from '../components/SkeletonPost'
import CustomizeRecruitmentPost from '../components/recruitmentPost/CustomizeRecruitmentPost'

let stompClient: Client
// man hinh hien thi bai viet doanh nghiep
export default function BusinessDashboardScreen() {
  // Variable
  const [isLoading, setIsLoading] = useState(false);
  const [businessPost, setBusinessPost] = useState([]);
  const { isOpenModalImage, isOpenModalComments, isOpenModalUserReaction, updatePost } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [updateToken, updateTokenResponse] = useSaveDeviceTokenMutation()
  const dispatch = useAppDispatch()

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
    if (businessPost.length > 0) {
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

    const onMessageReceived = (payload: Message) => {
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

  const renderItem = (item: any) => {
    return (
      <CustomizePost
        id={item.id}
        userId={item.user['id']}
        name={item.user['name']}
        avatar={item.user['image']}
        typeAuthor={'Doanh Nghiệp'}
        available={null}
        timeCreatePost={formatDateTime(item.createdAt)}
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
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => getDataBusinessApi()}
        data={businessPost}
        renderItem={({ item }) => renderItem(item)}
      />
      {isOpenModalComments && <CustomizeModalComments />}
      {/* <CustomizeRecruitmentPost /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  }
})
