import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Pressable, StyleSheet, View } from 'react-native'
import { CONDUCT_MODE, EDIT_MODE } from '../../constants/Variables'
import { QuestionProps } from '../../types/Question'
import CheckboxInputWithTitle from '../inputs/CheckboxInputWithTitle'
import QuestionBottomBarOptions from './QuestionBottomBarOptions'
import QuestionTitle from './QuestionTitle'

interface MultiChoiceQuestionProps extends QuestionProps {
  onChangeValue?: (choice: number[]) => void
}

export default function MultiChoiceQuestion(props: MultiChoiceQuestionProps) {
  const [selectedChoiceIds, setSelectedChoiceIds] = useState<number[]>([])
  const t = useTranslation()

  useEffect(() => {
    props.onChangeValue && props.onChangeValue(selectedChoiceIds)
  }, [selectedChoiceIds])

  return (
    <Pressable style={styles.itemBody}>
      <QuestionTitle
        required={props.mode.includes(CONDUCT_MODE) ? props.dataResponse?.required : props.data?.required}
        title={`${t('MultiChoiceQuestion.questionComponentAddTextTitle')} ${(props.index ?? -1) + 1}. ${props.data?.title ?? props.dataResponse?.title}`}
        index={props.index ?? 0}
        isDisableBtnDelete={props.isDisableDeleteBtn}
      />
      {(props.data?.choices &&
        props.data.choices.map((item, index) => {
          return <CheckboxInputWithTitle label={item.content} key={index} />
        })) ||
        (props.dataResponse?.choices &&
          props.dataResponse.choices.map((item, index) => {
            return (
              <CheckboxInputWithTitle
                onPress={() => {
                  if (selectedChoiceIds.indexOf(item.id) != -1) {
                    setSelectedChoiceIds(selectedChoiceIds.filter((value) => value != item.id))
                  } else {
                    setSelectedChoiceIds([...selectedChoiceIds, item.id])
                  }
                }}
                label={item.content}
                key={index}
              />
            )
          }))}
      {
        props.mode.includes(EDIT_MODE) && <QuestionBottomBarOptions
          mode={props.mode}
          index={props.index}
          onBtnUpdateQuestionPress={props.onUpdateQuestion} />
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemBody: {
    marginTop: 10,
    marginHorizontal: 5
  }
})
