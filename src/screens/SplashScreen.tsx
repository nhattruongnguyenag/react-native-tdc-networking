import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LOGIN_SCREEN, TOP_TAB_NAVIGATOR } from '../constants/Screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_LOGIN_KEY } from '../constants/KeyValue'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { setUserLogin } from '../redux/Slice'


// man hinh splash
export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { userLogin } = useAppSelector(state => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem(USER_LOGIN_KEY).then(json => {
        if (json) {
          const userLogin = JSON.parse(json)
          if (userLogin) {
            dispatch(setUserLogin(userLogin))
            navigation.replace(TOP_TAB_NAVIGATOR)
          } 
        } else {
          navigation.replace(LOGIN_SCREEN)
        }
      }).catch(error => console.log(error))
    }, 3000)
  }, [])

  return (
    <View>
      <Image
        style={{ width: '100%', height: '100%' }}
        source={require('../assets/splash/splash.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
