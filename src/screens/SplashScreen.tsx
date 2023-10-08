import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TOP_TAB_NAVIGATOR } from '../constants/Screen'



// man hinh splash
export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(TOP_TAB_NAVIGATOR)
    }, 3000)
  })

  return (
    <View>
      <Image
        style={{ width: '100%', height: '100%'}}
        source={require('../assets/splash/splash.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
