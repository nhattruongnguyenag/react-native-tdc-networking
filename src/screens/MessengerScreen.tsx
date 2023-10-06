import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import SockJS from 'sockjs-client'
import { Client, Frame, Message, over } from 'stompjs'
import MessageBottomBar from '../components/messages/MessageBottomBar'
import MessageGroupTitle from '../components/messages/MessageGroupTitle'
import MessageReceivedItem from '../components/messages/MessageReceivedItem'
import MessageSentItem from '../components/messages/MessageSentItem'
import { MESSENGER_SCREEN } from '../constants/Screen'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Conversation } from '../types/Conversation'
import { Message as MessageModel } from '../types/Messages'
import { MessageSection } from '../types/MessageSection'
import { sortMessageBySections } from '../utils/MessageUtils'

interface Props extends NativeStackScreenProps<ParamListBase, > {
}

let stompClient: Client
export default function MessengerScreen() {
  const scrollViewRef = useRef<ScrollView>(null)
  const [messageSections, setMessageSections] = useState<MessageSection[]>([])
  const [messageContent, setMessageContent] = useState<string>('')
  const [conversation, setConversation] = useState<Conversation>()
  const route = useRoute<RouteProp<ParamListBase>>()

  useEffect(() => {
    if (route.params) {
      const {conversation} = route.params
      console.log(conversation)
    }

    const connect = () => {
      const Sock = new SockJS(SERVER_ADDRESS + 'tdc-social-network-ws')
      stompClient = over(Sock)
      stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
      stompClient.subscribe('/topic/messages/1/2', onMessageReceived)
      stompClient.send('/app/messages/1/2/listen', {}, JSON.stringify(1))
    }

    const onMessageReceived = (payload: Message) => {
      const messages = JSON.parse(payload.body) as MessageModel[]
      setMessageSections(sortMessageBySections(messages))
      scrollViewRef.current?.scrollToEnd()
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }

    connect()
  }, [])

  const onButtonSendPress = useCallback(() => {
    let message = {
      senderId: 1,
      receiverId: 2,
      type: "plain/text",
      content: messageContent,
      status: 0
    }
    stompClient.send(`/app/messages/1/2`, {}, JSON.stringify(message))
  }, [messageContent])

  const messageSectionRenderItems = (item: MessageSection, sectionIndex: number) => (
    <Fragment key={sectionIndex}>
      <MessageGroupTitle />
      {
        item?.data.map((item, itemIndex) => messageRenderItems(item, itemIndex))
      }
    </Fragment>
  )

  const messageRenderItems = useCallback(
    (item: MessageModel, index: number): JSX.Element => {
      if (item.sender.id == 1) {
        return <MessageSentItem key={index} data={item} showDate={true} />
      } else {
        return <MessageReceivedItem key={index} data={item} showDate={true} />
      }
    },
    [messageSections]
  )

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd()
    }
  }, [scrollViewRef, messageSections])

  return (
    <View style={styles.body}>
      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {
          messageSections.map((item, index) => messageSectionRenderItems(item, index))
        }
      </ScrollView>

      <MessageBottomBar
        onButtonSendPress={onButtonSendPress}
        onInputMessageContent={(value) => setMessageContent(value)} />
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
