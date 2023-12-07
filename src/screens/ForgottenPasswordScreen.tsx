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
import { COLOR_BTN_BLUE, COLOR_DANGER } from '../constants/Color'
import { ActivityIndicator } from 'react-native-paper'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ACCEPT_SCREEN, LOGIN_SCREEN } from '../constants/Screen'
import { inlineStyles } from 'react-native-svg'
import { isEmail } from '../utils/ValidateUtils'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useTranslation } from 'react-multi-lang'

export default function ForgottenPasswordScreen() {
  const t = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [checkEmail, setCheckEmail] = useState(true)
  const [email, setEmail] = useState('')
  const [tap, setTap] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckEmail = (value: any) => {
    setEmail(value)
    if (!isEmail(value)) {
      setCheckEmail(false)
    } else {
      setCheckEmail(true)
    }
  }

  const isBtnDisabled = email == '' || checkEmail == false

  const onSubmit = () => {
    setIsLoading(true)
    axios
      .post(SERVER_ADDRESS + 'api/users/get/email/reset', { to: email , subject:  t('ForgettenPassword.textSubjectResetPassword'), content: ''})
      .then((response) => {
        setIsLoading(false)
        navigation.navigate(ACCEPT_SCREEN, { email: email , subject:  t('ForgettenPassword.titleSubjectResetPassword') , title:  t('ForgettenPassword.titleSubjectResetPassword') , url: 'api/users/get/email/reset'})
      })
      .catch((error) => {
        Alert.alert('Xác nhận thất bại', 'Email này chưa được đăng ký')
        setIsLoading(false)
      })
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <SafeAreaView style={styles.container}>
        <View>
          <Image style={styles.imageLogin} source={require('../assets/login/login.png')}></Image>
        </View>
        <View>
          <View>
            <Text style={styles.txtLogin}>
              {t('ForgettenPassword.textForgetPassword')}
            </Text>
          </View>
          <View style={styles.form}>
            {!checkEmail ? <Text style={{ color: 'red', marginTop: 10 }}>{t('ForgettenPassword.textNotification')}</Text> : ''}
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
            <Text style={styles.txtB}>{t('ForgettenPassword.textAccept')}</Text>
            <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
          </TouchableOpacity>
        </View>
        <Text
          style={styles.txtBottom}
          onPressIn={() => setTap(true)}
          onPressOut={() => setTap(false)}
          onPress={() => {
            navigation.navigate(LOGIN_SCREEN)
          }}
        >
          <Icon style={tap ? styles.iconBack_Tap : styles.iconBack} name='arrow-left' />
          <Text style={tap ? styles.txtClick_Tap : styles.txtClick}>&nbsp;{t('ForgettenPassword.textBack')}</Text>
        </Text>
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
