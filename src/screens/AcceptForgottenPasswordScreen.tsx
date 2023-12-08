import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BACKGROUND_BLUE, COLOR_BLACK, COLOR_BTN_BLUE } from '../constants/Color'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import Video from 'react-native-video'
import { ActivityIndicator } from 'react-native-paper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ACCEPT_FORGOTTEN_PASSWORD_SCREEN, LOGIN_SCREEN } from '../constants/Screen'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
export default function AcceptForgottenPasswordScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ACCEPT_FORGOTTEN_PASSWORD_SCREEN'>>()
  const email = route.params?.email ?? ''
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const videoRef = useRef<Video>(null)
  const [mute, setMute] = useState(false)
  const [tap, setTap] = useState(false)
  const [timePassed, setTimePassed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = () => {
    setIsLoading(true)
    axios.post(SERVER_ADDRESS + 'api/users/get/email/reset', { email: email }).then((response) => {
      setIsLoading(false)
      Alert.alert('Thông báo', 'Đã gửi lại liên kết tới ' + email)
    })
  }

  setTimeout(() => {
    setTimePassed(true)
  }, 3000)
  if (timePassed) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image style={styles.imageLogin} source={require('../assets/image/email.png')}></Image>
        </View>
        <View style={styles.block}>
          <View>
            <Text style={styles.txtLogin}>Kiểm tra email</Text>
            <Text style={styles.txtDetail}>
              Chúng tôi đã gửi đến email bạn liên kết thay đổi mật khẩu, vui lòng kiểm tra email
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.btnLogin]}
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN)
            }}
          >
            <Text style={styles.txtB}>Quay về</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.txtBottom}>
                Chưa nhận được email ??,&nbsp;   
                <Text onPressIn={() => setTap(true)} onPressOut={() => setTap(false)} onPress={onSubmit} style={tap?styles.txtClick_Tap:styles.txtClick}>
                 Gửi lại
                </Text>
            </Text>
            <ActivityIndicator color={'#fff'} style={{ display: isLoading ? 'flex' : 'none' }} />
          </View>
        </View>
      </SafeAreaView>
    )
  } else {
    return (
      <View>
        <Video
          ref={videoRef}
          repeat={false}
          resizeMode='cover'
          source={require('../assets/video/send.mp4')}
          // Tat am thanh
          muted={mute}
          style={styles.video}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%'
  },
  container: {
    marginHorizontal: 30
  },
  imageLogin: {
    width: 120,
    height: 120,
    marginLeft: 115,
    marginTop: 80,
    marginBottom: 20
  },
  txtLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20
  },
  txtDetail: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#97A1B0',
    textAlign: 'center'
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
  block: {
    alignItems: 'center'
  },
  btnLogin: {
    width: '50%',
    marginTop: 30,
    marginBottom: 30,
    fontSize: 30,
    backgroundColor: COLOR_BTN_BLUE,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 7
  },
  btnBack: {
    marginTop: 90,
    width: 30
  },
  iconBack: {
    fontSize: 30,
    color: COLOR_BTN_BLUE
  },
  txtB: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 10
  },
  txtBottom: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 10
  },
  txtClick: {
    textDecorationLine: 'underline',
    color: COLOR_BTN_BLUE
  },
  txtClick_Tap: {
    color: '#000',
    fontWeight: 'bold'
  },
  txt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25
  }
})