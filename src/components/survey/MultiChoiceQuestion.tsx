import React from 'react'
import { StyleSheet, View } from 'react-native'
import { QuestionProps } from '../../types/Question'
import CheckboxInputWithTitle from '../inputs/CheckboxInputWithTitle'
import QuestionTitle from './QuestionTitle'

export default function MultiChoiceQuestion(props: QuestionProps) {
  return (
    <View style={styles.itemBody}>
      <QuestionTitle
        title={`Câu hỏi ${props.index + 1}. ${props.data.title}`}
        index={props.index}
        isDisableBtnDelete={props.isDisableDeleteBtn}
      />
      {props.data.choices.map((item, index) => {
        return <CheckboxInputWithTitle
          label={item}
          key={index} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  itemBody: {
    marginTop: 10,
    marginHorizontal: 5
  }
})
