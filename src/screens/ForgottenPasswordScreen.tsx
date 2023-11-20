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
import { COLOR_BTN_BLUE } from '../constants/Color'
import { ActivityIndicator } from 'react-native-paper'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ACCEPT_FORGOTTEN_PASSWORD_SCREEN, LOGIN_SCREEN } from '../constants/Screen'
import { inlineStyles } from 'react-native-svg'
import { isEmail } from '../utils/ValidateUtils'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'

export default function ForgottenPasswordScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [checkEmail, setCheckEmail] = useState(true)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckEmail = (value: any) => {
    setEmail(value)
    if (!isEmail(value)) {
      setCheckEmail(false)
    } else {
      setCheckEmail(true)
    }
  }

  const isBtnDisabled =  email == '' || checkEmail == false

  const onSubmit = () => {
    setIsLoading(true)
    axios
      .post(SERVER_ADDRESS + 'api/users/get/email/reset',{email: email})
      .then((response) => {
        setIsLoading(false)
        navigation.navigate(ACCEPT_FORGOTTEN_PASSWORD_SCREEN, { email: email })
      })
      .catch((error) => {
        Alert.alert('Xác nhận thất bại', 'Email này chưa được đăng ký')
        setIsLoading(false)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.imageLogin} source={require('../assets/login/login.png')}></Image>
      </View>
      <View>
        <View>
          <Text style={styles.txtLogin}>Quên mật khẩu</Text>
        </View>
        <View style={styles.form}>
          {!checkEmail ? <Text style={{ color: 'red', marginTop: 10 }}>Email sai định dạng hoặc rỗng</Text> : ''}
          <View style={styles.group}>
            <Icon style={styles.icon} name='at' />
            <TextInput
              value={email}
              placeholder='Email ID'
              style={styles.txtIP}
              onChangeText={(value) => handleCheckEmail(value)}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity
          disabled={isBtnDisabled}
          style={[styles.btnLogin, { opacity: isBtnDisabled ? 0.5 : 1 }]}
          onPress={() => onSubmit()}
        >
          <Text style={styles.txtB}>Xác nhận</Text>
          <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
        </TouchableOpacity>
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
