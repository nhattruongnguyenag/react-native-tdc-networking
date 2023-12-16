import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import { QuestionUpdate } from '../components/survey/AddQuestionChoice'
import AddQuestionModal, { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionModal'
import ChooseQuestionBar, { QuestionType } from '../components/survey/ChooseQuestionBar'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { REVIEW_SURVEY_POST_SCREEN } from '../constants/Screen'
import { EDIT_MODE } from '../constants/Variables'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { addQuestion } from '../redux/Slice'

// man hinh them cau hoi
export default function AddQuestionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [questionUpdate, setQuestionUpdate] = useState<QuestionUpdate | null>(null)
  const dispatch = useAppDispatch()

  const t = useTranslation()

  const onBtnBackPress = useCallback(() => {
    navigation.goBack()
  }, [])

  const onBtnNextPress = useCallback(() => {
    if (surveyPostRequest?.questions.length === 0) {
      Alert.alert(t('AddQuestionScreen.textEmptyQuestionErrorTitle'), t('AddQuestionScreen.textEmptyQuestionErrorContent'))
      return
    }
    navigation.navigate(REVIEW_SURVEY_POST_SCREEN)
  }, [surveyPostRequest?.questions])

  const [selectedType, setSelectedType] = useState<QuestionType | null>(null)

  const onUpdateQuestion = (questionIndex: number) => {
    if (surveyPostRequest) {
      setQuestionUpdate({
        index: questionIndex,
        data: surveyPostRequest.questions[questionIndex]
      })
    }
  }

  return (
    <Fragment>
      <ChooseQuestionBar onQuestionTypeDropdownChange={(questionType) => {
        setSelectedType(questionType)
      }} />

      <AddQuestionModal
        questionUpdate={questionUpdate}
        type={selectedType}
        onDismiss={() => {
          if (questionUpdate) {
            setQuestionUpdate(null)
          }
          setSelectedType(null)
        }}
        onCompleteSaveQuestion={(question) => {
          dispatch(addQuestion(question))
        }} />

      <ScrollView style={styles.body}>
        {surveyPostRequest?.questions.map((item, index) => {
          if (item.type === MULTI_CHOICE_QUESTION) {
            return <MultiChoiceQuestion
              mode={[EDIT_MODE]}
              data={item}
              index={index}
              onUpdateQuestion={(questionIndex) => onUpdateQuestion(questionIndex)}
            />
          } else if (item.type === ONE_CHOICE_QUESTION) {
            return <OneChoiceQuestion
              mode={[EDIT_MODE]}
              data={item}
              index={index}
              onUpdateQuestion={(questionIndex) => onUpdateQuestion(questionIndex)} />
          } else {
            return <ShortAnswerQuestion
              mode={[EDIT_MODE]}
              data={item}
              index={index}
              onUpdateQuestion={(questionIndex) => onUpdateQuestion(questionIndex)} />
          }
        })}

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ButtonFullWith
            textColor='#000'
            btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
            onPress={onBtnBackPress}
            iconName='arrow-left-thin'
            title={t('AddQuestionScreen.textButtonGoBack')}
          />

          <ButtonFullWith
            btnStyle={{ marginLeft: 10, width: 140 }}
            onPress={onBtnNextPress}
            iconName='arrow-right-thin'
            contentStyle={{ flexDirection: 'row-reverse' }}
            title={t('AddQuestionScreen.textButtonGoNext')}
          />
        </View>
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
