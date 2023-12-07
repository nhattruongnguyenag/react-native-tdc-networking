import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Button } from 'react-native-paper'
import { RootStackParamList } from '../App'
import Loading from '../components/common/Loading'
import TextValidate from '../components/common/TextValidate'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { useAppSelector } from '../redux/Hook'
import { useAddRecruitmentPostMutation, useGetRecruitmentPostUpdateQuery, useUpdateRecruitmentPostMutation } from '../redux/Service'
import { RecruitmentPost } from '../types/RecruitmentPost'
import { ErrorMessage, isExistFieldInvalid, validateField } from '../utils/ValidateHelper'
import { InputTextValidate, isBlank } from '../utils/ValidateUtils'

interface CreateRecruitmentPostValidate {
  title: InputTextValidate
  description: InputTextValidate
  benefit: InputTextValidate
  salary: InputTextValidate
  expiration: InputTextValidate
  employmentType: InputTextValidate
  location: InputTextValidate
  requirement: InputTextValidate
}


interface CreateRecruitmentPostError {
  title: ErrorMessage
  description: ErrorMessage
  benefit: ErrorMessage
  salary: ErrorMessage
  expiration: ErrorMessage
  employmentType: ErrorMessage
  location: ErrorMessage
  requirement: ErrorMessage
}

const error: CreateRecruitmentPostError = {
  title: {
    blank: 'RecruitmentScreen.recruitmentTitleEmptyValidate'
  },
  description: {
    blank: 'RecruitmentScreen.recruitmentDescEmptyValidate'
  },
  benefit: {
    blank: 'RecruitmentScreen.recruitmentBenefitEmptyValidate'
  },
  salary: {
    blank: 'RecruitmentScreen.recruitmentSalaryEmptyValidate'
  },
  expiration: {
    blank: 'RecruitmentScreen.recruitmentExpirationValidate'
  },
  employmentType: {
    blank: 'RecruitmentScreen.recruitmentEmploymentTypeEmptyValidate'
  },
  location: {
    blank: 'RecruitmentScreen.recruitmentLocationEmptyValidate'
  },
  requirement: {
    blank: 'RecruitmentScreen.recruitmentRequirementEmptyValidate'
  }
}

const isAllFieldsValid = (validate: CreateRecruitmentPostValidate): boolean => {
  let key: keyof CreateRecruitmentPostValidate

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}

const BUSINESS_CONNECT_GROUP = 2

export default function CreateRecruitmentScreen() {
  const t = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [createRecruitmentPostRequest, createRecruitmentPostResponse] = useAddRecruitmentPostMutation()
  const [updateRecruitmentPostRequest, updateRecruitmentPostResponse] = useUpdateRecruitmentPostMutation()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const expirationRef = useRef<TextInput | null>(null)
  const route = useRoute<RouteProp<RootStackParamList, 'CREATE_RECRUITMENT_SCREEN'>>()

  const recruitmentId = route.params?.recruitmentPostId ?? -1

  const { data, isSuccess, isFetching } = useGetRecruitmentPostUpdateQuery({
    postId: recruitmentId
  }, { refetchOnMountOrArgChange: true, refetchOnFocus: true })

  const defaultRecruitmentModel: RecruitmentPost = {
    userId: userLogin?.id ?? -1,
    type: 'tuyen-dung',
    title: '',
    salary: -1,
    benefit: '',
    description: '',
    employmentType: '',
    location: '',
    requirement: '',
    groupId: BUSINESS_CONNECT_GROUP,
    expiration: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
  }

  const [recruitmentModel, setRecruitmentModel] = useState<RecruitmentPost>(defaultRecruitmentModel)

  useEffect(() => {
    if (data && isSuccess) {
      setRecruitmentModel(data)
    }
  }, [data, isSuccess])

  const defaultValidate = useMemo(() => (
    {
      title: {
        textError: '',
        isError: true,
        isVisible: false
      },
      description: {
        textError: '',
        isError: true,
        isVisible: false
      },
      benefit: {
        textError: '',
        isError: true,
        isVisible: false
      },
      salary: {
        textError: '',
        isError: true,
        isVisible: false
      },
      expiration: {
        textError: 'RecruitmentScreen.recruitmentExpirationValidate',
        isError: moment().isAfter(moment(data?.expiration)),
        isVisible: false
      },
      employmentType: {
        textError: '',
        isError: true,
        isVisible: false
      },
      location: {
        textError: '',
        isError: true,
        isVisible: false
      },
      requirement: {
        textError: '',
        isError: true,
        isVisible: false
      }
    }
  ), [])

  const [validate, setValidate] = useState<CreateRecruitmentPostValidate>(defaultValidate)

  const onTitleChangeText = useCallback(
    (value: string) => {
      validateField(error['title'], validate['title'], value)
      setValidate({ ...validate })
      setRecruitmentModel({ ...recruitmentModel, title: value })
    }, [validate]
  )

  const onSalaryChangeText = useCallback(
    (value: string) => {
      validateField(error['salary'], validate['salary'], value)
      setValidate({ ...validate })
      setRecruitmentModel({ ...recruitmentModel, salary: parseInt(value) });
    },
    [validate]
  );

  useEffect(() => {
    if (moment().isAfter(moment(recruitmentModel.expiration))) {
      setValidate({
        ...validate,
        expiration: {
          textError: error.expiration.blank,
          isError: true,
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        expiration: {
          textError: '',
          isError: false,
          isVisible: false
        }
      });
    }
  }, [recruitmentModel.expiration])

  const onBenefitChangeText = useCallback(
    (value: string) => {
      validateField(error['benefit'], validate['benefit'], value)
      setValidate({ ...validate })

      setRecruitmentModel({ ...recruitmentModel, benefit: value });
    },
    [validate]
  );

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      validateField(error['description'], validate['description'], value)
      setValidate({ ...validate })
      setRecruitmentModel({ ...recruitmentModel, description: value });
    },
    [validate]
  )

  const onEmploymentTypeChangeText = useCallback(
    (value: string) => {
      validateField(error['employmentType'], validate['employmentType'], value)
      setValidate({ ...validate })
      setRecruitmentModel({ ...recruitmentModel, employmentType: value });
    },
    [validate]
  )

  const onLocationChangeText = useCallback(
    (value: string) => {
      validateField(error['location'], validate['location'], value)
      setValidate({ ...validate })
      setRecruitmentModel({ ...recruitmentModel, location: value });
    },
    [validate]
  )

  const onRequirementChangeText = useCallback(
    (value: string) => {
      validateField(error['requirement'], validate['requirement'], value)
      setValidate({ ...validate })
      setRecruitmentModel({ ...recruitmentModel, requirement: value });
    },
    [validate]
  )

  const onBtnFinishPress = useCallback(() => {
    if (isExistFieldInvalid<RecruitmentPost, CreateRecruitmentPostValidate, CreateRecruitmentPostError>(recruitmentModel, validate, error)) {
      setValidate({ ...validate })
    } else {
      if (recruitmentModel.id) {
        updateRecruitmentPostRequest(recruitmentModel)
      } else {
        createRecruitmentPostRequest(recruitmentModel);
      }
    }
  }, [validate])

  useEffect(() => {
    if (createRecruitmentPostResponse.data) {
      Alert.alert(t('RecruitmentScreen.recruitmentSaveSuccessTitle'), t('RecruitmentScreen.recruitmentSaveSuccessContent'));
      navigation.goBack();
    }
  }, [createRecruitmentPostResponse])

  useEffect(() => {
    if (updateRecruitmentPostResponse.data) {
      Alert.alert(t('RecruitmentScreen.recruitmentUpdateSuccessTitle'), t('RecruitmentScreen.recruitmentUpdateSuccessContent'));
      navigation.goBack();
    }
  }, [updateRecruitmentPostResponse])

  return (
    <SafeAreaView style={styles.body}>
      {
        isFetching && recruitmentId !== -1 ? <Loading title='Loading...' />
          :
          <ScrollView>
            <TextInputWithTitle
              multiline
              defaultValue={recruitmentModel?.title}
              title={t('RecruitmentScreen.recruitmentSaveTitleTitle')}
              placeholder={t('RecruitmentScreen.recruitmentSaveTitlePlaceholder')}
              onChangeText={(value) => onTitleChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.title?.textError)}
              isError={validate.title?.isError}
              isVisible={validate.title?.isVisible}
            />

            <TextInputWithTitle
              defaultValue={recruitmentModel?.employmentType}
              title={t('RecruitmentScreen.recruitmentSaveSaveEmploymentTypeTitle')}
              placeholder={t('RecruitmentScreen.recruitmentSaveEmploymentTypePlaceholder')}
              onChangeText={(value) => onEmploymentTypeChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.employmentType?.textError)}
              isError={validate.employmentType?.isError}
              isVisible={validate.employmentType?.isVisible}
            />

            <TextInputWithTitle
              defaultValue={recruitmentModel.expiration}
              textInputRef={expirationRef}
              onFocus={() => {
                setShowDatePicker(true);
              }}
              title={t('RecruitmentScreen.recruitmentSaveExpirationTitle')}
              placeholder={moment().format('YYYY-MM-DD HH:mm:ss')}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.expiration?.textError)}
              isError={validate.expiration?.isError}
              isVisible={validate.expiration?.isVisible}
            />

            <DatePicker
              modal
              mode="datetime"
              locale={t('RecruitmentScreen.recruitmentSaveExpirationPickerLocale')}
              open={showDatePicker}
              date={new Date()}
              onConfirm={(date) => {
                setRecruitmentModel({
                  ...recruitmentModel,
                  expiration: moment(date).format('YYYY-MM-DD HH:mm:ss')
                });
                expirationRef.current?.blur();
                setShowDatePicker(false);
              }}
              onCancel={() => {
                expirationRef.current?.blur();
                setShowDatePicker(false);
              }}
            />

            <TextInputWithTitle
              multiline
              defaultValue={recruitmentModel?.location}
              numberOfLine={3}
              textInputStyle={{ textAlignVertical: 'top' }}
              title={t('RecruitmentScreen.recruitmentSaveLocationTitle')}
              placeholder={t('RecruitmentScreen.recruitmentSaveLocationPlaceholder')}
              onChangeText={(value) => onLocationChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.location?.textError)}
              isError={validate.location?.isError}
              isVisible={validate.location?.isVisible}
            />

            <TextInputWithTitle
              multiline
              defaultValue={recruitmentModel?.description}
              numberOfLine={5}
              textInputStyle={{ textAlignVertical: 'top' }}
              title={t('RecruitmentScreen.recruitmentSaveDescTitle')}
              placeholder={t('RecruitmentScreen.recruitmentSaveDescPlaceholder')}
              onChangeText={(value) => onDescriptionChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.description?.textError)}
              isError={validate.description?.isError}
              isVisible={validate.description?.isVisible}
            />

            <TextInputWithTitle
              keyboardType='number-pad'
              defaultValue={recruitmentModel?.salary === -1 ? '' : recruitmentModel?.salary.toString()}
              title={t('RecruitmentScreen.recruitmentSaveSallaryTitle')}
              placeholder={t('RecruitmentScreen.recruitmentSaveSallaryPlaceholder')}
              onChangeText={(value) => onSalaryChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.salary?.textError)}
              isError={validate.salary?.isError}
              isVisible={validate.salary?.isVisible}
            />

            <TextInputWithTitle
              multiline
              numberOfLine={5}
              defaultValue={recruitmentModel?.requirement}
              textInputStyle={{ textAlignVertical: 'top' }}
              title={t('RecruitmentScreen.recruitmentSaveRequirementTitle')}
              placeholder={t('RecruitmentScreen.recruitmentSaveRequirementPlaceholder')}
              onChangeText={(value) => onRequirementChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.requirement?.textError)}
              isError={validate.requirement?.isError}
              isVisible={validate.requirement?.isVisible}
            />

            <TextInputWithTitle
              multiline
              numberOfLine={5}
              defaultValue={recruitmentModel?.benefit}
              textInputStyle={{ textAlignVertical: 'top' }}
              title={t('RecruitmentScreen.recruitmentBenefitTitle')}
              placeholder={t('RecruitmentScreen.recruitmentBenefitPlaceholder')}
              onChangeText={(value) => onBenefitChangeText(value)}
            />

            <TextValidate
              customStyle={{ marginLeft: 10 }}
              textError={t(validate.benefit?.textError)}
              isError={validate.benefit?.isError}
              isVisible={validate.benefit?.isVisible}
            />

            <Button
              loading={recruitmentModel.id ? updateRecruitmentPostResponse.isLoading : createRecruitmentPostResponse.isLoading}
              icon="plus"
              mode="contained"
              rippleColor={'#0065FF80'}
              buttonColor={'#0065FF'}
              style={styles.buttonCreateRecruitment}
              onPress={() => onBtnFinishPress()}
            >
              <Text style={styles.buttonCreateRecruitmentTitle}>{t('RecruitmentScreen.recruitmentSaveCompleteButton')}</Text>
            </Button>
          </ScrollView>
      }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    padding: 5,
    backgroundColor: '#fff'
  },
  buttonCreateRecruitment: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 20,
    paddingVertical: 5
  },
  buttonCreateRecruitmentTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
