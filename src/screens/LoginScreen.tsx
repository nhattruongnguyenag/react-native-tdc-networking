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
import React, { useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { UserLoginRequest } from '../types/UserLoginRequest'
import axios, { AxiosResponse } from 'axios'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Student } from '../types/Student'
import { Business } from '../types/Business'
import { Faculty } from '../types/Faculty'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { INTERMEDIATIOO_SCREEN, TOP_TAB_NAVIGATOR } from '../constants/Screen'
import CheckBox from 'react-native-check-box'
import { ActivityIndicator } from 'react-native-paper'
import { COLOR_BTN_BLUE } from '../constants/Color'
import { useAppDispatch } from '../redux/Hook'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../constants/KeyValue'
import { setUserLogin } from '../redux/Slice'

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
    // let regexEmail = new RegExp(
    //   /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+?((?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/
    // )
    setUserLoginRequest({ ...userLoginRequest, email: value })
    // if (!regexEmail.test(userLoginRequest.email)) {
    //   setCheckEmail(false)
    // } else {
    //   setCheckEmail(true)
    // }
  }
  const handleCheckPassword = (value: any) => {
    // //const regexPass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/)
    // const regexPass = /^[0-9]{5}$/
    setUserLoginRequest({ ...userLoginRequest, password: value })
    // if (!regexPass.test(userLoginRequest.password)) {
    //   setCheckPassword(false)
    // } else {
    //   setCheckPassword(true)
    // }
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
        Alert.alert('Đăng nhập thất bại', 'Tên đăng nhập hoặc mật khẩu không đúng')
        setIsLoading(false)
      })
  }

  const isBtnDisabled = useMemo(() => {
    return false
    // userLoginRequest.email == '' || userLoginRequest.password == '' || checkEmail == false || checkPassword == false
  }, [checkEmail, checkPassword, userLoginRequest])

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Image style={styles.imageLogin} source={require('../assets/login/login.png')}></Image>
        </View>
        <View>
          <View>
            <Text style={styles.txtLogin}>Đăng nhập</Text>
          </View>
          <View style={styles.form}>
            {!checkEmail ? <Text style={{ color: 'red', marginTop: 10 }}>Email sai định dạng hoặc rỗng</Text> : ''}
            <View style={styles.group}>
              <Icon style={styles.icon} name='at' />
              <TextInput
                value={userLoginRequest.email}
                placeholder='Email ID'
                style={styles.txtIP}
                onChangeText={(value) => handleCheckEmail(value)}
              ></TextInput>
            </View>
            {!checkPassword ? <Text style={{ color: 'red' }}>Mật khẩu sai định dạng hoặc rỗng</Text> : ''}
            <View style={styles.group}>
              <View>
                <Icon style={styles.icon} name='lock' />
                <TextInput
                  value={userLoginRequest.password}
                  secureTextEntry={!isChecked ? true : false}
                  placeholder='Mật khẩu'
                  style={styles.txtIP}
                  onChangeText={(value) => handleCheckPassword(value)}
                ></TextInput>
              </View>
              <View>
                <TouchableOpacity>
                  <Text style={styles.txtFogot}>Quên mật khẩu</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox checkBoxColor='green' isChecked={isChecked} onClick={() => handleCheckBoxToggle()} />
              {!isChecked ? <Text style={{ marginLeft: 10 }}>Hiện</Text> : <Text style={{ marginLeft: 10 }}>Ẩn</Text>}
            </View>
          </View>
          <TouchableOpacity
            disabled={isBtnDisabled}
            style={[styles.btnLogin, { opacity: isBtnDisabled ? 0.5 : 1 }]}
            onPress={() => onSubmit()}
          >
            <Text style={styles.txtB}>Đăng nhập</Text>
            <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
          </TouchableOpacity>
          <View style={styles.txt}>
            <Text>Chưa có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(INTERMEDIATIOO_SCREEN)
              }}
            >
              <Text style={{ color: '#0065FF', fontWeight: 'bold' }}>Đăng ký</Text>
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
