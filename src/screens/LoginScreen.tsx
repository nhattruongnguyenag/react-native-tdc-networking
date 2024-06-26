import AsyncStorage from '@react-native-async-storage/async-storage'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios, { AxiosResponse } from 'axios'
import React, { useMemo, useState } from 'react'
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
import CheckBox from 'react-native-check-box'
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BTN_BLUE } from '../constants/Color'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue'
import { setIsLogout, setUserLogin } from '../redux/Slice'
import { Faculty } from '../types/Faculty'
import { useTranslation } from 'react-multi-lang'
import { BUSINESS_DASHBOARD_SCREEN, FORGOTTEN_PASSWORD_SCREEN, INTERMEDIATIOO_SCREEN, TOP_TAB_NAVIGATOR } from '../constants/Screen'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppDispatch } from '../redux/Hook'
import { Business } from '../types/Business'
import { Data } from '../types/Data'
import { UserLoginRequest } from '../types/request/UserLoginRequest'
import { Student } from '../types/Student'
import { Token } from '../types/Token'
import { isEmail, isPassword } from '../utils/ValidateUtils'

export default function LoginScreen() {
  const t = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [userLoginRequest, setUserLoginRequest] = useState<UserLoginRequest>({
    email: '',
    password: ''
  })
  const [checkEmail, setCheckEmail] = useState(true)
  const [checkPassword, setCheckPassword] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked)
  }

  const handleCheckEmail = (value: any) => {
    setUserLoginRequest({ ...userLoginRequest, email: value })
    if (!isEmail(value)) {
      setCheckEmail(false)
    } else {
      setCheckEmail(true)
    }
  }
  const handleCheckPassword = (value: any) => {
    setUserLoginRequest({ ...userLoginRequest, password: value })
    if (!isPassword(value)) {
      setCheckPassword(false)
    } else {
      setCheckPassword(true)
    }
  }

  const onSubmit = () => {
    setIsLoading(true)
    axios
      .post<UserLoginRequest, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/login', userLoginRequest)
      .then((loginResponse) => {
        const token = loginResponse.data.data.token
        axios
          .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
          .then((response) => {
            if (response.status == 200) {
              setIsLoading(false)
              AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token))
              AsyncStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data))
              dispatch(setUserLogin(response.data.data))
              dispatch(setIsLogout(false))
              navigation.navigate(TOP_TAB_NAVIGATOR)
            }
          })
      })
      .catch((error) => {
        Alert.alert(t('LoginComponent.loginFail'), t('LoginComponent.alertLoginFail'))
        setIsLoading(false)
      })
  }

  const isBtnDisabled = useMemo(() => {
    return (
      userLoginRequest.email == '' || userLoginRequest.password == '' || checkEmail == false || checkPassword == false
    )
  }, [checkEmail, checkPassword, userLoginRequest])

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <SafeAreaView style={styles.container}>
        <View>
          <Image style={styles.imageLogin} source={require('../assets/login/login.png')}></Image>
        </View>
        <View>
          <View>
            <Text style={styles.txtLogin}>{t('LoginComponent.titleLogin')}</Text>
          </View>
          <View style={styles.form}>
            {!checkEmail ? <Text style={{ color: 'red', marginTop: 10 }}>{t('LoginComponent.errorEmail')}</Text> : ''}
            <View style={styles.group}>
              <Icon style={styles.icon} name='at' />
              <TextInput
                value={userLoginRequest.email}
                placeholder={t('LoginComponent.emailId')}
                style={styles.txtIP}
                onChangeText={(value) => handleCheckEmail(value)}
              ></TextInput>
            </View>
            {!checkPassword ? <Text style={{ color: 'red' }}>{t('LoginComponent.errorPass')}</Text> : ''}
            <View style={styles.group}>
              <View>
                <Icon style={styles.icon} name='lock' />
                <TextInput
                  value={userLoginRequest.password}
                  secureTextEntry={!isChecked ? true : false}
                  placeholder={t('LoginComponent.password')}
                  style={styles.txtIP}
                  onChangeText={(value) => handleCheckPassword(value)}
                ></TextInput>
              </View>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox checkBoxColor='green' isChecked={isChecked} onClick={() => handleCheckBoxToggle()} />
                <Text style={{ marginLeft: 10 }}>
                  {isChecked ? t('LoginComponent.hidePass') : t('LoginComponent.showPass')}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(FORGOTTEN_PASSWORD_SCREEN)
                  }}
                >
                  <Text style={styles.txtFogot}>{t('LoginComponent.forgotPass')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={isBtnDisabled}
            style={[styles.btnLogin, { opacity: isBtnDisabled ? 0.5 : 1 }]}
            onPress={() => onSubmit()}
          >
            <Text style={styles.txtB}>{t('LoginComponent.titleLogin')}</Text>
            <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
          </TouchableOpacity>
          <View style={styles.txt}>
            <Text>{t('LoginComponent.requestRegister')} </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(INTERMEDIATIOO_SCREEN)
              }}
            >
              <Text style={{ color: '#0065FF', fontWeight: 'bold' }}>{t('LoginComponent.titleRegister')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
