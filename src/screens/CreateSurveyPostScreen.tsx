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
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isLengthInRange,
  isNotBlank,
  isNotContainSpecialCharacter
} from '../utils/ValidateUtils'

interface CreateSurveyPostScreenValidate {
  title: InputTextValidate
  description: InputTextValidate
}

const isAllFieldsValid = (validate: CreateSurveyPostScreenValidate): boolean => {
  let key: keyof CreateSurveyPostScreenValidate

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}

// man hinh dang bai viet khao sat
export default function CreateSurveyPostScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const [validate, setValidate] = useState<CreateSurveyPostScreenValidate>({
    title: {
      textError: 'Tiêu đề không được để trống',
      isVisible: false,
      isError: true
    },
    description: {
      textError: 'Mô tả không được để trống',
      isVisible: false,
      isError: true
    }
  })

  const defaultSurveyPost: SurveyPostRequest = useMemo(() => {
    return {
      type: 'khao-sat',
      title: '',
      description: '',
      images: [],
      userId: userLogin?.id ?? -1,
      questions: [],
      groupId: 1
    }
  }, [])

  useEffect(() => {
    dispatch(setSurveyPostRequest(defaultSurveyPost))
  }, [])

  const setTitleError = useCallback((error: string) => {
    setValidate({
      ...validate,
      title: {
        textError: error,
        isError: true,
        isVisible: true
      }
    })
    return
  }, [])

  const setDescriptionError = useCallback((error: string) => {
    setValidate({
      ...validate,
      description: {
        textError: error,
        isError: true,
        isVisible: true
      }
    })
    return
  }, [])

  const onTitleChangeText = useCallback(
    (value: string) => {
      console.log(surveyPostRequest)
      if (isBlank(value)) {
        setTitleError('Tiêu đề không được để trống')
        return
      }

      if (isContainSpecialCharacter(value)) {
        setTitleError('Tiêu đề không được để trống')
        return
      }

      if (!isLengthInRange(value, 1, 255)) {
        setTitleError('Tiêu đề không vượt quá 255 ký tự')
        return
      }

      if (surveyPostRequest) {
        dispatch(setSurveyPostRequest({ ...surveyPostRequest, title: value }))
      }

      setValidate({
        ...validate,
        title: {
          ...validate.title,
          isError: false,
          isVisible: false
        }
      })
    },
    [surveyPostRequest, validate.title]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      console.log(surveyPostRequest)
      if (isBlank(value)) {
        setDescriptionError('Mô tả không được để trống')
        return
      }

      if (isContainSpecialCharacter(value)) {
        setDescriptionError('Mô tả không được để trống')
        return
      }

      if (!isLengthInRange(value, 1, 255)) {
        setDescriptionError('Mô tả không vượt quá 255 ký tự')
        return
      }

      if (surveyPostRequest) {
        dispatch(setSurveyPostRequest({ ...surveyPostRequest, description: value }))
      }

      setValidate({
        ...validate,
        description: {
          ...validate.description,
          isError: false,
          isVisible: false
        }
      })
    },
    [surveyPostRequest, validate.description]
  )

  const onBtnNextPress = () => {
    if (isAllFieldsValid(validate)) {
      navigation.navigate(ADD_QUESTION_SCREEN)
    } else {
      let key: keyof CreateSurveyPostScreenValidate

      for (key in validate) {
        if (validate[key].isError && !validate[key].isVisible) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }

  return (
    <View style={styles.body}>
      <TextInputWithTitle
        value={surveyPostRequest?.title ?? ''}
        onChangeText={(value) => onTitleChangeText(value)}
        title='Tiêu đề'
        placeholder='Nhập tiêu đề...'
      />

      <TextValidate
        customStyle={{ marginLeft: 10 }}
        textError={validate.title.textError}
        isError={validate.title.isError}
        isVisible={validate.title.isVisible}
      />

      <TextInputWithTitle
        value={surveyPostRequest?.description ?? ''}
        onChangeText={(value) => onDescriptionChangeText(value)}
        title='Mô tả'
        placeholder='Nhập mô tả bài viết...'
        multiline={true}
        numberOfLine={7}
        textInputStyle={styles.textInputStyle}
      />

      <TextValidate
        customStyle={{ marginLeft: 10 }}
        textError={validate.description.textError}
        isError={validate.description.isError}
        isVisible={validate.description.isVisible}
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
