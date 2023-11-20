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
import React, { useEffect, useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { UserLoginRequest } from '../types/request/UserLoginRequest'
import axios, { AxiosResponse } from 'axios'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Student } from '../types/Student'
import { Business } from '../types/Business'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FORGOTTEN_PASSWORD_SCREEN, INTERMEDIATIOO_SCREEN, TOP_TAB_NAVIGATOR } from '../constants/Screen'
import CheckBox from 'react-native-check-box'
import { ActivityIndicator } from 'react-native-paper'
import { COLOR_BTN_BLUE } from '../constants/Color'
import { useAppDispatch } from '../redux/Hook'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue'
import { setUserLogin } from '../redux/Slice'
import { isEmail, isPassword } from '../utils/ValidateUtils'
import { Faculty } from '../types/Faculty'
import {
  TEXT_ALERT_LOGIN_FAILT,
  TEXT_ERROR_EMAIL_EMPTY_NOTMATCH,
  TEXT_ERROR_PASS_EMPTY_NOTMATCH,
  TEXT_FORGOT_PASSWORD,
  TEXT_HIDE_PASSWORD,
  TEXT_LOGIN,
  TEXT_LOGIN_FAILT,
  TEXT_PLACEHOLDER_EMAIL,
  TEXT_PLACEHOLDER_EMAIL_LOGIN,
  TEXT_PLACEHOLDER_PASSWORD,
  TEXT_REGISTER,
  TEXT_REQUEST_REGISTER,
  TEXT_SHOW_PASSWORD,
  TEXT_TITLE_PASSWORD_LOGIN
} from '../constants/StringVietnamese'

// man hinh dang nhap
export default function LoginScreen() {
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
              navigation.navigate(TOP_TAB_NAVIGATOR)
            }
          })
      })
      .catch((error) => {
        Alert.alert(TEXT_LOGIN_FAILT, TEXT_ALERT_LOGIN_FAILT)
        setIsLoading(false)
      })
  }

  const isBtnDisabled = useMemo(() => {
    return (
      userLoginRequest.email == '' || userLoginRequest.password == '' || checkEmail == false || checkPassword == false
    )
  }, [checkEmail, checkPassword, userLoginRequest])

  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      <SafeAreaView style={styles.container}>
        <View>
          <Image style={styles.imageLogin} source={require('../assets/login/login.png')}></Image>
        </View>
        <View>
          <View>
            <Text style={styles.txtLogin}>{TEXT_LOGIN}</Text>
          </View>
          <View style={styles.form}>
            {!checkEmail ? <Text style={{ color: 'red', marginTop: 10 }}>{TEXT_ERROR_EMAIL_EMPTY_NOTMATCH}</Text> : ''}
            <View style={styles.group}>
              <Icon style={styles.icon} name='at' />
              <TextInput
                value={userLoginRequest.email}
                placeholder={TEXT_PLACEHOLDER_EMAIL_LOGIN}
                style={styles.txtIP}
                onChangeText={(value) => handleCheckEmail(value)}
              ></TextInput>
            </View>
            {!checkPassword ? <Text style={{ color: 'red' }}>{TEXT_ERROR_PASS_EMPTY_NOTMATCH}</Text> : ''}
            <View style={styles.group}>
              <View>
                <Icon style={styles.icon} name='lock' />
                <TextInput
                  value={userLoginRequest.password}
                  secureTextEntry={!isChecked ? true : false}
                  placeholder={TEXT_TITLE_PASSWORD_LOGIN}
                  style={styles.txtIP}
                  onChangeText={(value) => handleCheckPassword(value)}
                ></TextInput>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(FORGOTTEN_PASSWORD_SCREEN)
                  }}
                >
                  <Text style={styles.txtFogot}>{TEXT_FORGOT_PASSWORD}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox checkBoxColor='green' isChecked={isChecked} onClick={() => handleCheckBoxToggle()} />
              <Text style={{ marginLeft: 10 }}>{isChecked ? TEXT_SHOW_PASSWORD : TEXT_HIDE_PASSWORD}</Text>
            </View>
          </View>
          <TouchableOpacity
            disabled={isBtnDisabled}
            style={[styles.btnLogin, { opacity: isBtnDisabled ? 0.5 : 1 }]}
            onPress={() => onSubmit()}
          >
            <Text style={styles.txtB}>{TEXT_LOGIN}</Text>
            <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
          </TouchableOpacity>
          <View style={styles.txt}>
            <Text>{TEXT_REQUEST_REGISTER} </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(INTERMEDIATIOO_SCREEN)
              }}
            >
              <Text style={{ color: '#0065FF', fontWeight: 'bold' }}>{TEXT_REGISTER}</Text>
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
