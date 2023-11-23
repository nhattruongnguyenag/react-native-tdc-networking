import moment from 'moment'
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Client, Frame, Message } from 'stompjs'
import Loading from '../components/common/Loading'
import MessageBottomBar from '../components/messages/MessageBottomBar'
import MessageReceivedItem from '../components/messages/MessageReceivedItem'
import MessageSentItem from '../components/messages/MessageSentItem'
import { MESSAGE_SCREEN_LOADER_TITLE } from '../constants/StringVietnamese'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setConversationMessages, setImagesUpload } from '../redux/Slice'
import { getStompClient } from '../sockets/SocketClient'
import { Message as MessageModel } from '../types/Message'

let stompClient: Client

export default function MessengerScreen() {
  const t = useTranslation()
  const { userLogin, imagesUpload, selectConversation, conversationMessages } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )

  const textInputMessageRef = useRef<TextInput | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [messageContent, setMessageContent] = useState<string>('')
  const dispatch = useAppDispatch()

  const senderId = useMemo(() => {
    return selectConversation?.sender?.id
  }, [selectConversation])

  const receiverId = useMemo(() => {
    return selectConversation?.receiver?.id
  }, [selectConversation])

  useEffect(() => {
    stompClient = getStompClient()

    const onConnected = () => {
      setLoading(true)
      stompClient.subscribe(`/topic/messages/${senderId}/${receiverId}`, onMessageReceived)
      stompClient.send(`/app/messages/${senderId}/${receiverId}/listen`)
    }

    const onMessageReceived = (payload: Message) => {
      setLoading(false)
      const messages = JSON.parse(payload.body) as MessageModel[]
      dispatch(setConversationMessages(messages))
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }

    stompClient.connect({}, onConnected, onError)
  }, [])

  const onButtonSendPress = useCallback(() => {
    const message = {
      senderId: senderId,
      receiverId: receiverId,
      type: 'plain/text',
      content: messageContent,
      status: 0
    }

    stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify(message))
    setMessageContent('')
  }, [messageContent])

  const messageRenderItems = useCallback(
    (item: MessageModel, index: number): JSX.Element => {
      let dayHeaderVisible = false

      const previousMessage = conversationMessages[index + 1]

      if (
        index == conversationMessages.length - 1 ||
        Math.abs(moment(item.createdAt).hours() - moment(previousMessage.createdAt).hours()) > 3
      ) {
        dayHeaderVisible = true
      }

      if (item.sender.id == userLogin?.id) {
        return <MessageSentItem key={index} data={item} index={index} dayHeaderVisible={dayHeaderVisible} />
      }

      return <MessageReceivedItem key={index} data={item} index={index} dayHeaderVisible={dayHeaderVisible} />
    },
    [conversationMessages]
  )

  useEffect(() => {
    if (imagesUpload && imagesUpload.length > 0) {
      const message = {
        senderId: senderId,
        receiverId: receiverId,
        type: 'images',
        content: imagesUpload?.join(','),
        status: 0
      }

      stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify(message))
      dispatch(setImagesUpload([]))
    }
  }, [imagesUpload])

  return (
    <View style={styles.body}>
      {isLoading ? (
        <Loading title={t('MessageScreen.messageScreenLoaderTitle')} />
      ) : (
        <Fragment>
          <FlatList
            inverted
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            data={conversationMessages}
            renderItem={({ item, index }) => messageRenderItems(item, index)}
          />

          <MessageBottomBar
            textInputMessageRef={textInputMessageRef}
            onButtonSendPress={onButtonSendPress}
            onInputMessageContent={(value) => setMessageContent(value)}
          />
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  }
})
