import {
  Alert,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Business } from '../types/Business'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { ActivityIndicator } from 'react-native-paper'
import { COLOR_BTN_BLUE } from '../constants/Color'
import ActionSheet from 'react-native-actionsheet'
import { useAppSelector } from '../redux/Hook'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LOGIN_SCREEN } from '../constants/Screen'
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
import TextValidate from '../components/common/TextValidate'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'

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
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
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
    confimPassword: ''
  })
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [validate, setValidate] = useState<RegisterBusiness>({
    name: {
      textError: 'Tên không được để trống',
      isVisible: false,
      isError: true
    },
    representor: {
      textError: 'Tên người đại diện không được để trống',
      isVisible: false,
      isError: true
    },
    email: {
      textError: 'Email không được để trống',
      isVisible: false,
      isError: true
    },
    taxCode: {
      textError: 'Mã số thuế không được để trống',
      isVisible: false,
      isError: true
    },
    address: {
      textError: 'Địa chỉ không được để trống',
      isVisible: false,
      isError: true
    },
    phone: {
      textError: 'Số điện thoại không được để trống',
      isVisible: false,
      isError: true
    },
    activeTime: {
      textError: 'Thời gian hoạt động sai định dạng',
      isVisible: false,
      isError: true
    },
    password: {
      textError: 'Mật khẩu không được để trống',
      isVisible: false,
      isError: true
    },
    confimPassword: {
      textError: 'Nhập lại mật khẩu không được để trống',
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
            isVisible: true
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: 'Tên công ty không chứa ký tự đặt biệt'
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          name: {
            ...validate.name,
            isError: true,
            isVisible: true,
            textError: 'Tên công ty không vượt quá 255 ký tự'
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
            textError: 'Tên người đại diện không được để trống'
          }
        })
      } else if (isContainSpecialCharacter(value)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: 'Tên người đại diện không được chứa ký tự đặc biệt',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          representor: {
            ...validate.representor,
            isError: true,
            textError: 'Tên người đại diện không vượt quá 255 ký tự',
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
              textError: 'Email đã được sử dụng',
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
            textError: 'Email không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: 'Email không vượt quá 255 ký tự',
            isVisible: true
          }
        })
      } else if (!isEmail(value)) {
        setValidate({
          ...validate,
          email: {
            ...validate.email,
            isError: true,
            textError: 'Email sai định dạng',
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
            textError: 'Mật khẩu không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 8)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: 'Mật khẩu không vượt quá 8 ký tự',
            isVisible: true
          }
        })
      } else if (!isPassword(value)) {
        setValidate({
          ...validate,
          password: {
            ...validate.password,
            isError: true,
            textError: 'Mật khẩu sai định dạng',
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
            textError: 'Trường nhập lại mật khẩu không được để trống',
            isVisible: true
          }
        })
      } else if (value != business.password) {
        setValidate({
          ...validate,
          confimPassword: {
            ...validate.confimPassword,
            isError: true,
            textError: 'Trường nhập lại mật khẩu phải trùng với mật khẩu',
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
            textError: 'Mã số thuế không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: 'Mã số thuế không vượt quá 255 ký tự',
            isVisible: true
          }
        })
      } else if (!isType(value)) {
        setValidate({
          ...validate,
          taxCode: {
            ...validate.taxCode,
            isError: true,
            textError: 'Mã số thuế sai định dạng',
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
            textError: 'Địa chỉ không được để trống',
            isVisible: true
          }
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setValidate({
          ...validate,
          address: {
            ...validate.address,
            isError: true,
            textError: 'Địa chỉ không vượt quá 255 ký tự',
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
            textError: 'Số điện thoại không được để trống',
            isVisible: true
          }
        })
      } else if (!isPhone(value)) {
        setValidate({
          ...validate,
          phone: {
            ...validate.phone,
            isError: true,
            textError: 'Số điện thoại sai định dạng',
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
          textError: 'Thời gian hoạt động sai định dạng',
          isVisible: true
        }
      })
    } else {
      setBusiness({ ...business, activeTime: timeStart + '-' + timeEnd})
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
 
  useEffect(() => {
    setBusiness({ ...business, image: imagesUpload ? imagesUpload[0] : '' })
  }, [imagesUpload])

  const onSubmit = useCallback(() => {
    console.log(business.activeTime)
    if (isAllFieldsValid(validate)) {
      setIsLoading(true)
      axios
        .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business/register', business)
        .then((response) => {
          setIsLoading(false)
          Alert.alert('Thông báo', 'Đăng ký thành công')
          navigation.navigate(LOGIN_SCREEN)
        })
        .catch((error) => {
          Alert.alert('Đăng ký thất bại', 'Thông tin không hợp lệ')
          setIsLoading(false)
        })
    } else {
      let key: keyof RegisterBusiness

      for (key in validate) {
        if (validate[key].isError) {
          validate[key].isVisible = true
        }
      }
      setValidate({ ...validate })
    }
  }, [validate])

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity style={{ left: -80 }} onPress={() => navigation.goBack()}>
            <Icon name='chevron-left' size={20} color={'#ffff'} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.txtHeader}>Đăng ký doanh nghiệp</Text>
          </View>
        </View>
        <View>
          <TextInputWithTitle
            value={business.name}
            title='Tên doanh nghiệp'
            placeholder='Nhập tên doanh nghiệp...'
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
            value={business.email}
            title='Email'
            placeholder='Nhập email...'
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
            value={business.representor}
            title='Họ tên người đại diện'
            placeholder='Nhập họ tên người đại diện...'
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
            value={business.taxCode}
            title='Mã số thuế'
            placeholder='Nhập mã số thuế...'
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
            value={business.address}
            title='Địa chỉ'
            placeholder='Nhập địa chỉ...'
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
            value={business.phone}
            title='Điện thoại'
            placeholder='Nhập số điện thoại...'
            onChangeText={(value) => handlePhoneChange(value)}
            textInputStyle={!validate.phone?.isError ? styles.textInput : styles.ip}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.phone?.textError}
            isError={validate.phone?.isError}
            isVisible={validate.phone?.isVisible}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <TextInputWithTitle
              value={timeStart}
              textInputRef={timeStartRef}
              onFocus={() => {
                setShowDatePickerStart(true)
              }}
              textInputStyle={!validate.activeTime?.isError ? styles.textInput : styles.ip}
              title='Thời gian bắt đầu'
              placeholder={moment().format('HH:mm')}
            />
            <Text style={styles.txt}>đến</Text>
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
              value={timeEnd}
              textInputRef={timeEndRef}
              onFocus={() => {
                setShowDatePickerEnd(true)
              }}
              textInputStyle={!validate.activeTime?.isError ? styles.textInput : styles.ip}
              title='Thời gian kết thúc'
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
            <Text style={styles.txt}>Mật khẩu đăng ký</Text>
            <TextInput
              value={business.password}
              placeholder='Nhập mật khẩu đăng ký...'
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
            <Text style={styles.txt}>Nhập lại mật khẩu</Text>
            <TextInput
              value={business.confimPassword}
              placeholder='Nhập lại mật khẩu...'
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
              <Text style={styles.txt}>Ảnh đại diện</Text>
              <TouchableOpacity style={styles.btnImg} onPress={() => imagePickerOption?.show()}>
                <Icon name='camera-retro' size={20}></Icon>
                <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              {imagesUpload ? (
                <Image style={styles.img} source={{ uri: SERVER_ADDRESS + `api/images/${imagesUpload}` }} />
              ) : (
                ''
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnRegister} onPress={() => onSubmit()}>
          <Text style={styles.txtRegister}>Đăng ký tài khoản</Text>
          <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
        </TouchableOpacity>

        <View style={styles.login}>
          <Text>Đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN)
            }}
          >
            <Text style={{ color: COLOR_BTN_BLUE, fontWeight: 'bold' }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
