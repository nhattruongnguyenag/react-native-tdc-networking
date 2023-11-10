import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useAppDispatch } from '../../redux/Hook'
import { deleteQuestion } from '../../redux/Slice'

interface QuestionTitleProps {
  required?: number,
  title: string
  index: number
  isDisableBtnDelete?: boolean
}

export default function QuestionTitle(props: QuestionTitleProps) {
    return (
    <View style={styles.body}>
      <Text style={styles.questionTitle}>{props.title}</Text>
      <Text style={[{color: 'red'}]}>*</Text>
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
