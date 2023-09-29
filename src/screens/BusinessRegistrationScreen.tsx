import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

// man hinh dang ky danh cho doanh ngiep
export default function BusinessRegistrationScreen() {

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
          <Text style={styles.txtHeader}>Đăng ký doanh nghiệp</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.group}>
            <Text style={styles.txt}>Tên doanh nghiệp</Text>
            <TextInput placeholder='Nhập tên doanh nghiệp...' style={styles.ip}></TextInput>
          </View>
          <View style={styles.group}>
            <Text style={styles.txt}>Email</Text>
            <TextInput placeholder='Nhập email...' style={styles.ip}></TextInput>
          </View>
          <View style={styles.group}>
            <Text style={styles.txt}>Họ tên người đại diện</Text>
            <TextInput placeholder='Nhập họ tên người đại diện...' style={styles.ip}></TextInput>
          </View>

          <View style={styles.group}>
            <Text style={styles.txt}>Mã số thuế</Text>
            <TextInput placeholder='Nhập mã số thuế...' style={styles.ip}></TextInput>
          </View>
          <View style={styles.group}>
            <Text style={styles.txt}>Địa chỉ</Text>
            <TextInput placeholder='Nhập địa chỉ...' style={styles.ip}></TextInput>
          </View>
          <View style={styles.group}>
            <Text style={styles.txt}>Điện thoại</Text>
            <TextInput placeholder='Nhập số điện thoại...' style={styles.ip}></TextInput>
          </View>
          <View style={styles.group}>
            <Text style={styles.txt}>Thời gian hoạt động</Text>
            <TextInput placeholder='Nhập thời gian hoạt động...' style={styles.ip}></TextInput>
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
  header: { backgroundColor: 'blue', alignItems: 'center' },
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
    backgroundColor: 'blue',
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
  icon: {
    fontSize: 20,
    position: 'absolute',
    padding: 50,
    right: -20
  },
  icon1: {
    fontSize: 20
  },
})
