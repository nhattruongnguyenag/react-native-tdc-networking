import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from '../components/survey/AddQuestionView'
import MultiChoiceQuestion from '../components/survey/MultiChoiceQuestion'
import OneChoiceQuestion from '../components/survey/OneChoiceQuestion'
import ShortAnswerQuestion from '../components/survey/ShortAnswerQuestion'
import { TOP_TAB_NAVIGATOR } from '../constants/Screen'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useAddSurveyPostMutation } from '../redux/Service'
import { setSurveyPostRequest } from '../redux/Slice'

export default function ReviewSurveyPostScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [addSurvey, addSurveyResult] = useAddSurveyPostMutation()
  const dispatch = useAppDispatch()

  const onBtnPublishPostPress = () => {
    if (surveyPostRequest) {
      addSurvey(surveyPostRequest)
    }
  }

  useEffect(() => {
    if (addSurveyResult.data) {
      if (addSurveyResult.data.status === 201 || 200) {
        Alert.alert('Thành công !!!', 'Bài khảo sát đã được lưu')
        navigation.navigate(TOP_TAB_NAVIGATOR)
      } else {
        Alert.alert('Thất bại !!!', 'Bài khảo sát thêm thất bại')
      }
    }
  }, [addSurveyResult])

  const onBtnBackPress = useCallback(() => {
    navigation.pop()
  }, [])

  return (
    <ScrollView style={styles.body}>
      <Text style={styles.surveyTitle}>{surveyPostRequest?.title}</Text>

      <Text style={styles.surveyDesc}>{surveyPostRequest?.description}</Text>

      <Text style={styles.textTitle}>Câu hỏi</Text>

      <View style={styles.questionWrapper}>
        {surveyPostRequest?.questions.map((item, index) => {
          if (item.type === MULTI_CHOICE_QUESTION) {
            return <MultiChoiceQuestion data={item} index={index} />
          } else if (item.type === ONE_CHOICE_QUESTION) {
            return <OneChoiceQuestion data={item} index={index} />
          } else {
            return <ShortAnswerQuestion data={item} index={index} />
          }
        })}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <ButtonFullWith
          btnStyle={{ marginRight: 10, width: 140 }}
          onPress={onBtnBackPress}
          iconName='arrow-left-thin'
          title='Quay lại'
        />

        <ButtonFullWith
          btnStyle={{ marginLeft: 10, width: 140 }}
          onPress={onBtnPublishPostPress}
          iconName='plus'
          title='Hoàn tất'
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  },
  textInputStyle: {
    textAlignVertical: 'top',
    paddingTop: 15,
    marginBottom: 10
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0065FF',
    marginTop: 15,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4
  },
  questionWrapper: {
    paddingHorizontal: 5
  },
  surveyTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginStart: 5,
    marginTop: 15
  },
  surveyDesc: {
    marginStart: 5,
    marginTop: 10,
    fontSize: 16
  }
})
