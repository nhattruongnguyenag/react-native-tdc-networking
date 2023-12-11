import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import DatePicker from 'react-native-date-picker'
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TextValidate from '../components/common/TextValidate'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { COLOR_BTN_BLUE, COLOR_WHITE } from '../constants/Color'
import { ACCEPT_SCREEN, LOGIN_SCREEN } from '../constants/Screen'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppSelector } from '../redux/Hook'
import { Business } from '../types/Business'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import {
  InputTextValidate,
  isBlank,
  isContainSpecialCharacter,
  isEmail,
  isLengthInRange,
  isPassword,
  isPhone,
  isTime,
  isType
} from '../utils/ValidateUtils'
import ImagePicker from '../components/ImagePicker'
import { Asset } from 'react-native-image-picker'
import { handleUploadImage } from '../utils/ImageHelper'
import { err } from 'react-native-svg/lib/typescript/xml'

interface RegisterBusiness {
  name: InputTextValidate
  email: InputTextValidate
  representor: InputTextValidate
  taxCode: InputTextValidate
  phone: InputTextValidate
  address: InputTextValidate
  activeTime: InputTextValidate
  password: InputTextValidate
  confimPassword: InputTextValidate
}

const isAllFieldsValid = (validate: RegisterBusiness): boolean => {
  let key: keyof RegisterBusiness

  for (key in validate) {
    if (validate[key].isError) {
      return false
    }
  }

  return true
}
// man hinh dang ky danh cho doanh ngiep
export default function BusinessRegistrationScreen() {
  const t = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [imagePicker, setImagePicker] = useState<Asset[]>()
  const [timeStart, setTimeStart] = useState('07:00')
  const [timeEnd, setTimeEnd] = useState('17:00')
  const [business, setBusiness] = useState<
    Omit<Business, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'roleCodes' | 'isTyping' | 'isMessageConnect'>
  >({
    password: '',
    representor: '',
    phone: '',
    taxCode: '',
    code: Date.now().toString(),
    address: '',
    activeTime: timeStart + '-' + timeEnd,
    email: '',
    name: '',
    image: '',
    confimPassword: '',
    subject: t('AuthenticateRegistraion.textSubjectAuthenRegistration'),
    content: ''
  })
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [validate, setValidate] = useState<RegisterBusiness>({
    name: {
      textError: t('RegisterBusinessComponent.errorNameEmpty'),
      isVisible: false,
      isError: true
    },
    representor: {
      textError: t('RegisterBusinessComponent.errorRepresentEmpty'),
      isVisible: false,
      isError: true
    },
    email: {
      textError: t('RegisterBusinessComponent.errorEmailEmpty'),
      isVisible: false,
      isError: true
    },
    taxCode: {
      textError: t('RegisterBusinessComponent.errorTaxCodeEmpty'),
      isVisible: false,
      isError: true
    },
    address: {
      textError: t('RegisterBusinessComponent.errorAddressEmpty'),
      isVisible: false,
      isError: true
    },
    phone: {
      textError: t('RegisterBusinessComponent.errorPhoneEmpty'),
      isVisible: false,
      isError: true
    },
    activeTime: {
      textError: t('RegisterBusinessComponent.activeTimeNotFormat'),
      isVisible: false,
      isError: true
    },
    password: {
      textError: t('RegisterBusinessComponent.errorPasswordEmpty'),
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: t('RegisterBusinessComponent.errorConfimPasswordEmpty'),
      isVisible: false,
      isError: true
    }
  })
  const [showDatePickerStart, setShowDatePickerStart] = useState<boolean>(false)
  const [showDatePickerEnd, setShowDatePickerEnd] = useState<boolean>(false)
  const timeStartRef = useRef<TextInput | null>(null)
  const timeEndRef = useRef<TextInput | null>(null)
  const handleNameChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, name: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorNameEmpty')
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorNameNotSpecial')
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorNameNotLengthMax')
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
  const handleRepresentoreChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, representor: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            isVisible: true,
            textError: t('RegisterBusinessComponent.errorRepresentEmpty')
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: t('RegisterBusinessComponent.errorRepresentNotSpecial'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: t('RegisterBusinessComponent.errorRepresentNotLengthMax'),
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
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
      .post(SERVER_ADDRESS + `api/users/check?email=${business.email}`)
      .then((response) => {
        if (response.data.data == 0) {
          setValidate({
            ...validate,
            email: {
              ...validate.email,
              isError: true,
              textError: t('RegisterBusinessComponent.errorSameEmail'),
              isVisible: true
            }
          })
        }
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [business.email])

  const handleEmailChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, email: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: t('RegisterBusinessComponent.errorEmailEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: t('RegisterBusinessComponent.errorEmailNotLengthMax'),
            isVisible: true
          }
        })
      } else if (!isEmail(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: t('RegisterBusinessComponent.errorEmailNotFormat'),
            isVisible: true
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
      setBusiness({ ...business, password: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPasswordEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPassNotLengthMax'),
            isVisible: true
          }
        })
      } else if (!isPassword(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPassNotFormat'),
            isVisible: true
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
      setBusiness({ ...business, confimPassword: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isError: true,
            textError: t('RegisterBusinessComponent.errorConfimPasswordEmpty'),
            isVisible: true
          }
        })
      } else if (value != business.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isError: true,
            textError: t('RegisterBusinessComponent.errorConfimPassNotMatch'),
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleTaxCodeChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, taxCode: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeNotLengthMax'),
            isVisible: true
          }
        })
      } else if (!isType(value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: t('RegisterBusinessComponent.errorTaxCodeNotFormat'),
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: false,
            isVisible: false
          }
        })
      }
    },
    [validate]
  )
  const handleAddressChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, address: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: t('RegisterBusinessComponent.errorAddressEmpty'),
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: t('RegisterBusinessComponent.errorAddressNotLengthMax'),
            isVisible: true
          }
        })
      } else {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
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
      setBusiness({ ...business, phone: value })
      if (isBlank(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPhoneEmpty'),
            isVisible: true
          }
        })
      } else if (!isPhone(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: t('RegisterBusinessComponent.errorPhoneNotFormat'),
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

  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    if (!isTime(timeStart, timeEnd)) {
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: true,
          textError: t('RegisterBusinessComponent.activeTimeNotFormat'),
          isVisible: true
        }
      })
    } else {
      setBusiness({ ...business, activeTime: timeStart + '-' + timeEnd })
      setValidate({
        ...validate,
        activeTime: {
          ...validate.activeTime,
          isError: false,
          isVisible: false
        }
      })
    }
  }, [timeStart, timeEnd])

  const onSubmit = useCallback(() => {
    // if (isAllFieldsValid(validate)) {
    //   setIsLoading(true)
    if (imagePicker) {
      handleUploadImage(imagePicker, (data) => {
        setBusiness({
          ...business,
          image: data[0]
        })
        console.log(business)
      })

      return
      axios
        .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business/register', business)
        .then((response) => {
          setIsLoading(false)
          navigation.navigate(ACCEPT_SCREEN, {
            email: business.email,
            subject: t('AuthenticateRegistraion.textSubjectAuthenRegistration'),
            title: t('AuthenticateRegistraion.titleSubjectAuthenRegistration'),
            url: 'api/users/get/email/authen/register'
          })
        })
        .catch((error) => {
          console.log(error)

          setIsLoading(false)
        })
    }
    // } else {
    //   let key: keyof RegisterBusiness
    //   for (key in validate) {
    //     if (validate[key].isError) {
    //       validate[key].isVisible = true
    //     }
    //   }
    //   setValidate({ ...validate })
    // }
  }, [validate, imagePicker])

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity style={{ left: -80 }} onPress={() => navigation.goBack()}>
            <Icon name='chevron-left' size={20} color={'#ffff'} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtHeader}>{t('RegisterBusinessComponent.titleRegisterBusiness')}</Text>
          </View>
        </View>
        <View>
          <TextInputWithTitle
            defaultValue={business.name}
            title={t('RegisterBusinessComponent.titleBusinessName')}
            placeholder={t('RegisterBusinessComponent.placeholderBusinessName')}
            onChangeText={(value) => handleNameChange(value)}
            textInputStyle={!validate.name?.isError ? styles.textInput : styles.ip}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.name?.textError}
            isError={validate.name?.isError}
            isVisible={validate.name?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={business.email}
            title={t('RegisterBusinessComponent.titleEmail')}
            placeholder={t('RegisterBusinessComponent.placeholderEmail')}
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

          <TextInputWithTitle
            defaultValue={business.representor}
            title={t('RegisterBusinessComponent.titleRepresent')}
            placeholder={t('RegisterBusinessComponent.placeholderRepresent')}
            onChangeText={(value) => handleRepresentoreChange(value)}
            textInputStyle={!validate.representor?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.representor?.textError}
            isError={validate.representor?.isError}
            isVisible={validate.representor?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={business.taxCode}
            title={t('RegisterBusinessComponent.titleTaxCode')}
            placeholder={t('RegisterBusinessComponent.placeholderTaxCode')}
            onChangeText={(value) => handleTaxCodeChange(value)}
            textInputStyle={!validate.taxCode?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.taxCode?.textError}
            isError={validate.taxCode?.isError}
            isVisible={validate.taxCode?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={business.address}
            title={t('RegisterBusinessComponent.titleAddress')}
            placeholder={t('RegisterBusinessComponent.placeholderAddress')}
            onChangeText={(value) => handleAddressChange(value)}
            textInputStyle={!validate.address?.isError ? styles.textInput : styles.ip}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.address?.textError}
            isError={validate.address?.isError}
            isVisible={validate.address?.isVisible}
          />

          <TextInputWithTitle
            defaultValue={business.phone}
            title={t('RegisterBusinessComponent.titlePhone')}
            placeholder={t('RegisterBusinessComponent.placeholderPhone')}
            onChangeText={(value) => handlePhoneChange(value)}
            textInputStyle={!validate.phone?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.phone?.textError}
            isError={validate.phone?.isError}
            isVisible={validate.phone?.isVisible}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInputWithTitle
              defaultValue={timeStart}
              textInputRef={timeStartRef}
              onFocus={() => {
                setShowDatePickerStart(true)
              }}
              textInputStyle={!validate.activeTime?.isError ? styles.textInput : styles.ip}
              title={t('RegisterBusinessComponent.titleTimeStart')}
              placeholder={moment().format('HH:mm')}
            />
            <Text style={styles.txt}>{t('RegisterBusinessComponent.titleTo')}</Text>
            <DatePicker
              modal
              mode='time'
              locale='vi'
              open={showDatePickerStart}
              date={new Date()}
              onConfirm={(time) => {
                setTimeStart(moment(time).format('HH:mm'))
                timeStartRef.current?.blur()
                setShowDatePickerStart(false)
              }}
              onCancel={() => {
                timeStartRef.current?.blur()
                setShowDatePickerStart(false)
              }}
            />

            <TextInputWithTitle
              defaultValue={timeEnd}
              textInputRef={timeEndRef}
              onFocus={() => {
                setShowDatePickerEnd(true)
              }}
              textInputStyle={!validate.activeTime?.isError ? styles.textInput : styles.ip}
              title={t('RegisterBusinessComponent.titleTimeEnd')}
              placeholder={moment().format('HH:mm')}
            />

            <DatePicker
              modal
              mode='time'
              locale='vi'
              open={showDatePickerEnd}
              date={new Date()}
              onConfirm={(time) => {
                setTimeEnd(moment(time).format('HH:mm'))
                timeEndRef.current?.blur()
                setShowDatePickerEnd(false)
              }}
              onCancel={() => {
                timeEndRef.current?.blur()
                setShowDatePickerEnd(false)
              }}
            />
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.activeTime?.textError}
            isError={validate.activeTime?.isError}
            isVisible={validate.activeTime?.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>{t('RegisterBusinessComponent.titlePass')}</Text>
            <TextInput
              value={business.password}
              placeholder={t('RegisterBusinessComponent.placeholderPass')}
              style={[styles.ip, { borderColor: !validate.password?.isError ? '#228b22' : '#97A1B0' }]}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
              onChangeText={(value) => handlePasswordChange(value)}
            />
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
            <Text style={styles.txt}>{t('RegisterBusinessComponent.titleConfimPass')}</Text>
            <TextInput
              value={business.confimPassword}
              placeholder={t('RegisterBusinessComponent.placeholderConfimPass')}
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
              <Text style={styles.txt}>{t('RegisterBusinessComponent.avata')}</Text>
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
          <Text style={styles.txtRegister}>{t('RegisterBusinessComponent.titleRegister')}</Text>
          <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
        </TouchableOpacity>

        <View style={styles.login}>
          <Text>{t('RegisterBusinessComponent.requestLogin')} </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN)
            }}
          >
            <Text style={{ color: COLOR_BTN_BLUE, fontWeight: 'bold' }}>
              {t('RegisterBusinessComponent.titleLogin')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  },
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
  header: { backgroundColor: COLOR_BTN_BLUE, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  txtHeader: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },

  group: {
    marginTop: 20,
    marginHorizontal: 10
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18
  },
  ip: {
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#97A1B0',
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  },
  btnRegister: {
    backgroundColor: COLOR_BTN_BLUE,
    alignItems: 'center',
    marginTop: 20,
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
  icon: {
    fontSize: 20,
    position: 'absolute',
    padding: 50,
    right: -20
  },
  icon1: {
    fontSize: 20
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 10
  },
  error: {
    color: 'red',
    marginTop: 10,
    marginLeft: 10
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
  }
})
