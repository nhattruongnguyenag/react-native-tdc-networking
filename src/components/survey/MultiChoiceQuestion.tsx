import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { QuestionProps } from '../../types/Question'
import CheckboxInputWithTitle from '../inputs/CheckboxInputWithTitle'
import QuestionTitle from './QuestionTitle'

interface MultiChoiceQuestionProps extends QuestionProps{
  onChangeValue?: (choice: number[]) => void
}

export default function MultiChoiceQuestion(props: MultiChoiceQuestionProps) {
  const [selectedChoiceIds, setSelectedChoiceIds] = useState<number[]>([])

  useEffect(() => {
    props.onChangeValue && props.onChangeValue(selectedChoiceIds)
  }, [selectedChoiceIds])

  return (
    <View style={styles.itemBody}>
      <QuestionTitle
        title={`Câu hỏi ${(props.index ?? -1) + 1}. ${props.data?.title ?? props.dataResponse?.title}`}
        index={props.index ?? 0}
        isDisableBtnDelete={props.isDisableDeleteBtn}
      />
      {
        props.data?.choices &&
        props.data.choices.map((item, index) => {
          return <CheckboxInputWithTitle
            label={item}
            key={index} />
        })
        ||
        props.dataResponse?.choices &&
        props.dataResponse.choices.map((item, index) => {
          return <CheckboxInputWithTitle
            onPress={() => {
              if (selectedChoiceIds.indexOf(item.voteQuestionId) != -1) {
                setSelectedChoiceIds(selectedChoiceIds.filter(value => value != item.voteQuestionId))
              } else {
                setSelectedChoiceIds([...selectedChoiceIds, item.voteQuestionId])
              }
            }}
            label={item.content}
            key={index} />
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  itemBody: {
    marginTop: 10,
    marginHorizontal: 5
  }
})
