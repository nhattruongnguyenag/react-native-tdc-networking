import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConversationListView from '../../components/listviews/ConversationListView'
import Loading from '../Loading'
import { useAppSelector } from '../../redux/Hook'

export default function ActiveConversationGroupTab() {
  const { conversations } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  return <ConversationListView data={conversations.filter(conversation => conversation.receiver.status === 1)} />
}
