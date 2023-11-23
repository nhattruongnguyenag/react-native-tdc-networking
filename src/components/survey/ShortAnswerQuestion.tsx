import React from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, TextInput, View } from 'react-native'
import { QuestionProps } from '../../types/Question'
import QuestionBottomBarOptions from './QuestionBottomBarOptions'
import QuestionTitle from './QuestionTitle'

interface ShortAnswerQuestionProps extends QuestionProps {
  isEnableTextInput?: boolean
  onTextChange?: (value: string) => void
}

export default function ShortAnswerQuestion(props: ShortAnswerQuestionProps) {
  const t = useTranslation()
  return (
    <View style={styles.group}>
      <QuestionTitle
        required={props.conductMode ? props.dataResponse?.required : props.data?.required}
        title={`${t('MultiChoiceQuestion.questionComponentAddTextTitle')} ${(props.index ?? -1) + 1}. ${props.data?.title ?? props.dataResponse?.title}`}
        index={props.index ?? 0}
        isDisableBtnDelete={props.isDisableDeleteBtn}
      />
      <TextInput
        onChangeText={(value) => props.onTextChange && props.onTextChange(value)}
        editable={Boolean(props.isEnableTextInput)}
        placeholder={t('ShortAnswerQuestion.shortAnswerQuestionComponentTitlePlaceholder')}
        style={styles.ip}
      />
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
