import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import { Conversation } from '../../types/Conversation'
import ConversationItem from '../items/ConversationItem'

interface ConversationListViewProps {
  data: Conversation[]
}

export default function ConversationListView({ data }: ConversationListViewProps) {
  return (
    <FlatList data={data} renderItem={({ index, item }) => <ConversationItem key={index} data={item} />} />
  )
}
