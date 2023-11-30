import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface QuestionTitleProps {
  required?: number,
  title: string
  index: number
  isDisableBtnDelete?: boolean
}

export default function QuestionTitle(props: QuestionTitleProps) {
  console.log('required', props.required)
  return (
    <View style={styles.body}>
      <Text style={styles.questionTitle}>{props.title}</Text>
      {
        Boolean(props.required)
        && <Text style={[{ color: 'red' }]}>*</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionTitle: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
