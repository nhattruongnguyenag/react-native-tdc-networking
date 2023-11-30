import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { DeviceEventEmitter, StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../App'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import TextValidate from '../components/common/TextValidate'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { ADD_QUESTION_SCREEN } from '../constants/Screen'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useGetSurveyPostUpdateQuery } from '../redux/Service'
import { setSurveyPostRequest, updateQuestion, updateSurveyDescription, updateSurveyTitle } from '../redux/Slice'
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
  const route = useRoute<RouteProp<RootStackParamList, 'CREATE_SURVEY_SCREEN'>>()

  const defaultSurveyPost: SurveyPostRequest = {
    type: 'khao-sat',
    title: '',
    description: '',
    userId: userLogin?.id ?? -1,
    questions: [],
    groupId: route.params?.groupId
  }

  const { data, isSuccess, isFetching } = useGetSurveyPostUpdateQuery({
    postId: route.params?.surveyPostId ?? -1
  }, { refetchOnMountOrArgChange: true, refetchOnFocus: true })

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setSurveyPostRequest(data.data))
    }
  }, [data, isSuccess])

  useEffect(() => {
    dispatch(setSurveyPostRequest(defaultSurveyPost))
  }, [])

  const titleError = (value: string): string | null => {
    let isValid = null
    if (isBlank(value)) {
      isValid = t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate')
    }

    if (isContainSpecialCharacter(value)) {
      isValid = t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate')
    }

    if (!isLengthInRange(value, 1, 255)) {
      isValid = t('CreateSurveyPostScreen.surveySaveTitleOver255CharactersValidate')
    }

    return isValid
  }

  const descriptionError = (value: string): string | null => {
    let isValid = null

    if (isBlank(value)) {
      isValid = t('CreateSurveyPostScreen.surveySaveDescEmptyValidate')
    }

    if (!isLengthInRange(value, 1, 255)) {
      isValid = t('CreateSurveyPostScreen.surveySaveDescOver255CharactersValidate')
    }

    return isValid
  }

  const defaultValidate = useMemo<CreateSurveyPostScreenValidate>(() => {
    return {
      title: {
        textError: t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'),
        isVisible: false,
        isError: !Boolean(titleError(data?.data.title ?? ''))
      },
      description: {
        textError: t('CreateSurveyPostScreen.surveySaveDescEmptyValidate'),
        isVisible: false,
        isError: !Boolean(descriptionError(data?.data.description ?? ''))
      }
    }
  }, [])

  const [validate, setValidate] = useState<CreateSurveyPostScreenValidate>(defaultValidate)

  const setTitleError = useCallback((error: string | null) => {
    setValidate({
      ...validate,
      title: {
        textError: error ?? t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'),
        isError: true,
        isVisible: true
      }
    })
  }, [])

  const setDescriptionError = useCallback((error: string | null) => {
    setValidate({
      ...validate,
      description: {
        textError: error ?? t('CreateSurveyPostScreen.surveySaveDescEmptyValidate'),
        isError: true,
        isVisible: true
      }
    })
    return
  }, [])

  const onTitleChangeText = useCallback(
    (value: string) => {
      setTitleError(titleError(value) ?? '')

      dispatch(updateSurveyTitle(value))

      setValidate({
        ...validate,
        title: {
          ...validate.title,
          isError: false,
          isVisible: false
        }
      })
    },
    [validate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      setDescriptionError(descriptionError(value) ?? '')

      dispatch(updateSurveyDescription(value))

      setValidate({
        ...validate,
        description: {
          ...validate.description,
          isError: false,
          isVisible: false
        }
      })
    },
    [validate.description]
  )

  const onBtnNextPress = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      console.log(surveyPostRequest)
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
  }, [validate])
  return (
    <View style={styles.body}>
      <TextInputWithTitle
        defaultValue={surveyPostRequest?.title}
        onChangeText={(value) => onTitleChangeText(value)}
        title={t('CreateSurveyPostScreen.surveySaveTitleTitle')}
        placeholder={isFetching && route.params?.surveyPostId ? 'Loading...' : t('CreateSurveyPostScreen.surveySaveTitlePlaceholder')}
      />

      <TextValidate
        customStyle={{ marginLeft: 10 }}
        textError={t(`CreateSurveyPostScreen.${validate.title.textError}`)}
        isError={validate.title.isError}
        isVisible={validate.title.isVisible}
      />

      <TextInputWithTitle
        defaultValue={surveyPostRequest?.description}
        onChangeText={(value) => onDescriptionChangeText(value)}
        title={t('CreateSurveyPostScreen.surveySaveDescTitle')}
        placeholder={isFetching && route.params?.surveyPostId ? 'Loading...' : t('CreateSurveyPostScreen.surveySaveDescPlaceholder')}
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
