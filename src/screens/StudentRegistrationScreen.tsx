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
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LOGIN_SCREEN } from '../constants/Screen'
import { COLOR_BTN_BLUE } from '../constants/Color'
import { Student } from '../types/Student'
import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import { ActivityIndicator } from 'react-native-paper'
import ActionSheet from 'react-native-actionsheet'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import { useAppSelector } from '../redux/Hook'

const dataKhoa = [
  { name: 'Công nghệ thông tin', value: '1' },
  { name: 'Điện-Điện tử', value: '2' },
  { name: 'Tiếng anh', value: '3' },
  { name: 'Cơ khí', value: '4' },
  { name: 'Ô tô', value: '5' },
  { name: 'Du lịch', value: '6' }
]

const dataNganh = [
  { name: 'Công nghệ thông tin', item: '1' },
  { name: 'Thiết kế đồ họa', item: '2' },
  { name: 'Mạng máy tính', item: '3' },
  { name: 'Điện điện tử', item: '4' },
  { name: 'Tiếng nhật', item: '5' },
  { name: 'Tiếng anh', item: '6' },
  { name: 'Tiếng hàn', item: '7' },
  { name: 'Cơ khí', item: '8' },
  { name: 'Ô tô', item: '9' }
]

// man hinh dang ky danh cho sinh vien
export default function StudentRegistrationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { userLogin, imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [student, setStudent] = useState<Student>({
    id: 0,
    password: '',
    code: '',
    email: '',
    name: '',
    image: '',
    facultyName: '',
    major: '',
    studentCode: '',
    status: 0,
    createdAt: '',
    updatedAt: '',
    roleCodes: '',
    confimPassword: '',
    isTyping: 0,
    isMessageConnect: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [item, setItem] = useState('')
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

  const onSubmit = () => {
    setIsLoading(true)
    setStudent({ ...student, code: JSON.stringify(Date.now()), image: JSON.stringify(imagesUpload) })

    axios
      .post<Student, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/student/register', student)
      .then((response) => {
        console.log(response.status)
        Alert.alert('Đăng ký thành công', 'Thành công')
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Đăng ký thất bại', 'Thông tin không hợp lệ')
        setIsLoading(false)
      })
    console.log(student)
  }
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>Đăng ký sinh viên</Text>
        </View>

        <View style={styles.form}>
          <TextInputWithTitle
            title='Họ tên'
            placeholder='Nhập họ tên...'
            onChangeText={(value) => setStudent({ ...student, name: value })}
          />
          <TextInputWithTitle
            title='Mã số sinh viên'
            placeholder='Nhập mã số sinh viên...'
            onChangeText={(value) => setStudent({ ...student, studentCode: value })}
          />
          <TextInputWithTitle
            title='Email sinh viên'
            placeholder='Nhập email sinh viên...'
            onChangeText={(value) => setStudent({ ...student, email: value })}
          />
          <View style={styles.group}>
            <Text style={styles.txt}>Khoa</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataKhoa}
              search
              labelField='name'
              valueField='value'
              placeholder='Chọn khoa...'
              searchPlaceholder='Tìm kiếm...'
              value={value}
              onChange={(item) => {
                setValue(item.value)
                setStudent({ ...student, facultyName: item.name })
              }}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.txt}>Ngành học</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dataNganh}
              search
              labelField='name'
              valueField='item'
              placeholder='Chọn ngành học...'
              searchPlaceholder='Tìm kiếm...'
              value={item}
              onChange={(item) => {
                setItem(item.item)
                setStudent({ ...student, major: item.name })
              }}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.txt}>Mật khẩu đăng ký</Text>
            <TextInput
              placeholder='Nhập mật khẩu đăng ký...'
              style={styles.ip}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
              onChangeText={(value) => setStudent({ ...student, password: value })}
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
              onChangeText={(value) => setStudent({ ...student, confimPassword: value })}
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
  header: { backgroundColor: '#1e90ff', alignItems: 'center' },
  txtHeader: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  form: { marginTop: 10 },
  group: {
    marginTop: 20,
    marginHorizontal: 10
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
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    marginTop: 30,
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

  dropdown: {
    height: 50,
    borderColor: '#97A1B0',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    marginTop: 10
  },

  placeholderStyle: {
    fontSize: 18
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#000000'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000'
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
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 28
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 10
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
