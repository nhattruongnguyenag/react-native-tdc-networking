import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Fragment, useCallback } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import AddQuestionView, { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { REVIEW_SURVEY_POST_SCREEN } from '../constants/Screen'
import { useAppSelector } from '../redux/Hook'

// man hinh them cau hoi
export default function AddQuestionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { surveyPostRequest, choices } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const onBtnBackPress = useCallback(() => {
    navigation.goBack()
  }, [])

  const onBtnNextPress = useCallback(() => {
    if (surveyPostRequest?.questions.length === 0) {
      Alert.alert('Lỗi', 'Thêm ít nhất 1 câu hỏi cho bài khảo sát')
      return
    }
    navigation.navigate(REVIEW_SURVEY_POST_SCREEN)
  }, [surveyPostRequest?.questions])
  return (
    <Fragment>
      <AddQuestionView />
      <ScrollView style={styles.body}>
        {surveyPostRequest?.questions.map((item, index) => {
          if (item.type === MULTI_CHOICE_QUESTION) {
            return <MultiChoiceQuestion
              editMode
              data={item}
              index={index}
            />
          } else if (item.type === ONE_CHOICE_QUESTION) {
            return <OneChoiceQuestion
              editMode
              data={item}
              index={index}
            />
          } else {
            return <ShortAnswerQuestion
              editMode
              data={item}
              index={index}
            />
          }
        })}

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ButtonFullWith
            btnStyle={{ marginRight: 10, width: 140 }}
            onPress={onBtnBackPress}
            iconName='arrow-left-thin'
            title='Quay lại'
          />

          <ButtonFullWith
            btnStyle={{ marginLeft: 10, width: 140 }}
            onPress={onBtnNextPress}
            iconName='arrow-right-thin'
            contentStyle={{ flexDirection: 'row-reverse' }}
            title='Tiếp theo'
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
