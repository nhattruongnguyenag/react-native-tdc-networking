import { Alert, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BUSINESS_REGISTER_SCREEN, STUDENT_REGISTER_SCREEN } from '../constants/Screen'
import Icon from 'react-native-vector-icons/FontAwesome5'


const data = [
  { name: 'Sinh viên', value: '1' },
  { name: 'Doanh nghiệp', value: '2' }
]
export default function IntermediationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [value, setValue] = useState('')
  const onChange = () => {
    if (value === '1') {
      navigation.navigate(STUDENT_REGISTER_SCREEN)
    } else if(value === '2') {
      navigation.navigate(BUSINESS_REGISTER_SCREEN)
    }else{
      Alert.alert('Thông báo', 'Hãy chọn hình thức đăng ký!')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: 'center' }}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNtwjdZLBWmBWXc1mzdyqtHgfQAFqUF1zeOw&usqp=CAU'
          // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYTg5nI-AoqpyPB4cOzezyIbebOn4qgYptJGstgzDiLetskqJCu6oGwdIXcxlPS___3Y0&usqp=CAU'
        }}
      >
        <View style={styles.group}>
          <Text style={styles.txt}>Lựa chọn</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField='name'
            valueField='value'
            placeholder='Chọn hình thức đăng ký...'
            value={value}
            onChange={(item) => {
              setValue(item.value)
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.btnContinute} onPress={() => navigation.goBack()}>
              <Text style={styles.txtRegister}><Icon name='undo-alt' size={20}/> Trở lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContinute} onPress={() => onChange()}>
              <Text style={styles.txtRegister}>Tiếp tục <Icon name='arrow-right' size={20}/></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  group: {
    marginTop: 100,
    marginHorizontal: 10
  },
  txt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18
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

  btnContinute: {
    width: 100,
    height: 45,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10
  },
  txtRegister: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
})