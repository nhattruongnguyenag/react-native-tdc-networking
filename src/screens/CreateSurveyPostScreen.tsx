import React, { Fragment } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import AddQuestionView, { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { useAppSelector } from '../redux/Hook'

// man hinh dang bai viet khao sat
export default function CreateSurveyPostScreen() {
  const { questions } = useAppSelector(state => state.TDCSocialNetworkReducer)

  return (
    <Fragment>
      <AddQuestionView />
      <ScrollView style={styles.body}>
        {
          questions.map((item, index) => {
            if (item.type === MULTI_CHOICE_QUESTION) {
              return <MultiChoiceQuestion data={item} index={index} />
            } else if (item.type === ONE_CHOICE_QUESTION) {
              return <OneChoiceQuestion data={item} index={index} />
            } else {
              return <ShortAnswerQuestion data={item} index={index} />
            }
          })
        }
        <ButtonFullWith title='Hoàn tất' />
      </ScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  }
})
