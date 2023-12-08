import moment from 'moment'
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Asset } from 'react-native-image-picker'
import { Client, Frame, Message } from 'stompjs'
import Loading from '../components/common/Loading'
import MessageBottomBar from '../components/messages/MessageBottomBar'
import MessageReceivedItem from '../components/messages/MessageReceivedItem'
import MessageSentItem from '../components/messages/MessageSentItem'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setConversationMessages, setImagesUpload } from '../redux/Slice'
import { getStompClient } from '../sockets/SocketClient'
import { Message as MessageModel } from '../types/Message'
import { handleUploadImage } from '../utils/ImageHelper'

let stompClient: Client

export const PLAIN_TEXT = 'plain/text'
export const IMAGES = 'images'

export const RECEIVED = 0
export const SEEN = 1
export const SENDING = 2

export default function MessengerScreen() {
  const t = useTranslation()
  const { userLogin, imagesUpload, selectConversation, conversationMessages } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )

  const textInputMessageRef = useRef<TextInput | null>(null)
  const [isLoading, setLoading] = useState(true)
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
      if (stompClient.connected) {
        stompClient.subscribe(`/topic/messages/${senderId}/${receiverId}`, onMessageReceived)
        stompClient.send(`/app/messages/${senderId}/${receiverId}/listen`)
      }
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
      type: PLAIN_TEXT,
      content: messageContent,
      status: RECEIVED
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

  const onImagePickerResult = (result: Asset[]) => {
    if (selectConversation
      && selectConversation.receiver
      && selectConversation.sender) {
      const tempMessage: MessageModel = {
        content: result.map(item => item.uri).join(','),
        receiver: selectConversation.receiver,
        sender: selectConversation.sender,
        type: IMAGES,
        status: SENDING
      }
      dispatch(setConversationMessages([tempMessage, ...conversationMessages]))

      handleUploadImage(result, (images) => {
        const message = {
          senderId: senderId,
          receiverId: receiverId,
          type: IMAGES,
          content: images.join(','),
          status: RECEIVED
        }

        stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify(message))
      })
    }
  }

  return (
    <View style={styles.body}>
      {isLoading ? (
        <Loading title={t('MessageScreen.messageScreenLoaderTitle')} />
      ) : (
        <Fragment>
          {
            conversationMessages.length > 0 ?
              <FlatList
                inverted
                initialNumToRender={5}
                showsVerticalScrollIndicator={false}
                data={conversationMessages}
                renderItem={({ item, index }) => messageRenderItems(item, index)}
              />
              :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{t('MessageScreen.messageEmptyList')}</Text>
              </View>
          }

          <MessageBottomBar
            textInputMessageRef={textInputMessageRef}
            onButtonSendPress={onButtonSendPress}
            onInputMessageContent={(value) => setMessageContent(value)}
            onImagePickerResult={(result) => onImagePickerResult(result)}
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
