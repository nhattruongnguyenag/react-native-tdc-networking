import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-paper'
import ConversationItem from '../../components/items/ConversationItem'
import { ScrollView } from 'react-native-gesture-handler'
import ConversationListView from '../../components/listviews/ConversationListView'
import { Client, Frame, Message, over } from 'stompjs'
import SockJS from 'sockjs-client'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { Conversation } from '../../types/Conversation'
import { useAppSelector } from '../../redux/Hook'

export default function AllConversationGroupTab() {
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer)
  const [conversations, setConversations] = useState<Conversation[]>([])
  useEffect(() => {
    let stompClient: Client

    const connect = () => {
      const Sock = new SockJS(SERVER_ADDRESS + 'tdc-social-network-ws')
      stompClient = over(Sock)
      stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
      stompClient.subscribe('/topic/conversations', onMessageReceived)
      stompClient.send('/app/conversations/listen', {}, JSON.stringify(userLogin?.id))
    }

    const onMessageReceived = (payload: Message) => {
      const conversations = JSON.parse(payload.body) as Conversation[]
      setConversations(conversations)
    }

    const onError = (err: string | Frame) => {
      console.log(err)
    }

    connect()
  }, [])
  
  return (
    <ConversationListView data={conversations}/>
  )
}