import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ConversationItem from '../items/ConversationItem'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import SockJS from 'sockjs-client'
import { Client, Frame, Message, over } from 'stompjs'
import { Conversation } from '../../types/Conversation'

interface ConversationListViewProps {
  data: Conversation[]
}

export default function ConversationListView({ data }: ConversationListViewProps) {

  return (
    <ScrollView>
      <FlatList
        data={data}
        renderItem={({ index, item }) => <ConversationItem key={index} data={item}/>}
      />
    </ScrollView>
  )
}