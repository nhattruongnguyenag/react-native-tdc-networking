import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TextInputWithTitle from '../components/inputs/TextInputWithTitle'
import { BACKGROUND_BLUE } from '../constants/Color'

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

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.txtHeader}>Đăng ký sinh viên</Text>
        </View>

        <View style={styles.form}>
          <TextInputWithTitle title='Họ tên' placeholder='Nhập họ tên...'/>
          <TextInputWithTitle title='Mã số sinh viên' placeholder='Nhập mã số sinh viên...'/>
          <TextInputWithTitle title='Email sinh viên' placeholder='Nhập email sinh viên...'/>
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
              }}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.txt}>Mật khẩu đăng ký</Text>
            <TextInput
              placeholder='Nhập mật khẩu đăng ký...'
              style={styles.ip}
              secureTextEntry={isCheck.secureTextEntry ? true : false}
            ></TextInput>
            <TouchableOpacity style={styles.icon} onPress={() => onCheck()}>
              {!isCheck.secureTextEntry ? (
                <Icon name='eye' style={styles.icon1} />
              ) : (
                <Icon name='eye-slash' style={styles.icon1} />
              )}
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
              {!isCheck1.secureTextEntry ? (
                <Icon name='eye' style={styles.icon1} />
              ) : (
                <Icon name='eye-slash' style={styles.icon1} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.txtRegister}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: { backgroundColor: BACKGROUND_BLUE, alignItems: 'center' },
  txtHeader: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  form: { marginTop: 20 },
  group: {
    marginTop: 10,
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
    backgroundColor: BACKGROUND_BLUE,
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 15,
    borderRadius: 10
  },
  txtRegister: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
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
  iconStyle:{
    width: 30,
    height: 30,
    marginRight: 28
  }
})
