import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { COLOR_BTN_BLUE } from '../constants/Color'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler'
import { useTranslation } from 'react-multi-lang'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ACCEPT_SCREEN, LOGIN_SCREEN } from '../constants/Screen'
import { InputTextValidate, isBlank, isPassword } from '../utils/ValidateUtils'
import TextValidate from '../components/common/TextValidate'
import { useAppSelector } from '../redux/Hook'

interface ChangePassword {
  password: InputTextValidate
  newPassword: InputTextValidate
  reNewPassword: InputTextValidate
}

interface Data {
  password: string
  newPassword: string
  reNewPassword: string
}

export default function ChangePasswordScreen() {
  const t = useTranslation()
  const [checkData, setCheckData] = useState<any>(true)
  const [data, setData] = useState<Data>({
    password: '',
    newPassword: '',
    reNewPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [validate, setValidate] = useState<ChangePassword>({
    password: {
      textError: 'Mật khẩu không được để trống',
      isVisible: false,
      isError: true
    },
    newPassword: {
      textError: 'Mật khẩu mới không được để trống',
      isVisible: false,
      isError: true
    },
    reNewPassword: {
      textError: 'Mật khâur mới lần hai không được để trống',
      isVisible: false,
      isError: true
    }
  })

  const handlePasswordChange = (value: string) => {
    setData({ ...data, password: value })
    if (isBlank(value)) {
      setValidate({
        ...validate,
        password: {
          ...validate.password,
          isError: true,
          textError: 'Mật khẩu cũ không được để trống',
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
  }

  const handleNewPasswordChange = (value: string) => {
    setData({ ...data, newPassword: value })
    if (isBlank(value)) {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: true,
          textError: 'Mật khẩu mới không được để trống',
          isVisible: true
        }
      })
    } else if (!isPassword(value)) {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: true,
          textError: 'Mật khẩu mới không đúng định dạng',
          isVisible: true
        }
      })
    } else if (value == data.password) {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: true,
          textError: 'Mật khẩu mới không được trùng với mật khẩu cũ',
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        newPassword: {
          ...validate.newPassword,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  const handleReNewPasswordChange = (value: string) => {
    setData({ ...data, reNewPassword: value })
    if (isBlank(value)) {
      setValidate({
        ...validate,
        reNewPassword: {
          ...validate.reNewPassword,
          isError: true,
          textError: t('RegisterBusinessComponent.errorPasswordEmpty'),
          isVisible: true
        }
      })
    } else if (value != data.newPassword) {
      setValidate({
        ...validate,
        reNewPassword: {
          ...validate.reNewPassword,
          isError: true,
          textError: 'Mật khẩu nhập lại không trùng khớp',
          isVisible: true
        }
      })
    } else {
      setValidate({
        ...validate,
        reNewPassword: {
          ...validate.reNewPassword,
          isError: false,
          isVisible: false
        }
      })
    }
  }

  useEffect(() => {
    if (
      validate.password.isError == false &&
      validate.newPassword.isError == false &&
      validate.reNewPassword.isError == false
    ) {
      setCheckData(true)
    } else {
      setCheckData(false)
    }
    console.log(checkData);
  }, [validate.password.isError, validate.newPassword.isError, validate.reNewPassword.isError])

  const onSubmit = () => {
    setIsLoading(true)
    axios
      .post(SERVER_ADDRESS + 'api/users/change/password', {
        userId: userLogin?.id,
        password: data.newPassword,
        oldPassword: data.password
      })
      .then((response) => {
        setIsLoading(false)
        console.log(response.data)
      })
      .catch((error) => {
        Alert.alert('Xác nhận thất bại', 'Email này chưa được đăng ký')
        setIsLoading(false)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.form}>
          <View style={styles.group}>
            <Icon style={styles.icon} name='key' />
            <TextInput
              value={data.password}
              placeholder='Pasword'
              style={styles.txtIP}
              onChangeText={(value) => handlePasswordChange(value)}
            ></TextInput>
          </View>
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.password?.textError}
            isError={validate.password?.isError}
            isVisible={validate.password?.isVisible}
          />

          <View style={styles.group}>
            <Icon style={styles.icon} name='retweet' />
            <TextInput
              value={data.newPassword}
              placeholder='New password'
              style={styles.txtIP}
              onChangeText={(value) => handleNewPasswordChange(value)}
            ></TextInput>
          </View>
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.newPassword?.textError}
            isError={validate.newPassword?.isError}
            isVisible={validate.newPassword?.isVisible}
          />

          <View style={styles.group}>
            <Icon style={styles.icon} name='redo' />
            <TextInput
              value={data.reNewPassword}
              placeholder='Re-New Password'
              style={styles.txtIP}
              onChangeText={(value) => handleReNewPasswordChange(value)}
            ></TextInput>
          </View>
          <TextValidate
            customStyle={{ marginLeft: 10 }}
            textError={validate.reNewPassword?.textError}
            isError={validate.reNewPassword?.isError}
            isVisible={validate.reNewPassword?.isVisible}
          />
        </View>
        {checkData == true ? (
          <TouchableOpacity
            style={[styles.btnLogin, { opacity: 1}]}
            onPress={() => onSubmit()}
          >
            <Text style={styles.txtB}>{t('ForgettenPassword.textAccept')}</Text>
            <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={true}
            style={[styles.btnLogin, { opacity: 0.5 }]}
            onPress={() => onSubmit()}
          >
            <Text style={styles.txtB}>{t('ForgettenPassword.textAccept')}</Text>
            <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  imageLogin: {
    width: 370,
    height: 280,
    marginBottom: 15
  },
  txtBottom: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 30
  },
  txtClick: {
    color: COLOR_BTN_BLUE,
    fontSize: 20
  },
  txtClick_Tap: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },
  txtLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 15
  },
  form: {},
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#97A1B0',
    justifyContent: 'space-between',
    marginVertical: 5
  },

  txtIP: {
    fontSize: 18,
    paddingLeft: 30
  },
  icon: {
    fontSize: 20,
    position: 'absolute',
    top: 14
  },
  iconBack: {
    fontSize: 20,
    color: COLOR_BTN_BLUE
  },
  iconBack_Tap: {
    fontSize: 20,
    color: '#000'
  },
  txtFogot: {
    color: COLOR_BTN_BLUE,
    fontSize: 15
  },
  btnLogin: {
    marginTop: 30,
    fontSize: 30,
    backgroundColor: COLOR_BTN_BLUE,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnBack: {
    width: 30,
    height: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 100
  },
  txtB: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 10
  },
  txt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25
  }
})
