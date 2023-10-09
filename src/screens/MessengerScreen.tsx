import { useIsFocused } from '@react-navigation/native'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Client, Frame, Message } from 'stompjs'
import Loading from '../components/Loading'
import MessageBottomBar from '../components/messages/MessageBottomBar'
import MessageReceivedItem from '../components/messages/MessageReceivedItem'
import MessageSectionTitle from '../components/messages/MessageSectionTitle'
import MessageSentItem from '../components/messages/MessageSentItem'
import { useAppSelector } from '../redux/Hook'
import { getStompClient } from '../sockets/SocketClient'
import { Message as MessageModel } from '../types/Messages'
import { MessageSection, MessageSectionByTime } from '../types/MessageSection'
import { getMessageSectionTitle } from '../utils/DateTimeUtils'
import { sortMessageBySections, sortMessagesByTime } from '../utils/MessageUtils'

let stompClient: Client

export default function MessengerScreen() {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const textInputMessageRef = useRef<TextInput | null>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const [isLoading, setLoading] = useState(false)
  const [messageSection, setMessageSection] = useState<MessageSection[]>([])
  const [messageContent, setMessageContent] = useState<string>('')
  const { selectConversation } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const senderId = selectConversation?.sender?.id
  const receiverId = selectConversation?.receiver?.id

  useEffect(() => {
    setLoading(true)

    stompClient = getStompClient()

    const onConnected = () => {
      stompClient.subscribe(`/topic/messages/${senderId}/${receiverId}`, onMessageReceived)
      stompClient.send(`/app/messages/focus/in/${senderId}/${receiverId}`)
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

  const onButtonSendPress = useCallback(() => {
    let message = {
      senderId: senderId,
      receiverId: receiverId,
      type: 'plain/text',
      content: messageContent,
      status: 0
    }

    stompClient.send(`/app/messages/${senderId}/${receiverId}`, {}, JSON.stringify(message))
    textInputMessageRef.current?.clear()
  }, [messageContent])

  const messageSectionRenderItems = (item: MessageSection, sectionIndex: number) => (
    <Fragment key={sectionIndex}>
      <MessageSectionTitle title={getMessageSectionTitle(item.title)} />
      {item?.data.map((item, itemIndex) => messageRenderItems(item, itemIndex))}
    </Fragment>
  )

  const messageRenderItems = useCallback(
    (item: MessageSectionByTime, index: number): JSX.Element => {
      if (item.sender.id == userLogin?.id) {
        return <MessageSentItem key={index} data={item} showDate={true} />
      } else {
        return <MessageReceivedItem key={index} data={item} showDate={true} />
      }
    },
    [messageSection]
  )

  const onInputMessageContent = useCallback((value: string) => {
    if (value.trim().length > 0) {
      stompClient.send(`/app/messages/typing/on/${senderId}/${receiverId}`)
    } else {
      stompClient.send(`/app/messages/typing/off/${senderId}/${receiverId}`)
    }

    setMessageContent(value)
  }, [])

  useEffect(() => {
    return () => {
      stompClient.send(`/app/messages/focus/out/${senderId}/${receiverId}`)
      stompClient.send(`/app/messages/typing/off/${senderId}/${receiverId}`)
    }
  }, [])

  return (
    <View style={styles.body}>
      {isLoading ? (
        <Loading title={'Đang tải tin nhắn'} />
      ) : (
        <Fragment>
          <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {messageSection.map((item, index) => messageSectionRenderItems(item, index))}

            <View style={{ height: 30, backgroundColor: '#fff' }}/>
          </ScrollView>

          <Text style={{marginBottom: 5, display: Boolean(selectConversation?.sender.isTyping) ? 'flex' : 'none'}}>Đang soạn tin...</Text>

          <MessageBottomBar
            textInputMessageRef={textInputMessageRef}
            onButtonSendPress={onButtonSendPress}
            onInputMessageContent={(value) => onInputMessageContent(value)}
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
