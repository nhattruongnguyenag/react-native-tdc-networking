import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, View } from 'react-native'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import TextValidate from '../components/common/TextValidate'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { ADD_QUESTION_SCREEN } from '../constants/Screen'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setSurveyPostRequest } from '../redux/Slice'
import { SurveyPostRequest } from '../types/SurveyPost'
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange } from '../utils/ValidateUtils'

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

export default function CreateSurveyPostScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { userLogin, surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const t = useTranslation()

  const [validate, setValidate] = useState<CreateSurveyPostScreenValidate>({
    title: {
      textError: t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'),
      isVisible: false,
      isError: true
    },
    description: {
      textError: t('CreateSurveyPostScreen.surveySaveDescEmptyValidate'),
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
        textError: t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'),
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
        textError: t('CreateSurveyPostScreen.surveySaveDescEmptyValidate'),
        isError: true,
        isVisible: true
      }
    })
    return
  }, [])

  const onTitleChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setTitleError(t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'))
        return
      }

      if (isContainSpecialCharacter(value)) {
        setTitleError(t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'))
        return
      }

      if (!isLengthInRange(value, 1, 255)) {
        setTitleError(t('CreateSurveyPostScreen.surveySaveTitleOver255CharactersValidate'))
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
        setDescriptionError(t('CreateSurveyPostScreen.surveySaveDescEmptyValidate'))
        return
      }

      if (!isLengthInRange(value, 1, 255)) {
        setDescriptionError(t('CreateSurveyPostScreen.surveySaveDescOver255CharactersValidate'))
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
        title={t('CreateSurveyPostScreen.surveySaveTitleTitle')}
        placeholder={t('CreateSurveyPostScreen.surveySaveTitlePlaceholder')}
      />

      <TextValidate
        customStyle={{ marginLeft: 10 }}
        textError={t(`CreateSurveyPostScreen.${validate.title.textError}`)}
        isError={validate.title.isError}
        isVisible={validate.title.isVisible}
      />

      <TextInputWithTitle
        value={surveyPostRequest?.description ?? ''}
        onChangeText={(value) => onDescriptionChangeText(value)}
        title={t('CreateSurveyPostScreen.surveySaveDescTitle')}
        placeholder={t('CreateSurveyPostScreen.surveySaveDescPlaceholder')}
        multiline={true}
        numberOfLine={7}
        textInputStyle={styles.textInputStyle}
      />

      <TextValidate
        customStyle={{ marginLeft: 10 }}
        textError={t(`CreateSurveyPostScreen.${validate.description.textError}`)}
        isError={validate.description.isError}
        isVisible={validate.description.isVisible}
      />

      <ButtonFullWith
        iconName='arrow-right-thin'
        btnStyle={styles.customBtnStyle}
        contentStyle={{ flexDirection: 'row-reverse' }}
        title={t('CreateSurveyPostScreen.surveySaveButtonGoNext')}
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
