import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomizeBusinessPost from '../components/CustomizeBusinessPost'
import { COLOR_BOTTOM_AVATAR, COLOR_GREY } from '../constants/Color'
import { likeData, imageData, commentData } from '../components/DataBase'
import CustomizeModalImage from '../components/modal/CustomizeModalImage'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import CustomizeModalComments from '../components/modal/CustomizeModalComments'
import CustomizeModalUserReacted from '../components/modal/CustomizeModalUserReacted'
import messaging from '@react-native-firebase/messaging'
import { setConversations, setDeviceToken } from '../redux/Slice'
import { useSaveDeviceTokenMutation } from '../redux/Service'
import { getStompClient } from '../sockets/SocketClient'
import { Conversation } from '../types/Conversation'
import { Client, Frame, Message } from 'stompjs'
import { postAPI } from '../api/CallApi'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { handleDataClassification } from '../utils/DataClassfications'
import { TYPE_POST_BUSINESS } from '../constants/StringVietnamese'
import { formatDateTime } from '../utils/FormatTime'
import CustomizePost from '../components/post/CustomizePost'
import { useIsFocused } from '@react-navigation/native'

// man hinh hien thi bai viet doanh nghiep
export default function BusinessDashboardScreen() {
  const [businessPost, setBusinessPost] = useState();
  const isFocused = useIsFocused();
  const apiUrlPost = SERVER_ADDRESS + 'api/posts';
  const { isOpenModalImage, isOpenModalComments, isOpenModalUserReaction } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [updateToken, updateTokenResponse] = useSaveDeviceTokenMutation()
  const dispatch = useAppDispatch()

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


  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        callAPI();
      }
      fetchData();
    }
  }, [isFocused])


  const callAPI = async () => {
    console.log('call api');
    try {
      const temp = await postAPI(apiUrlPost);
      const result = handleDataClassification(temp, TYPE_POST_BUSINESS);
      setBusinessPost(result);
    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = (item: any) => {
    return <CustomizePost
      id={item.id}
      userId={item.user['id']}
      name={item.user['name']}
      avatar={item.user['image']}
      typeAuthor={'Doanh Nghiệp'}
      available={null}
      timeCreatePost={formatDateTime(item.createdAt)}
      content={item.content}
      type={null}
      likes={item.likes}
      comments={item.comment}
      images={item.images}
      role={0}
    />
  }

  return (
    <View style={styles.container}>
      {
        isOpenModalImage && <CustomizeModalImage />
      }
      {
        isOpenModalUserReaction && <CustomizeModalUserReacted />
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => callAPI()}
        data={businessPost}
        renderItem={({ item }) => renderItem(item)}
      />
      {
        isOpenModalComments && <CustomizeModalComments />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BOTTOM_AVATAR
  }
})