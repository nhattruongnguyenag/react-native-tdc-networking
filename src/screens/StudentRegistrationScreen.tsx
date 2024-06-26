import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ACCEPT_SCREEN, LOGIN_SCREEN } from '../constants/Screen'
import { COLOR_BTN_BLUE, COLOR_WHITE } from '../constants/Color'
import { Student } from '../types/Student'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import { ActivityIndicator } from 'react-native-paper'
import ActionSheet from 'react-native-actionsheet'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import { useAppSelector } from '../redux/Hook'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword,
  isPhone
} from '../utils/ValidateUtils'
import TextValidate from '../components/common/TextValidate'
import { useTranslation } from 'react-multi-lang'
import ImagePicker from '../components/ImagePicker'
import { Asset } from 'react-native-image-picker'
import { handleUploadImage } from '../utils/ImageHelper'
import { StudentRequest } from '../types/request/StudentRequest'
import { useAddStudentMutation } from '../redux/Service'

interface RegisterStudent {
  name: InputTextValidate
  email: InputTextValidate
  studentCode: InputTextValidate
  major: InputTextValidate
  facultyName: InputTextValidate
  password: InputTextValidate
  confimPassword: InputTextValidate
  phone: InputTextValidate
}

const isAllFieldsValid = (validate: RegisterStudent): boolean => {
  let key: keyof RegisterStudent

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}

// man hinh dang ky danh cho sinh vien
export default function StudentRegistrationScreen() {
  const t = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [imagePicker, setImagePicker] = useState<Asset[]>()
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const [saveStudent, saveStudentResponse] = useAddStudentMutation()
  const [student, setStudent] = useState<StudentRequest>({
    id: 0,
    password: '',
    code: Date.now().toString(),
    email: '',
    name: '',
    image: '',
    phone: '',
    facultyId: 0,
    majorId: 0,
    studentCode: '',
    confimPassword: '',
    subject: t('AuthenticateRegistraion.textSubjectAuthenRegistration'),
    content: ''
  })
  const [dataRequest, setDataRequest] = useState([
    {
      id: 0,
      name: '',
      majors: [
        {
          id: 0,
          name: ''
        }
      ]
    }
  ])

  const [dataNganhRequest, setDataNganhRequest] = useState([{ id: 0, name: '' }])
  const [isLoading, setIsLoading] = useState(false)
  const [validate, setValidate] = useState<RegisterStudent>({
    name: {
      textError: t('RegisterStudentComponent.errorStudentNameEmpty'),
      isVisible: false,
      isError: true
    },
    email: {
      textError: t('RegisterStudentComponent.errorEmailEmpty'),
      isVisible: false,
      isError: true
    },
    studentCode: {
      textError: t('RegisterStudentComponent.errorStudentCodeEmpty'),
      isVisible: false,
      isError: true
    },
    phone: {
      textError: t('RegisterStudentComponent.errorPhoneEmpty'),
      isVisible: false,
      isError: true
    },
    facultyName: {
      textError: t('RegisterStudentComponent.errorFaculityEmpty'),
      isVisible: false,
      isError: true
    },
    major: {
      textError: t('RegisterStudentComponent.errorMajor'),
      isVisible: false,
      isError: true
    },
    password: {
      textError: t('RegisterStudentComponent.errorPasswordEmpty'),
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: t('RegisterStudentComponent.errorConfimPasswordEmpty'),
      isVisible: false,
      isError: true
    }
  })
  const [value, setValue] = useState(t('RegisterStudentComponent.placeholderFaculity'))
  const [item, setItem] = useState(t('RegisterStudentComponent.placeholderMajor'))
  const [isCheck, setCheck] = useState({
    secureTextEntry: true
  })
  const [isCheck1, setCheck1] = useState({
    secureTextEntry: true
  })
  const onCheck = () => {
    setCheck({
      secureTextEntry: !isCheck.secureTextEntry
    })
  }
  const onCheck1 = () => {
    setCheck1({
      secureTextEntry: !isCheck1.secureTextEntry
    })
  }
  const handleStudentNameChange = useCallback(
    (value: string) => {
      setStudent({ ...student, name: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentNameEmpty')
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t('RegisterStudentComponent.errorStudentNameNotSpecial'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            textError: t('RegisterStudentComponent.errorStudentNameNotLengthMax'),
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleStudentCodeChange = useCallback(
    (value: string) => {
      const stCode = new RegExp(/^[0-9]{5}[a-zA-Z]{2}[0-9]{4}$/)
      setStudent({ ...student, studentCode: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeEmpty')
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeNotSpecial')
          }
        })
      } else if (!stCode.test(value)) {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorStudentCodeNotFormat')
          }
        })
      } else {
        setValidate({
          ...validate,
          studentCode: {
            ...validate.studentCode,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handlePhoneChange = useCallback(
    (value: string) => {
      setStudent({ ...student, phone: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterStudentComponent.errorPhoneEmpty'),
            isVisible: true
          }
        })
      } else if (!isPhone(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterStudentComponent.errorPhoneNotFormat'),
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )

  const handleCheckEmail = useCallback(() => {
    axios
      .post(SERVER_ADDRESS + `api/users/check?email=${student.email}`)
      .then((response) => {
        if (response.data.data == 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: t('RegisterStudentComponent.errorSameEmail'),
              isVisible: true
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student.email])
  const handleEmailChange = useCallback(
    (value: string) => {
      setStudent({ ...student, email: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailEmpty')
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailNotLengthMax')
          }
        })
      } else if (!isEmail(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorEmailNotFormat')
          }
        })
      } else {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handlePasswordChange = useCallback(
    (value: string) => {
      setStudent({ ...student, password: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPasswordEmpty')
          }
        })
      } else if (!isLengthInRange(value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPassNotLengthMax')
          }
        })
      } else if (!isPassword(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorPassNotFormat')
          }
        })
      } else {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setStudent({ ...student, confimPassword: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorConfimPasswordEmpty')
          }
        })
      } else if (value != student.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorConfimPassNotMatch')
          }
        })
      } else {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isVisible: false,
            isError: false
          }
        })
      }
    },
    [validate]
  )
  const handleMajorNameChange = useCallback(
    (value: number) => {
      setStudent({ ...student, majorId: value })
      if (value == null) {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: true,
            isVisible: true,
            textError: t('RegisterStudentComponent.errorMajorEmpty')
          }
        })
      } else {
        setValidate({
          ...validate,
          major: {
            ...validate.major,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleFacultyNameChange = useCallback(
    (value: any) => {
      setStudent({ ...student, facultyId: value.id })
      setDataNganhRequest(value.majors)
      if (value == null) {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isVisible: true,
            isError: true,
            textError: t('RegisterStudentComponent.errorFaculityEmpty')
          }
        })
      } else {
        setValidate({
          ...validate,
          facultyName: {
            ...validate.facultyName,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + 'api/faculty')
      .then((response) => {
        setDataRequest(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [student])

  const onSubmit = useCallback(() => {
    if (isAllFieldsValid(validate)) {
      setIsLoading(true)
      if (imagePicker) {
        handleUploadImage(imagePicker, (data) => {
          saveStudent({
            ...student,
            image: data[0]
          })
        })
      } else {
        saveStudent(student)
      }
    } else {
      let key: keyof RegisterStudent

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }

      setValidate({ ...validate })
    }
  }, [validate, imagePicker])

  useEffect(() => {
    if (saveStudentResponse.data) {
      setIsLoading(false)
      navigation.navigate(ACCEPT_SCREEN, {
        email: student.email,
        subject: t('AuthenticateRegistraion.textSubjectAuthenRegistration'),
        title: t('AuthenticateRegistraion.titleSubjectAuthenRegistration'),
        url: 'api/users/get/email/authen/register'
      })
    }
  }, [saveStudentResponse])
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity style={{ left: -100 }} onPress={() => navigation.goBack()}>
            <Icon name='chevron-left' size={20} color={'#ffff'} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtHeader}>{t('RegisterStudentComponent.titleRegisterStudent')}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <TextInputWithTitle
            defaultValue={student.name}
            title={t('RegisterStudentComponent.titleStudentName')}
            placeholder={t('RegisterStudentComponent.placeholderStudentName')}
            onChangeText={(value) => handleStudentNameChange(value)}
            textInputStyle={!validate.name?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.name?.textError}
            isError={validate.name?.isError}
            isVisible={validate.name?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={student.studentCode}
            title={t('RegisterStudentComponent.titleStudentCode')}
            placeholder={t('RegisterStudentComponent.placeholderStudentCode')}
            onChangeText={(value) => handleStudentCodeChange(value)}
            textInputStyle={!validate.studentCode?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.studentCode?.textError}
            isError={validate.studentCode?.isError}
            isVisible={validate.studentCode?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={student.phone}
            title={t('RegisterStudentComponent.titlePhone')}
            placeholder={t('RegisterStudentComponent.placeholderPhone')}
            onChangeText={(value) => handlePhoneChange(value)}
            textInputStyle={!validate.phone?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.phone?.textError}
            isError={validate.phone?.isError}
            isVisible={validate.phone?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={student.email}
            title={t('RegisterStudentComponent.titleEmail')}
            placeholder={t('RegisterStudentComponent.placeholderEmail')}
            onChangeText={(value) => handleEmailChange(value)}
            onBlur={() => handleCheckEmail()}
            textInputStyle={!validate.email?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.email?.textError}
            isError={validate.email?.isError}
            isVisible={validate.email?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>{t('RegisterStudentComponent.titleFaculity')}</Text>
            <Dropdown
              style={[styles.dropdown, { borderColor: !validate.facultyName?.isError ? '#228b22' : '#97A1B0' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataRequest}
              search
              labelField='name'
              valueField='id'
              placeholder={value}
              searchPlaceholder={t('RegisterStudentComponent.placeholderSearch')}
              value={value}
              onChange={(item) => {
                setValue(item.name)
                handleFacultyNameChange(item)
              }}
            />
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.facultyName?.textError}
            isError={validate.facultyName?.isError}
            isVisible={validate.facultyName?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>{t('RegisterStudentComponent.titleMajor')}</Text>
            <Dropdown
              placeholder={item}
              style={[styles.dropdown, { borderColor: !validate.major?.isError ? '#228b22' : '#97A1B0' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataNganhRequest}
              search
              labelField='name'
              valueField='id'
              searchPlaceholder={t('RegisterStudentComponent.placeholderSearch')}
              value={item}
              onChange={(item) => {
                setItem(item.name)
                handleMajorNameChange(item.id)
              }}
            />
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.major?.textError}
            isError={validate.major?.isError}
            isVisible={validate.major?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>{t('RegisterStudentComponent.titlePass')}</Text>
            <TextInput
              value={student.password}
              placeholder={t('RegisterStudentComponent.placeholderPass')}
              style={[styles.ip, { borderColor: !validate.password?.isError ? '#228b22' : '#97A1B0' }]}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
              onChangeText={(value) => handlePasswordChange(value)}
            ></TextInput>
            <TouchableOpacity style={styles.icon} onPress={() => onCheck()}>
              <Icon name={!isCheck.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.password?.textError}
            isError={validate.password?.isError}
            isVisible={validate.password?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>{t('RegisterStudentComponent.titleConfimPass')}</Text>
            <TextInput
              value={student.confimPassword}
              placeholder={t('RegisterStudentComponent.placeholderConfimPass')}
              style={[styles.ip, { borderColor: !validate.confimPassword?.isError ? '#228b22' : '#97A1B0' }]}
              secureTextEntry={isCheck1.secureTextEntry ? true : false}
              onChangeText={(value) => handleConfirmPasswordChange(value)}
            />

            <TouchableOpacity style={styles.icon} onPress={() => onCheck1()}>
              <Icon name={!isCheck1.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.confimPassword?.textError}
            isError={validate.confimPassword?.isError}
            isVisible={validate.confimPassword?.isVisible}
          />

          <View style={styles.group}>
            <View style={styles.logo}>
              <Text style={styles.txt}>{t('RegisterStudentComponent.avata')}</Text>
              <TouchableOpacity style={styles.btnImg} onPress={() => imagePickerOption?.show()}>
                <Icon name='camera-retro' size={20}></Icon>
                <ImagePicker
                  optionsRef={(ref) => setImagePickerOption(ref)}
                  onResult={(result) => {
                    console.log(result)
                    setImagePicker(result)
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              {imagePicker && imagePicker.length > 0 && (
                <Image
                  style={styles.img}
                  source={{ uri: imagePicker && imagePicker.length > 0 ? imagePicker[0].uri : '' }}
                />
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnRegister} onPress={() => onSubmit()}>
          <Text style={styles.txtRegister}>{t('RegisterStudentComponent.titleRegister')}</Text>
          <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
        </TouchableOpacity>
        <View style={styles.login}>
          <Text>{t('RegisterStudentComponent.requestLogin')} </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN)
            }}
          >
            <Text style={{ color: COLOR_BTN_BLUE, fontWeight: 'bold' }}>
              {t('RegisterStudentComponent.titleLogin')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerModal: {
    borderBottomWidth: 0.7
  },
  txtModal: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
    paddingLeft: 15
  },
  container: {
    backgroundColor: 'white',
    padding: 14
  },
  header: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  txtHeader: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  form: { marginTop: 10 },
  group: {
    marginTop: 20,
    marginHorizontal: 10
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16
  },
  ip: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#97A1B0',
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  },

  btnRegister: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  txtRegister: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },

  dropdown: {
    height: 50,
    borderColor: '#97A1B0',
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  },

  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000'
  },
  icon: {
    fontSize: 20,
    position: 'absolute',
    padding: 50,
    right: -20
  },
  icon1: {
    fontSize: 20
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 10
  },
  btnImg: {
    marginRight: 30
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  textInput: {
    borderColor: '#228b22',
    borderWidth: 2
  },
  btnBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btnItem: {
    padding: 5,
    backgroundColor: '#1e90ff',
    borderRadius: 10
  },
  txtBottom: {
    color: COLOR_WHITE,
    fontWeight: 'bold',
    fontSize: 18
  }
})
