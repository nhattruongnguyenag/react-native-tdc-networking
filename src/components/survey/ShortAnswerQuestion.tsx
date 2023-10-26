import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import QuestionTitle from './QuestionTitle'
import { Question, QuestionProps } from '../../types/Question'

interface ShortAnswerQuestionProps extends QuestionProps {
  isEnableTextInput?: boolean
  onTextChange?: (value: string) => void
}

export default function ShortAnswerQuestion(props: ShortAnswerQuestionProps) {
  return (
    <View style={styles.group}>
      <QuestionTitle
        title={`Câu hỏi ${(props.index ?? -1) + 1}. ${props.data?.title ?? props.dataResponse?.title}`}
        index={props.index ?? 0}
        isDisableBtnDelete={props.isDisableDeleteBtn}
      />
      <TextInput
        onChangeText={(value) => props.onTextChange && props.onTextChange(value)}
        editable={Boolean(props.isEnableTextInput)}
        placeholder='Nhập câu trả lời...'
        style={styles.ip} />
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    marginTop: 15,
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
    padding: 5,
    marginBottom: 10
  }
})
