import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import TextValidate from '../components/TextValidate'
import { ADD_QUESTION_SCREEN } from '../constants/Screen'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setSurveyPostRequest } from '../redux/Slice'
import { SurveyPostRequest } from '../types/SurveyPost'
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange } from '../utils/ValidateUtils'

export interface TextFieldValidate {
  textError: string
  textSuccess: string
  isError: boolean
  isVisible: boolean
}

// man hinh dang bai viet khao sat
export default function CreateSurveyPostScreen() {
  const [titleValidate, setTitleValidate] = useState<InputTextValidate>({
    textError: 'Tiêu đề không được để trống',
    isVisible: false,
    isError: true
  })

  const [descriptionValidate, setDescriptionValidate] = useState<InputTextValidate>({
    textError: 'Mô tả không được để trống',
    isVisible: false,
    isError: true
  })

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const defaultSurveyPost: SurveyPostRequest = useMemo(() => {
    return {
      type: 'khao-sat',
      title: '',
      description: '',
      images: [],
      userId: userLogin?.id ?? -1,
      questions: []
    }
  }, [])

  useEffect(() => {
    dispatch(setSurveyPostRequest(defaultSurveyPost))
  }, [])

  const onTitleChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: 'Tiêu đề không được để trống'
        })
      } else if (isContainSpecialCharacter(value)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: 'Tiêu đề không được chứa ký tự đặc biệt'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setTitleValidate({
          ...titleValidate,
          isError: true,
          textError: 'Tiêu đề không vượt quá 255 ký tự'
        })
      } else {
        setTitleValidate({
          ...titleValidate,
          isError: false,
          isVisible: false
        })
      }

      if (surveyPostRequest) {
        dispatch(setSurveyPostRequest({ ...surveyPostRequest, title: value }))
      }
    },
    [surveyPostRequest?.title, titleValidate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setDescriptionValidate({
          ...descriptionValidate,
          isError: true,
          textError: 'Mô tả không được để trống'
        })
      } else if (isContainSpecialCharacter(value)) {
        setDescriptionValidate({
          ...descriptionValidate,
          isError: true,
          textError: 'Mô tả không được chứa ký tự đặc biệt'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setDescriptionValidate({
          ...descriptionValidate,
          isError: true,
          textError: 'Mô tả không vượt quá 255 ký tự'
        })
      } else {
        setDescriptionValidate({
          ...descriptionValidate,
          isError: false,
          isVisible: false
        })
      }

      if (surveyPostRequest) {
        dispatch(setSurveyPostRequest({ ...surveyPostRequest, description: value }))
      }
    },
    [surveyPostRequest?.description, descriptionValidate]
  )

  const onBtnNextPress = () => {
    if (!titleValidate.isError && !descriptionValidate.isError) {
      navigation.navigate(ADD_QUESTION_SCREEN)
    } else if (titleValidate.isError) {
      setTitleValidate({ ...titleValidate, isVisible: true })
    } else if (descriptionValidate.isError) {
      setDescriptionValidate({ ...descriptionValidate, isVisible: true })
    }
  }

  return (
    <View style={styles.body}>
      <TextInputWithTitle
        value={surveyPostRequest?.title ?? ''}
        onFocus={() => setTitleValidate({ ...titleValidate, isVisible: true })}
        onChangeText={(value) => onTitleChangeText(value)}
        title='Tiêu đề'
        placeholder='Nhập tiêu đề...'
      />

      <TextValidate
        customStyle={{ marginLeft: 10 }}
        textError={titleValidate.textError}
        isError={titleValidate.isError}
        isVisible={titleValidate.isVisible}
      />

      <TextInputWithTitle
        value={surveyPostRequest?.description ?? ''}
        onFocus={() => setDescriptionValidate({ ...descriptionValidate, isVisible: true })}
        onChangeText={(value) => onDescriptionChangeText(value)}
        title='Mô tả'
        placeholder='Nhập mô tả bài viết...'
        multiline={true}
        numberOfLine={7}
        textInputStyle={styles.textInputStyle}
      />

      <TextValidate
        customStyle={{ marginLeft: 10 }}
        textError={descriptionValidate.textError}
        isError={descriptionValidate.isError}
        isVisible={descriptionValidate.isVisible}
      />

      <ButtonFullWith
        iconName='arrow-right-thin'
        btnStyle={styles.customBtnStyle}
        contentStyle={{ flexDirection: 'row-reverse' }}
        title='Tiếp theo'
        onPress={() => onBtnNextPress()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fff'
  },
  textInputStyle: {
    textAlignVertical: 'top',
    paddingTop: 15
  },
  customBtnStyle: {
    marginHorizontal: 10
  }
})
