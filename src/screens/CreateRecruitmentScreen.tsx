import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { Button } from 'react-native-paper'
import { useAddRecruitmentPostMutation } from '../redux/Service'
import { RecruitmentPostRequest } from '../types/request/RecruitmentPostRequest'
import { useAppSelector } from '../redux/Hook'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import TextValidate from '../components/common/TextValidate'
import { InputTextValidate, isBlank } from '../utils/ValidateUtils'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RECRUITMENT_BENEFIT_EMPTY_VALIDATE, RECRUITMENT_BENEFIT_PLACEHOLDER, RECRUITMENT_BENEFIT_TITLE, RECRUITMENT_DESC_EMPTY_VALIDATE, RECRUITMENT_EMPLOYMENT_TYPE_EMPTY_VALIDATE, RECRUITMENT_EXPIRATION_VALIDATE, RECRUITMENT_LOCATION_EMPTY_VALIDATE, RECRUITMENT_REQUIREMENT_EMPTY_VALIDATE, RECRUITMENT_SALARY_EMPTY_VALIDATE, RECRUITMENT_SAVE_DESC_PLACEHOLDER, RECRUITMENT_SAVE_DESC_TITLE, RECRUITMENT_SAVE_EMPLOYMENT_TYPE_PLACEHOLDER, RECRUITMENT_SAVE_EXPIRATION_PICKER_LOCALE, RECRUITMENT_SAVE_EXPIRATION_TITLE, RECRUITMENT_SAVE_LOCATION_PLACEHOLDER, RECRUITMENT_SAVE_LOCATION_TITLE, RECRUITMENT_SAVE_REQUIREMENT_PLACEHOLDER, RECRUITMENT_SAVE_REQUIREMENT_TITLE, RECRUITMENT_SAVE_SALLARY_PLACEHOLDER, RECRUITMENT_SAVE_SALLARY_TITLE, RECRUITMENT_SAVE_SAVE_EMPLOYMENT_TYPE_TITLE, RECRUITMENT_SAVE_SUCCESS_CONTENT, RECRUITMENT_SAVE_SUCCESS_TITLE, RECRUITMENT_SAVE_TITLE_PLACEHOLDER, RECRUITMENT_SAVE_TITLE_TITLE, RECRUITMENT_TITLE_EMPTY_VALIDATE } from '../constants/StringVietnamese'

interface CreateRecruitmentPostValidate {
  title: InputTextValidate
  desc: InputTextValidate
  benefit: InputTextValidate
  salary: InputTextValidate
  expiration: InputTextValidate
  employmentType: InputTextValidate
  location: InputTextValidate
  requirement: InputTextValidate
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

export default function CreateRecruitmentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [createRecruitmentPostRequest, createRecruitmentPostResponse] = useAddRecruitmentPostMutation()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const expirationRef = useRef<TextInput | null>(null)
  const [createRecruitmentModel, setCreateRecruitmentModel] = useState<RecruitmentPostRequest>({
    userId: userLogin?.id ?? -1,
    images: [],
    type: 'tuyen-dung',
    title: '',
    salary: 0,
    benefit: '',
    description: '',
    employmentType: '',
    location: '',
    requirement: '',
    groupId: 2,
    expiration: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
  })

  const [validate, setValidate] = useState<CreateRecruitmentPostValidate>({
    title: {
      textError: RECRUITMENT_TITLE_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    },
    desc: {
      textError: RECRUITMENT_DESC_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    },
    benefit: {
      textError: RECRUITMENT_BENEFIT_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    },
    salary: {
      textError: RECRUITMENT_SALARY_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    },
    expiration: {
      textError: RECRUITMENT_EXPIRATION_VALIDATE,
      isError: false,
      isVisible: false
    },
    employmentType: {
      textError: RECRUITMENT_EMPLOYMENT_TYPE_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    },
    location: {
      textError: RECRUITMENT_LOCATION_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    },
    requirement: {
      textError: RECRUITMENT_REQUIREMENT_EMPTY_VALIDATE,
      isError: true,
      isVisible: false
    }
  })

  const onTitleChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          title: {
            ...validate.title,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          title: {
            ...validate.title,
            isError: false,
            isVisible: false
          }
        })

        setCreateRecruitmentModel({ ...createRecruitmentModel, title: value })
      }
    },
    [validate]
  )

  const onSalaryChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          salary: {
            ...validate.salary,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          salary: {
            ...validate.salary,
            isError: false,
            isVisible: false
          }
        })

        setCreateRecruitmentModel({ ...createRecruitmentModel, salary: parseInt(value) })
      }
    },
    [validate]
  )

  useEffect(() => {
    console.log(moment().isAfter(moment(createRecruitmentModel.expiration)))
    if (moment().isAfter(moment(createRecruitmentModel.expiration))) {
      setValidate({
        ...validate,
        expiration: {
          ...validate.expiration,
          isError: true,
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        expiration: {
          ...validate.expiration,
          isError: false,
          isVisible: false
        }
      })
    }
  }, [createRecruitmentModel.expiration])

  const onBenefitChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          benefit: {
            ...validate.benefit,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          benefit: {
            ...validate.benefit,
            isError: false,
            isVisible: false
          }
        })

        setCreateRecruitmentModel({ ...createRecruitmentModel, benefit: value })
      }
    },
    [validate]
  )

  const onDescriptionChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          desc: {
            ...validate.desc,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          desc: {
            ...validate.desc,
            isError: false,
            isVisible: false
          }
        })

        setCreateRecruitmentModel({ ...createRecruitmentModel, description: value })
      }
    },
    [validate]
  )

  const onEmploymentTypeChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          employmentType: {
            ...validate.employmentType,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          employmentType: {
            ...validate.employmentType,
            isError: false,
            isVisible: false
          }
        })

        setCreateRecruitmentModel({ ...createRecruitmentModel, employmentType: value })
      }
    },
    [validate]
  )

  const onLocationChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          location: {
            ...validate.location,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          location: {
            ...validate.location,
            isError: false,
            isVisible: false
          }
        })

        setCreateRecruitmentModel({ ...createRecruitmentModel, location: value })
      }
    },
    [validate]
  )

  const onRequirementChangeText = useCallback(
    (value: string) => {
      if (isBlank(value)) {
        setValidate({
          ...validate,
          requirement: {
            ...validate.requirement,
            isError: true,
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          requirement: {
            ...validate.requirement,
            isError: false,
            isVisible: false
          }
        })

        setCreateRecruitmentModel({ ...createRecruitmentModel, requirement: value })
      }
    },
    [validate]
  )

  const onBtnFinishPress = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      createRecruitmentPostRequest(createRecruitmentModel)
    } else {
      let key: keyof CreateRecruitmentPostValidate

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }, [validate])

  useEffect(() => {
    if (createRecruitmentPostResponse.data) {
      Alert.alert(RECRUITMENT_SAVE_SUCCESS_TITLE, RECRUITMENT_SAVE_SUCCESS_CONTENT)
      navigation.goBack()
    }
  }, [createRecruitmentPostResponse])

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        <TextInputWithTitle
          multiline
          title={RECRUITMENT_SAVE_TITLE_TITLE}
          placeholder={RECRUITMENT_SAVE_TITLE_PLACEHOLDER}
          onChangeText={(value) => onTitleChangeText(value)}
        />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.title?.textError}
          isError={validate.title?.isError}
          isVisible={validate.title?.isVisible}
        />

        <TextInputWithTitle
          title={RECRUITMENT_SAVE_SAVE_EMPLOYMENT_TYPE_TITLE}
          placeholder={RECRUITMENT_SAVE_EMPLOYMENT_TYPE_PLACEHOLDER}
          onChangeText={(value) => onEmploymentTypeChangeText(value)}
        />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.employmentType?.textError}
          isError={validate.employmentType?.isError}
          isVisible={validate.employmentType?.isVisible}
        />

        <TextInputWithTitle
          value={createRecruitmentModel.expiration}
          textInputRef={expirationRef}
          onFocus={() => {
            setShowDatePicker(true)
          }}
          title={RECRUITMENT_SAVE_EXPIRATION_TITLE}
          placeholder={moment().format('YYYY-MM-DD HH:mm:ss')}
        />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.expiration?.textError}
          isError={validate.expiration?.isError}
          isVisible={validate.expiration?.isVisible}
        />

        <DatePicker
          modal
          mode='datetime'
          locale={RECRUITMENT_SAVE_EXPIRATION_PICKER_LOCALE}
          open={showDatePicker}
          date={new Date()}
          onConfirm={(date) => {
            setCreateRecruitmentModel({
              ...createRecruitmentModel,
              expiration: moment(date).format('YYYY-MM-DD HH:mm:ss')
            })
            expirationRef.current?.blur()
            setShowDatePicker(false)
          }}
          onCancel={() => {
            expirationRef.current?.blur()
            setShowDatePicker(false)
          }}
        />

        <TextInputWithTitle
          multiline
          numberOfLine={3}
          textInputStyle={{ textAlignVertical: 'top' }}
          title={RECRUITMENT_SAVE_LOCATION_TITLE}
          placeholder={RECRUITMENT_SAVE_LOCATION_PLACEHOLDER}
          onChangeText={(value) => onLocationChangeText(value)}
        />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.location?.textError}
          isError={validate.location?.isError}
          isVisible={validate.location?.isVisible}
        />

        <TextInputWithTitle
          multiline
          numberOfLine={5}
          textInputStyle={{ textAlignVertical: 'top' }}
          title={RECRUITMENT_SAVE_DESC_TITLE}
          placeholder={RECRUITMENT_SAVE_DESC_PLACEHOLDER}
          onChangeText={(value) => onDescriptionChangeText(value)}
        />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.desc?.textError}
          isError={validate.desc?.isError}
          isVisible={validate.desc?.isVisible}
        />

        <TextInputWithTitle title={RECRUITMENT_SAVE_SALLARY_TITLE} placeholder={RECRUITMENT_SAVE_SALLARY_PLACEHOLDER} onChangeText={(value) => onSalaryChangeText(value)} />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.salary?.textError}
          isError={validate.salary?.isError}
          isVisible={validate.salary?.isVisible}
        />

        <TextInputWithTitle
          multiline
          numberOfLine={5}
          textInputStyle={{ textAlignVertical: 'top' }}
          title={RECRUITMENT_SAVE_REQUIREMENT_TITLE}
          placeholder={RECRUITMENT_SAVE_REQUIREMENT_PLACEHOLDER}
          onChangeText={(value) => onRequirementChangeText(value)}
        />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.requirement?.textError}
          isError={validate.requirement?.isError}
          isVisible={validate.requirement?.isVisible}
        />

        <TextInputWithTitle
          multiline
          numberOfLine={5}
          textInputStyle={{ textAlignVertical: 'top' }}
          title={RECRUITMENT_BENEFIT_TITLE}
          placeholder={RECRUITMENT_BENEFIT_PLACEHOLDER}
          onChangeText={(value) => onBenefitChangeText(value)}
        />

        <TextValidate
          customStyle={{ marginLeft: 10 }}
          textError={validate.benefit?.textError}
          isError={validate.benefit?.isError}
          isVisible={validate.benefit?.isVisible}
        />

        <Button
          icon='plus'
          mode='contained'
          buttonColor={'#0065FF'}
          style={styles.buttonCreateRecruitment}
          onPress={() => onBtnFinishPress()}
        >
          <Text style={styles.buttonCreateRecruitmentTitle}>{RECRUITMENT_BENEFIT_PLACEHOLDER}</Text>
        </Button>
      </ScrollView>
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
