import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Client, Frame, Message } from 'stompjs'
import Loading from '../components/Loading'
import MessageBottomBar from '../components/messages/MessageBottomBar'
import MessageReceivedItem from '../components/messages/MessageReceivedItem'
import MessageSectionTitle from '../components/messages/MessageSectionTitle'
import MessageSentItem from '../components/messages/MessageSentItem'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setImagesUpload } from '../redux/Slice'
import { getStompClient } from '../sockets/SocketClient'
import { Message as MessageModel } from '../types/Message'
import { MessageSection, MessageSectionByTime } from '../types/MessageSection'
import { getMessageSectionTitle } from '../utils/DateTimeUtils'
import { sortMessageBySections, sortMessagesByTime } from '../utils/MessageUtils'

let stompClient: Client

export default function MessengerScreen() {
  const { userLogin, imagesUpload, selectConversation } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const textInputMessageRef = useRef<TextInput | null>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const [isLoading, setLoading] = useState(false)
  const [messageSection, setMessageSection] = useState<MessageSection[]>([])
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
      const messageSectionsTime = sortMessagesByTime(messages)
      setMessageSection(sortMessageBySections(messageSectionsTime))
      scrollViewRef.current?.scrollToEnd()
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }

    stompClient.connect({}, onConnected, onError)
  }, [])

  useEffect(() => {
    if (messageSection) {
      scrollViewRef.current?.scrollToEnd()
    }
  }, [messageSection])

  useEffect(() => {
    console.log('image-upload', imagesUpload)
  }, [imagesUpload])

  const onButtonSendPress = useCallback(() => {
    const message = {
      senderId: senderId,
      receiverId: receiverId,
      type: 'plain/text',
      content: messageContent,
      status: 0
    }

    console.log(senderId, receiverId)

    stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify(message))
    setMessageContent('')
  }, [messageContent])


  const messageSectionRenderItems = useCallback(
    (item: MessageSection, sectionIndex: number) => (
      <Fragment key={sectionIndex}>
        {item?.data.map((item, itemIndex) => messageRenderItems(item, itemIndex))}
        <MessageSectionTitle title={getMessageSectionTitle(item.title)} />
      </Fragment>
    ),
    []
  )

  const messageRenderItems = useCallback((item: MessageSectionByTime, index: number): JSX.Element => {
    if (item.sender.id == userLogin?.id) {
      return <MessageSentItem key={index} data={item} />
    } else {
      return <MessageReceivedItem key={index} data={item} />
    }
  }, [])

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
        <Loading title={'Đang tải tin nhắn'} />
      ) : (
        <Fragment>
          <FlatList
            inverted
            initialNumToRender={1}
            showsVerticalScrollIndicator={false}
            data={messageSection}
            renderItem={({ item, index }) => messageSectionRenderItems(item, index)}
          />

          <Text style={{ marginBottom: 5, display: Boolean(selectConversation?.receiver.isTyping) ? 'flex' : 'none' }}>
            Đang soạn tin...
          </Text>

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
