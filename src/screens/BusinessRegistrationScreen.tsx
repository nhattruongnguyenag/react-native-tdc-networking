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
    setIsLoading(true)
    axios
      .post<Business, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/business/register', business)
      .then((response) => {
        console.log(response.data)
        Alert.alert('Đăng ký thành công', 'Thành công')
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Đăng ký thất bại', 'Thông tin không hợp lệ')
        setIsLoading(false)
      })
    console.log(business)
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
            onChangeText={(value) => setBusiness({ ...business, name: value })}
          />
          <TextInputWithTitle
            title='Email'
            placeholder='Nhập email...'
            onChangeText={(value) => setBusiness({ ...business, email: value })}
          />
          <TextInputWithTitle
            title='Họ tên người đại diện'
            placeholder='Nhập họ tên người đại diện...'
            onChangeText={(value) => setBusiness({ ...business, representor: value })}
          />
          <TextInputWithTitle
            title='Mã số thuế'
            placeholder='Nhập mã số thuế...'
            onChangeText={(value) => setBusiness({ ...business, taxCode: value })}
          />
          <TextInputWithTitle
            title='Địa chỉ'
            placeholder='Nhập địa chỉ...'
            onChangeText={(value) => setBusiness({ ...business, address: value })}
          />
          <TextInputWithTitle
            title='Điện thoại'
            placeholder='Nhập số điện thoại...'
            onChangeText={(value) => setBusiness({ ...business, phone: value })}
          />
          <TextInputWithTitle
            title='Thời gian hoạt động'
            placeholder='Nhập thời gian hoạt động...'
            onChangeText={(value) => setBusiness({ ...business, activeTime: value })}
          />
          <View style={styles.group}>
            <Text style={styles.txt}>Mật khẩu đăng ký</Text>
            <TextInput
              placeholder='Nhập mật khẩu đăng ký...'
              style={styles.ip}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
            ></TextInput>
            <TouchableOpacity style={styles.icon} onPress={() => onCheck()}>
              <Icon name={!isCheck.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>
          <View style={styles.group}>
            <Text style={styles.txt}>Nhập lại mật khẩu</Text>
            <TextInput
              placeholder='Nhập lại mật khẩu...'
              style={styles.ip}
              secureTextEntry={isCheck1.secureTextEntry ? true : false}
            />

            <TouchableOpacity style={styles.icon} onPress={() => onCheck1()}>
              <Icon name={!isCheck1.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.icon1} />
            </TouchableOpacity>
          </View>

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
