import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../../constants/KeyValue'
import {
  CREATE_NORMAL_POST_SCREEN,
  CREATE_RECRUITMENT_SCREEN,
  CREATE_SURVEY_SCREEN,
  LOGIN_SCREEN
} from '../../constants/Screen'
import Divider from '../common/Divider'
import DrawerHeader from './DrawerHeader'

export default function DrawerContent(props: DrawerContentComponentProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const logout = useCallback(() => {
    AsyncStorage.removeItem(TOKEN_KEY)
    AsyncStorage.removeItem(USER_LOGIN_KEY)
    navigation.navigate(LOGIN_SCREEN)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader />
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginStart: 14 }}
          label={'Thêm khảo sát'}
          onPress={() => {
            navigation.navigate(CREATE_SURVEY_SCREEN)
          }}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff' }}
          icon={({ color, focused, size }) => (
            <FontAwesome6Icon name='square-poll-vertical' size={16} color={'#0088ff'} />
          )}
        />

        <DrawerItem
          style={{ marginStart: 14 }}
          label={'Thêm tin tuyển dụng'}
          onPress={() => {
            navigation.navigate(CREATE_RECRUITMENT_SCREEN)
          }}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff' }}
          icon={({ color, focused, size }) => (
            <FontAwesome6Icon name='square-poll-vertical' size={16} color={'#0088ff'} />
          )}
        />

        <DrawerItem
          style={{ marginStart: 14 }}
          label={'Thêm bài viết'}
          onPress={() => {
            navigation.navigate(CREATE_NORMAL_POST_SCREEN)
          }}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff' }}
          icon={({ color, focused, size }) => <IoniconsIcon name='create-sharp' size={16} color={'#0088ff'} />}
        />

        <DrawerItem
          style={{ marginStart: 14 }}
          label={'Đăng xuất'}
          onPress={() => {
            logout()
          }}
          labelStyle={{ color: '#f12749' }}
          icon={({ color, focused, size }) => <FontAwesome6Icon name='power-off' size={16} color={'#f12749'} />}
        />
      </DrawerContentScrollView>
    </View>
  )
}
