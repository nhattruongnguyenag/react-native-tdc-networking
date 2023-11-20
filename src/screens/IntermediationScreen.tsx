import { Alert, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BUSINESS_REGISTER_SCREEN, STUDENT_REGISTER_SCREEN } from '../constants/Screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  TEXT_CONTINUTE,
  TEXT_GO_BACK,
  TEXT_SELECTED_TYPE,
  TEXT_TITLE_NITIFICATION,
  TEXT_TITLE_SELECTED_TYPE,
  TEXT_TYPE_BUSINESS,
  TEXT_TYPE_STUDENT,
  TEXT_WARNING_SELECTED_TYPE
} from '../constants/StringVietnamese'

const data = [
  { name: TEXT_TYPE_STUDENT, value: '1' },
  { name: TEXT_TYPE_BUSINESS, value: '2' }
]
export default function IntermediationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [value, setValue] = useState('')
  const onChange = () => {
    if (value === '1') {
      navigation.navigate(STUDENT_REGISTER_SCREEN)
    } else if (value === '2') {
      navigation.navigate(BUSINESS_REGISTER_SCREEN)
    } else {
      Alert.alert(TEXT_TITLE_NITIFICATION, TEXT_WARNING_SELECTED_TYPE)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: 'center' }}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNtwjdZLBWmBWXc1mzdyqtHgfQAFqUF1zeOw&usqp=CAU'
        }}
      >
        <View style={styles.group}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.txt}>{TEXT_TITLE_SELECTED_TYPE}</Text>
          </View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField='name'
            valueField='value'
            placeholder={TEXT_SELECTED_TYPE}
            value={value}
            onChange={(item) => {
              setValue(item.value)
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={[styles.btnContinute, { marginRight: 5 }]} onPress={() => navigation.goBack()}>
              <Text style={styles.txtRegister}>
                <Icon name='angle-double-left' size={16} /> {TEXT_GO_BACK}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnContinute, { marginLeft: 5 }]} onPress={() => onChange()}>
              <Text style={styles.txtRegister}>
                {TEXT_CONTINUTE} <Icon name='angle-double-right' size={16} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  group: {
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
