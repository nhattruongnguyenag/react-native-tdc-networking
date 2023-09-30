import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import AddQuestionView from '../components/survey/AddQuestionView'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'

// man hinh dang bai viet khao sat
export default function CreateSurveyPostScreen() {
  return (
    <ScrollView style={styles.body}>
      <MultiChoiceQuestion />
      <ShortAnswerQuestion title='Ngôn ngữ lập trình bạn đang sử dụng là gì?' />
      <OneChoiceQuestion />
      <MultiChoiceQuestion />
      <ShortAnswerQuestion title='Ngôn ngữ lập trình bạn đang sử dụng là gì?' />
      <AddQuestionView />
      <ButtonFullWith title='Hoàn tất' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  }
})
