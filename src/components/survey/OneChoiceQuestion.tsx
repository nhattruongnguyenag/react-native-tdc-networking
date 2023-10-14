import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { QuestionProps } from '../../types/Question'
import RadioInputWithTitle from '../inputs/RadioInputWithTitle'
import QuestionTitle from './QuestionTitle'

export default function OneChoiceQuestion(props: QuestionProps) {
  const [value, setValue] = React.useState('Có đi làm thêm.')

  return (
    <View style={styles.itemBody}>
      <QuestionTitle title={`Câu hỏi ${props.index + 1}. ${props.data.title}`} index={props.index} />
      <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
        {
          props.data.choices.map((item, index) => {
            return <RadioInputWithTitle label={item} value={index.toString()} />
          })
        }
      </RadioButton.Group>
    </View>
  )
}

const styles = StyleSheet.create({
  itemBody: {
    marginTop: 10,
    marginHorizontal: 5
  }
})
