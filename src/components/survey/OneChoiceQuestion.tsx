import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { CONDUCT_MODE, EDIT_MODE } from '../../constants/Variables'
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
  const t = useTranslation()

  useEffect(() => {
    props.onChangeValue && props.onChangeValue(selectedChoiceIds)
  }, [selectedChoiceIds])

  return (
    <View style={styles.itemBody}>
      <QuestionTitle
        required={props.mode.includes(CONDUCT_MODE) ? props.dataResponse?.required : props.data?.required}
        title={`${t('MultiChoiceQuestion.questionComponentAddTextTitle')} ${(props.index ?? -1) + 1}. ${props.data?.title ?? props.dataResponse?.title}`}
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
        {(props.data?.choices
          &&
          props.data.choices.map((item, index) => {
            return <RadioInputWithTitle label={item.content} value={item.id ? String(item.id) : String(index)} />
          })) ||
          (props.dataResponse?.choices &&
            props.dataResponse.choices.map((item, index) => {
              return (
                <RadioInputWithTitle
                  onPress={() => {
                    setValue(item.id.toString())
                    if (props.dataResponse) {
                      setSelectedChoiceIds([parseInt(item.id.toString())])
                    }
                  }}
                  label={item.content}
                  value={item.id.toString()}
                />
              )
            }))}
      </RadioButton.Group>
      {
        props.mode.includes(EDIT_MODE) && <QuestionBottomBarOptions
          mode={props.mode}
          index={props.index}
          onBtnUpdateQuestionPress={props.onUpdateQuestion} />
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
