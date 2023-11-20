import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NormalOptionItem from '../components/option/NormalOptionItem'

export default function ApplicationOptionScreen() {
  return (
    <View style={styles.body}>
      <NormalOptionItem iconName='globe' title='Ngôn ngữ' />
      <NormalOptionItem iconName='user' title='Thông tin cá nhân' />
      <NormalOptionItem iconName='key' title='Mật khẩu' />
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 15
    }
})