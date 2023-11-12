import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { QuestionProps } from '../../types/Question'
import RadioInputWithTitle from '../inputs/RadioInputWithTitle'
import QuestionBottomBarOptions from './QuestionBottomBarOptions'
import QuestionTitle from './QuestionTitle'

interface OneChoiceQuestionProps extends QuestionProps {
  onChangeValue?: (choice: number[]) => void
}

export default function OneChoiceQuestion(props: OneChoiceQuestionProps) {
  const [value, setValue] = useState('')
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
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value)
          if (props.dataResponse) {
            setSelectedChoiceIds([parseInt(value)])
          }
        }}
        value={value}
      >
        {(props.data?.choices &&
          props.data.choices.map((item, index) => {
            return <RadioInputWithTitle label={item} value={item} />
          })) ||
          (props.dataResponse?.choices &&
            props.dataResponse.choices.map((item, index) => {
              return (
                <RadioInputWithTitle
                  onPress={() => {
                    setValue(item.voteQuestionId.toString())
                    if (props.dataResponse) {
                      setSelectedChoiceIds([parseInt(item.voteQuestionId.toString())])
                    }
                  }}
                  label={item.content}
                  value={item.voteQuestionId.toString()}
                />
              )
            }))}
      </RadioButton.Group>
      {
        props.editMode && <QuestionBottomBarOptions
          reviewMode={props.reviewMode}
          conductMode={props.conductMode}
          index={props.index} />
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
