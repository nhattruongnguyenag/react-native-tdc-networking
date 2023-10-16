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
import React, { useCallback, useEffect, useState } from 'react'
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
  isType
} from '../utils/ValidateUtils'
import TextValidate from '../components/TextValidate'

export interface TextFieldValidate {
  textError: string
  textSuccess: string
  isError: boolean
  isVisible: boolean
}
// man hinh dang ky danh cho doanh ngiep
export default function BusinessRegistrationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [business, setBusiness] = useState<
    Omit<Business, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'roleCodes' | 'isTyping' | 'isMessageConnect'>
  >({
    password: '',
    representor: '',
    phone: '',
    taxCode: '',
    code: Date.now().toString(),
    address: '',
    activeTime: '',
    email: '',
    name: '',
    image: '',
    confimPassword: ''
  })
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { userLogin, imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [nameValidate, setNameValidate] = useState<InputTextValidate>({
    textError: 'Tên không được để trống',
    isVisible: false,
    isError: true
  })
  const [representorValidate, setRepresentorValidate] = useState<InputTextValidate>({
    textError: 'Tên người đại diện không được để trống',
    isVisible: false,
    isError: true
  })
  const [emailValidate, setEmailValidate] = useState<InputTextValidate>({
    textError: 'Email không được để trống',
    isVisible: false,
    isError: true
  })
  const [taxCodeValidate, setTaxCodeValidate] = useState<InputTextValidate>({
    textError: 'Mã số thuế không được để trống',
    isVisible: false,
    isError: true
  })
  const [addressValidate, setAddressValidate] = useState<InputTextValidate>({
    textError: 'Địa chỉ không được để trống',
    isVisible: false,
    isError: true
  })
  const [phoneValidate, setPhoneValidate] = useState<InputTextValidate>({
    textError: 'Số điện thoại không được để trống',
    isVisible: false,
    isError: true
  })
  const [activeTimeValidate, setActiveTimeValidate] = useState<InputTextValidate>({
    textError: 'Thời gian hoạt động không được để trống',
    isVisible: false,
    isError: true
  })
  const [passwordValidate, setPasswordValidate] = useState<InputTextValidate>({
    textError: 'Mật khẩu không được để trống',
    isVisible: false,
    isError: true
  })
  const [confirmPasswordValidate, setConfirmPasswordValidate] = useState<InputTextValidate>({
    textError: 'Nhập lại mật khẩu không được để trống',
    isVisible: false,
    isError: true
  })

  const handleNameChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, name: value })
      if (isBlank(value)) {
        setNameValidate({
          ...nameValidate,
          isError: true,
          textError: 'Tên công ty không được để trống'
        })
      } else if (isContainSpecialCharacter(value)) {
        setNameValidate({
          ...nameValidate,
          isError: true,
          textError: 'Tên công ty không được chứa ký tự đặc biệt'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setNameValidate({
          ...nameValidate,
          isError: true,
          textError: 'Tên công ty không vượt quá 255 ký tự'
        })
      } else {
        setNameValidate({
          ...nameValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.name, nameValidate]
  )
  const handleRepresentoreChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, representor: value })
      if (isBlank(value)) {
        setRepresentorValidate({
          ...representorValidate,
          isError: true,
          textError: 'Tên người đại diện không được để trống'
        })
      } else if (isContainSpecialCharacter(value)) {
        setRepresentorValidate({
          ...representorValidate,
          isError: true,
          textError: 'Tên người đại diện không được chứa ký tự đặc biệt'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setRepresentorValidate({
          ...representorValidate,
          isError: true,
          textError: 'Tên người đại diện không vượt quá 255 ký tự'
        })
      } else {
        setRepresentorValidate({
          ...representorValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.representor, representorValidate]
  )
  const handleEmailChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, email: value })
      if (isBlank(value)) {
        setEmailValidate({
          ...emailValidate,
          isError: true,
          textError: 'Email không được để trống'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setEmailValidate({
          ...emailValidate,
          isError: true,
          textError: 'Email không vượt quá 255 ký tự'
        })
      } else if (!isEmail(value)) {
        setEmailValidate({
          ...emailValidate,
          isError: true,
          textError: 'Email sai định dạng'
        })
      } else {
        setEmailValidate({
          ...emailValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.email, emailValidate]
  )
  const handlePasswordChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, password: value })
      if (isBlank(value)) {
        setPasswordValidate({
          ...passwordValidate,
          isError: true,
          textError: 'Mật khẩu không được để trống'
        })
      } else if (!isLengthInRange(value, 1, 8)) {
        setPasswordValidate({
          ...passwordValidate,
          isError: true,
          textError: 'Mật khẩu không vượt quá 8 ký tự'
        })
      } else if (!isPassword(value)) {
        setPasswordValidate({
          ...passwordValidate,
          isError: true,
          textError: 'Mật khẩu sai định dạng'
        })
      } else {
        setPasswordValidate({
          ...passwordValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.password, passwordValidate]
  )
  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, confimPassword: value })
      if (isBlank(value)) {
        setConfirmPasswordValidate({
          ...confirmPasswordValidate,
          isError: true,
          textError: 'Trường nhập lại mật khẩu không được để trống'
        })
      } else if (business.confimPassword == business.password) {
        setConfirmPasswordValidate({
          ...confirmPasswordValidate,
          isError: true,
          textError: 'Trường nhập lại mật khẩu phải trùng với mật khẩu'
        })
      } else {
        setConfirmPasswordValidate({
          ...confirmPasswordValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.confimPassword, confirmPasswordValidate]
  )
  const handleTaxCodeChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, taxCode: value })
      if (isBlank(value)) {
        setTaxCodeValidate({
          ...taxCodeValidate,
          isError: true,
          textError: 'Mã số thuế không được để trống'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setTaxCodeValidate({
          ...taxCodeValidate,
          isError: true,
          textError: 'Mã số thuế không vượt quá 255 ký tự'
        })
      } else if (!isType(value)) {
        setTaxCodeValidate({
          ...taxCodeValidate,
          isError: true,
          textError: 'Mã số thuế sai định dạng'
        })
      } else {
        setTaxCodeValidate({
          ...taxCodeValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.taxCode, taxCodeValidate]
  )
  const handleAddressChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, address: value })
      if (isBlank(value)) {
        setAddressValidate({
          ...addressValidate,
          isError: true,
          textError: 'Địa chỉ không được để trống'
        })
      } else if (!isLengthInRange(value, 1, 255)) {
        setAddressValidate({
          ...addressValidate,
          isError: true,
          textError: 'Địa chỉ không vượt quá 255 ký tự'
        })
      } else {
        setAddressValidate({
          ...addressValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.address, addressValidate]
  )
  const handlePhoneChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, phone: value })
      if (isBlank(value)) {
        setPhoneValidate({
          ...phoneValidate,
          isError: true,
          textError: 'Số điện thoại không được để trống'
        })
      } else if (!isPhone(value)) {
        setPhoneValidate({
          ...phoneValidate,
          isError: true,
          textError: 'Số điện thoại sai định dạng'
        })
      } else {
        setPhoneValidate({
          ...phoneValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.phone, phoneValidate]
  )
  const handleActiveTimeChange = useCallback(
    (value: string) => {
      setBusiness({ ...business, activeTime: value })
      if (isBlank(value)) {
        setActiveTimeValidate({
          ...activeTimeValidate,
          isError: true,
          textError: 'Thời gian hoạt động không được để trống'
        })
      } else if (!isType(value)) {
        setActiveTimeValidate({
          ...activeTimeValidate,
          isError: true,
          textError: 'Thời gian hoạt động sai định dạng'
        })
      } else {
        setActiveTimeValidate({
          ...activeTimeValidate,
          isError: false,
          isVisible: false
        })
      }
    },
    [business.activeTime, activeTimeValidate]
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
    setBusiness({ ...business, image: imagesUpload ? imagesUpload[0] : '' })
  }, [imagesUpload])

  const onSubmit = useCallback(() => {
    if (
      !nameValidate.isError &&
      !emailValidate.isError &&
      !representorValidate.isError &&
      !passwordValidate.isError &&
      !confirmPasswordValidate.isError &&
      !taxCodeValidate.isError &&
      !addressValidate.isError &&
      !phoneValidate.isError &&
      !activeTimeValidate.isError
    ) {
      setIsLoading(true)
      axios
        .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business/register', business)
        .then((response) => {
          Alert.alert('Đăng ký thành công', 'Thành công')
          setIsLoading(false)
        })
        .catch((error) => {
          Alert.alert('Đăng ký thất bại', 'Thông tin không hợp lệ')
          setIsLoading(false)
        })
    } else if (nameValidate.isError) {
      setNameValidate({ ...nameValidate, isVisible: true })
    } else if (emailValidate.isError) {
      setEmailValidate({ ...emailValidate, isVisible: true })
    } else if (representorValidate.isError) {
      setRepresentorValidate({ ...representorValidate, isVisible: true })
    } else if (taxCodeValidate.isError) {
      setTaxCodeValidate({ ...taxCodeValidate, isVisible: true })
    } else if (addressValidate.isError) {
      setAddressValidate({ ...addressValidate, isVisible: true })
    } else if (phoneValidate.isError) {
      setPhoneValidate({ ...phoneValidate, isVisible: true })
    } else if (activeTimeValidate.isError) {
      setActiveTimeValidate({ ...activeTimeValidate, isVisible: true })
    } else if (passwordValidate.isError) {
      setPasswordValidate({ ...passwordValidate, isVisible: true })
    } else if (confirmPasswordValidate.isError) {
      setConfirmPasswordValidate({ ...confirmPasswordValidate, isVisible: true })
    }
  }, [business])

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>Đăng ký doanh nghiệp</Text>
        </View>
        <View>
          <TextInputWithTitle
            title='Tên doanh nghiệp'
            placeholder='Nhập tên doanh nghiệp...'
            onFocus={() => setNameValidate({ ...nameValidate, isVisible: true })}
            onChangeText={(value) => handleNameChange(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={nameValidate.textError}
            isError={nameValidate.isError}
            isVisible={nameValidate.isVisible}
          />
          <TextInputWithTitle
            title='Email'
            placeholder='Nhập email...'
            onFocus={() => setEmailValidate({ ...emailValidate, isVisible: true })}
            onChangeText={(value) => handleEmailChange(value)}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={emailValidate.textError}
            isError={emailValidate.isError}
            isVisible={emailValidate.isVisible}
          />

          <TextInputWithTitle
            title='Họ tên người đại diện'
            placeholder='Nhập họ tên người đại diện...'
            onFocus={() => setRepresentorValidate({ ...representorValidate, isVisible: true })}
            onChangeText={(value) => handleRepresentoreChange(value)}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={representorValidate.textError}
            isError={representorValidate.isError}
            isVisible={representorValidate.isVisible}
          />

          <TextInputWithTitle
            title='Mã số thuế'
            placeholder='Nhập mã số thuế...'
            onFocus={() => setTaxCodeValidate({ ...taxCodeValidate, isVisible: true })}
            onChangeText={(value) => handleTaxCodeChange(value)}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={taxCodeValidate.textError}
            isError={taxCodeValidate.isError}
            isVisible={taxCodeValidate.isVisible}
          />

          <TextInputWithTitle
            title='Địa chỉ'
            placeholder='Nhập địa chỉ...'
            onFocus={() => setAddressValidate({ ...addressValidate, isVisible: true })}
            onChangeText={(value) => handleAddressChange(value)}
          />
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={addressValidate.textError}
            isError={addressValidate.isError}
            isVisible={addressValidate.isVisible}
          />

          <TextInputWithTitle
            title='Điện thoại'
            placeholder='Nhập số điện thoại...'
            onFocus={() => setPhoneValidate({ ...phoneValidate, isVisible: true })}
            onChangeText={(value) => handlePhoneChange(value)}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={phoneValidate.textError}
            isError={phoneValidate.isError}
            isVisible={phoneValidate.isVisible}
          />

          <TextInputWithTitle
            title='Thời gian hoạt động'
            placeholder='Nhập thời gian hoạt động...'
            onFocus={() => setActiveTimeValidate({ ...activeTimeValidate, isVisible: true })}
            onChangeText={(value) => handleActiveTimeChange(value)}
          />

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={activeTimeValidate.textError}
            isError={activeTimeValidate.isError}
            isVisible={activeTimeValidate.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Mật khẩu đăng ký</Text>
            <TextInput
              placeholder='Nhập mật khẩu đăng ký...'
              style={styles.ip}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
              onFocus={() => setPasswordValidate({ ...passwordValidate, isVisible: true })}
              onChangeText={(value) => handlePasswordChange(value)}
            />
            <TouchableOpacity style={styles.icon} onPress={() => onCheck()}>
              <Icon name={!isCheck.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={passwordValidate.textError}
            isError={passwordValidate.isError}
            isVisible={passwordValidate.isVisible}
          />

          <View style={styles.group}>
            <Text style={styles.txt}>Nhập lại mật khẩu</Text>
            <TextInput
              placeholder='Nhập lại mật khẩu...'
              style={styles.ip}
              secureTextEntry={isCheck1.secureTextEntry ? true : false}
              onFocus={() => setConfirmPasswordValidate({ ...confirmPasswordValidate, isVisible: true })}
              onChangeText={(value) => handleConfirmPasswordChange(value)}
            />

            <TouchableOpacity style={styles.icon} onPress={() => onCheck1()}>
              <Icon name={!isCheck1.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={confirmPasswordValidate.textError}
            isError={confirmPasswordValidate.isError}
            isVisible={confirmPasswordValidate.isVisible}
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
  header: { backgroundColor: COLOR_BTN_BLUE, alignItems: 'center' },
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
    borderWidth: 1,
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
  }
})
