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
import { ErrorMessage, isExistFieldInvalid, validateField } from '../utils/ValidateHelper'
import { InputTextValidate } from '../utils/ValidateUtils'

interface CreateSurveyPostScreenValidate {
  title: InputTextValidate
  description: InputTextValidate
}

interface CreateSurveyPostErrorMessage {
  title: ErrorMessage
  description: ErrorMessage
}

const error: CreateSurveyPostErrorMessage = {
  title: {
    blank: 'CreateSurveyPostScreen.surveySaveTitleEmptyValidate'
  },
  description: {
    blank: 'CreateSurveyPostScreen.surveySaveDescEmptyValidate'
  }
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

  const { data, isLoading } = useGetSurveyPostUpdateQuery({
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
  }, [])

  const [validate, setValidate] = useState<CreateSurveyPostScreenValidate>({
    title: {
      textError: '',
      isVisible: false,
      isError: false
    },
    description: {
      textError: '',
      isVisible: false,
      isError: false
    }
  })

  const onTitleChangeText = useCallback(
    (value: string) => {
      validateField(error['title'], validate['title'], value)
      setValidate({ ...validate })
      dispatch(updateSurveyTitle(value))
    },
    [surveyPostRequest, validate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      validateField(error['description'], validate['description'], value)
      setValidate({ ...validate })
      dispatch(updateSurveyDescription(value))
    },
    [surveyPostRequest, validate]
  )

  const onBtnNextPress = useCallback(() => {
    if (surveyPostRequest) {
      if (isExistFieldInvalid<SurveyPostRequest, CreateSurveyPostScreenValidate, CreateSurveyPostErrorMessage>(surveyPostRequest, validate, error)) {
        setValidate({ ...validate })
      } else {
        navigation.navigate(ADD_QUESTION_SCREEN)
      }
    }
  }, [surveyPostRequest, validate, data])

  return (
    <View style={styles.body}>
      {
        isLoading && surveyPostId !== -1
          ?
          <Loading title='Loading...' />
          :
          <Fragment>
            <TextInputWithTitle
              defaultValue={data?.data.title}
              onChangeText={(value) => onTitleChangeText(value)}
              title={t('CreateSurveyPostScreen.surveySaveTitleTitle')}
              placeholder={t('CreateSurveyPostScreen.surveySaveTitlePlaceholder')}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.title.textError)}
              isError={validate.title.isError}
              isVisible={validate.title.isVisible}
            />

            <TextInputWithTitle
              defaultValue={data?.data?.description}
              onChangeText={(value) => onDescriptionChangeText(value)}
              title={t('CreateSurveyPostScreen.surveySaveDescTitle')}
              placeholder={t('CreateSurveyPostScreen.surveySaveDescPlaceholder')}
              multiline={true}
              numberOfLine={7}
              textInputStyle={styles.textInputStyle}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.description.textError)}
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
