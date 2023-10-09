import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import CustomizeBusinessPost from '../components/CustomizeBusinessPost'
import { COLOR_GREY } from '../constants/Color'
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

// man hinh hien thi bai viet doanh nghiep

export default function BusinessDashboardScreen() {
  const { isOpenModalImage, isOpenModalComments, isOpenModalUserReaction } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [updateToken, updateTokenResponse] = useSaveDeviceTokenMutation()
  const dispatch = useAppDispatch()

  const getFCMToken = useCallback(async () => {
    try {
      const token = await messaging().getToken()
      dispatch(setDeviceToken(token))
    } catch (error) {
      console.log(error)
    }
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
    getFCMToken()
  }, [])


  useEffect(() => {
    if (userLogin && deviceToken) {
      updateUserStatusToOnline()
      updateToken({
        userId: userLogin.id,
        deviceToken: deviceToken
      })
    }
  }, [deviceToken])

  useEffect(() => {
    if (updateTokenResponse) {
      console.log(updateTokenResponse.data)
    }
  }, [updateTokenResponse])

  return (
    <View style={styles.container}>
      {isOpenModalImage && <CustomizeModalImage />}
      {isOpenModalUserReaction && <CustomizeModalUserReacted />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomizeBusinessPost
          id={1}
          name={'Google VN'}
          avatar={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'
          }
          typeAuthor={'Doanh Nghiệp'}
          available={true}
          timeCreatePost={'27/07/2023 9:09'}
          content={
            ' danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới bút danh Collodi'
          }
          type={'tuyển dụng'}
          isLike={true}
          isComment={true}
          likes={likeData}
          comments={commentData}
          images={imageData}
          role={0}
        />
        <CustomizeBusinessPost
          id={1}
          name={'Google VN'}
          avatar={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'
          }
          typeAuthor={'Doanh Nghiệp'}
          available={true}
          timeCreatePost={'27/07/2023 9:09'}
          content={
            ' danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới danh CollodiNhững cuộc phiêu lưu của Pinocchio, được xuất bản năm 1883, là cuốn tiểu thuyết dành cho thiếu nhi của tác giả người Ý Carlo Lorenini d dưới bút danh Collodi'
          }
          type={'tuyển dụng'}
          isLike={true}
          isComment={false}
          likes={likeData}
          comments={commentData}
          images={imageData}
          role={0}
        />
      </ScrollView>
      {isOpenModalComments && <CustomizeModalComments />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_GREY
  }
})
