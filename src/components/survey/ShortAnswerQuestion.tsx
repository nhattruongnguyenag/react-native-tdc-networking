import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import QuestionTitle from './QuestionTitle'

interface ShortAnswerQuestionProps {
  title?: string
  onChangeText?: (value: string) => void
}

export default function ShortAnswerQuestion(props: ShortAnswerQuestionProps) {
  return (
    <View style={styles.group}>
      <QuestionTitle title='Bạn có đi làm thêm không?' />
      <TextInput placeholder='Nhập câu trả lời...' style={styles.ip}
        onChangeText={(value) => props.onChangeText && props.onChangeText(value)} />
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