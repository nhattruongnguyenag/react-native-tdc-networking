import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../App'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import Loading from '../components/common/Loading'
import TextValidate from '../components/common/TextValidate'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { ADD_QUESTION_SCREEN } from '../constants/Screen'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { useGetSurveyPostUpdateQuery } from '../redux/Service'
import { setSurveyPostRequest, updateSurveyDescription, updateSurveyTitle } from '../redux/Slice'
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

  const surveyPostId = useMemo<number>(() => {
    return route.params?.surveyPostId ?? -1
  }, [])

  const defaultSurveyPost: SurveyPostRequest = {
    type: 'khao-sat',
    title: '',
    description: '',
    userId: userLogin?.id ?? -1,
    questions: [],
    groupId: route.params?.groupId
  }

  const { data, isSuccess, isLoading } = useGetSurveyPostUpdateQuery({
    postId: surveyPostId
  }, { refetchOnMountOrArgChange: true, refetchOnFocus: true })

  useEffect(() => {
    if (surveyPostId !== -1) {
      if (data) {
        dispatch(setSurveyPostRequest(data.data))
      }
    } else {
      dispatch(setSurveyPostRequest(defaultSurveyPost))
    }
  }, [isLoading])

  const titleError = (value: string): string | null => {
    let error = null
    if (isBlank(value)) {
      error = t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate')
    }

    if (isContainSpecialCharacter(value)) {
      error = t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate')
    }

    if (!isLengthInRange(value, 1, 255)) {
      error = t('CreateSurveyPostScreen.surveySaveTitleOver255CharactersValidate')
    }

    return error
  }

  const descriptionError = (value: string): string | null => {
    let error = null

    if (isBlank(value)) {
      error = t('CreateSurveyPostScreen.surveySaveDescEmptyValidate')
    }

    if (!isLengthInRange(value, 1, 255)) {
      error = t('CreateSurveyPostScreen.surveySaveDescOver255CharactersValidate')
    }

    return error
  }

  const defaultValidate = useMemo<CreateSurveyPostScreenValidate>(() => {
    return {
      title: {
        textError: t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'),
        isVisible: false,
        isError: titleError(data?.data.title ?? '') !== null
      },
      description: {
        textError: t('CreateSurveyPostScreen.surveySaveDescEmptyValidate'),
        isVisible: false,
        isError: descriptionError(data?.data.description ?? '') !== null
      }
    }
  }, [])

  const [validate, setValidate] = useState<CreateSurveyPostScreenValidate>(defaultValidate)

  const setTitleError = useCallback((error: string | null) => {
    setValidate({
      ...validate,
      title: {
        textError: error ?? t('CreateSurveyPostScreen.surveySaveTitleEmptyValidate'),
        isError: error !== null,
        isVisible: true
      }
    })
  }, [validate])

  const setDescriptionError = useCallback((error: string | null) => {
    setValidate({
      ...validate,
      description: {
        textError: error ?? t('CreateSurveyPostScreen.surveySaveDescEmptyValidate'),
        isError: error !== null,
        isVisible: true
      }
    })
  }, [validate])

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
    [validate]
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

  const defaultTitle = useMemo(() => {
    if (surveyPostId !== -1) {
      return data?.data.title ?? ""
    }
    return ""
  }, [isLoading])

  const defaultDescription = useMemo(() => {
    if (surveyPostId !== -1) {
      return data?.data?.description ?? ""
    }
    return ""
  }, [isLoading])

  return (
    <View style={styles.body}>
      {
        isLoading && surveyPostId !== -1
          ?
          <Loading title='Loading...' />
          :
          <Fragment>
            <TextInputWithTitle
              defaultValue={defaultTitle}
              onChangeText={(value) => onTitleChangeText(value)}
              title={t('CreateSurveyPostScreen.surveySaveTitleTitle')}
              placeholder={t('CreateSurveyPostScreen.surveySaveTitlePlaceholder')}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={validate.title.textError}
              isError={validate.title.isError}
              isVisible={validate.title.isVisible}
            />

            <TextInputWithTitle
              defaultValue={defaultDescription}
              onChangeText={(value) => onDescriptionChangeText(value)}
              title={t('CreateSurveyPostScreen.surveySaveDescTitle')}
              placeholder={t('CreateSurveyPostScreen.surveySaveDescPlaceholder')}
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
              title={t('CreateSurveyPostScreen.surveySaveButtonGoNext')}
              onPress={() => onBtnNextPress()}
            />
          </Fragment>
      }
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
