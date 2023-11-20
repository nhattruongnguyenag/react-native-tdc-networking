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
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../../constants/KeyValue'
import {
  APPLICATION_OPTION_SCREEN,
  CREATE_NORMAL_POST_SCREEN,
  CREATE_RECRUITMENT_SCREEN,
  CREATE_SURVEY_SCREEN,
  LOGIN_SCREEN
} from '../../constants/Screen'
import Divider from '../common/Divider'
import AccordionItem from './AccordionItem'
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
        <List.Accordion
          titleNumberOfLines={5}
          title={
            <AccordionItem title='Nhóm của bạn' iconName='users-line' />
          }
          titleStyle={{ fontSize: 17 }}
          id={0}>
          <DrawerItem
            style={{ marginStart: 60 }}
            label={'Công nghệ thông tin'}
            onPress={() => {
              navigation.navigate(CREATE_SURVEY_SCREEN)
            }}
            inactiveBackgroundColor={'#fff'}
            pressColor={'#0088ff03'}
          />
        </List.Accordion>


        <DrawerItem
          label={'Hồ sơ ứng tuyển'}
          onPress={() => {
          }}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff' }}
          icon={({ color, focused, size }) => (
            <FontAwesome6Icon style={{width: 15}} name='paste' size={16} color={'#0088ff'} />
          )}
        />

        <DrawerItem
          label={'Duyệt bài viết'}
          onPress={() => {
          }}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff' }}
          icon={({ color, focused, size }) => (
            <FontAwesome6Icon style={{width: 15}} name='bars-progress' size={16} color={'#0088ff'} />
          )}
        />

        <DrawerItem
          label={'Tùy chọn'}
          onPress={() => {
            navigation.navigate(APPLICATION_OPTION_SCREEN)
          }}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff', margin: 0 }}
          icon={({ color, focused, size }) => (
            <FontAwesome6Icon style={{width: 15}} name='gear' size={16} color={'#0088ff'} />
          )}
        />

        <DrawerItem
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
