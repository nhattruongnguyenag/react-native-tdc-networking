import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageSentItem from '../components/messages/MessageSentItem'
import MessageReceivedItem from '../components/messages/MessageReceivedItem'
import MessageGroupTitle from '../components/messages/MessageGroupTitle'

// man hinh nhan tin
export default function MessagerScreen() {
  return (
    <ScrollView style={styles.body}>
      <MessageGroupTitle />
      <MessageSentItem showDate={false}/>
      <MessageSentItem showDate={true}/>
      <MessageReceivedItem showDate={false}/>
      <MessageReceivedItem showDate={true}/>
      <MessageGroupTitle />
      <MessageReceivedItem showDate={false}/>
      <MessageReceivedItem showDate={true}/>
      <MessageSentItem showDate={false}/>
      <MessageSentItem showDate={false}/>
      <MessageSentItem showDate={false}/>
      <MessageSentItem showDate={true}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  }
})
