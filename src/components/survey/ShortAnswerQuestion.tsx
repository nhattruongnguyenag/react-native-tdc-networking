import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { QUESTION_COMPONENT_ADD_TEXT_TITLE, SHORT_ANSWER_QUESTION_COMPONENT_TITLE_PLACEHOLDER } from '../../constants/StringVietnamese'
import { QuestionProps } from '../../types/Question'
import QuestionBottomBarOptions from './QuestionBottomBarOptions'
import QuestionTitle from './QuestionTitle'

interface ShortAnswerQuestionProps extends QuestionProps {
  isEnableTextInput?: boolean
  onTextChange?: (value: string) => void
}

export default function ShortAnswerQuestion(props: ShortAnswerQuestionProps) {
  return (
    <View style={styles.group}>
      <QuestionTitle
        required={props.conductMode ? props.dataResponse?.required : props.data?.required}
        title={`${QUESTION_COMPONENT_ADD_TEXT_TITLE} ${(props.index ?? -1) + 1}. ${props.data?.title ?? props.dataResponse?.title}`}
        index={props.index ?? 0}
        isDisableBtnDelete={props.isDisableDeleteBtn}
      />
      <TextInput
        onChangeText={(value) => props.onTextChange && props.onTextChange(value)}
        editable={Boolean(props.isEnableTextInput)}
        placeholder={SHORT_ANSWER_QUESTION_COMPONENT_TITLE_PLACEHOLDER}
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
