import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import QuestionTitle from './QuestionTitle'
import { QuestionProps } from '../../types/Question'

export default function ShortAnswerQuestion(props: QuestionProps) {
  return (
    <View style={styles.group}>
      <QuestionTitle title={`Câu hỏi ${props.index + 1}. ${props.data.title}`} index={props.index} />
      <TextInput editable={false} placeholder='Nhập câu trả lời...' style={styles.ip} />
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    marginTop: 10,
    marginHorizontal: 5
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16
  },
  ip: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#97A1B0',
    padding: 5
  }
})
