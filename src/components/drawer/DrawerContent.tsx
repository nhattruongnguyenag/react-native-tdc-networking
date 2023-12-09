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
import { View } from 'react-native'
import { List } from 'react-native-paper'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import { TOKEN_KEY, USER_LOGIN_KEY } from '../../constants/KeyValue'
import {
  FACULTY_DASHBOARD_SCREEN,
  STUDENT_DISCUSSION_DASHBOARD_SCREEN,
  MANAGEMENT_JOB_APPLY_SCREEN,
  BUSINESS_DASHBOARD_SCREEN,
  APPLICATION_OPTION_SCREEN,
  APPROVAL_POST_SCREEN,
  LOGIN_SCREEN,
  PEDDING_POST_SCREEN
} from '../../constants/Screen'
import Divider from '../common/Divider'
import AccordionItem from './AccordionItem'
import DrawerHeader from './DrawerHeader'

import { useTranslation } from 'react-multi-lang'
import { useAppSelector } from '../../redux/Hook'
import { isAdmin, isFaculty, isStudent, isBusiness } from '../../utils/UserHelper'
import { TYPE_POST_FACULTY, TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import { getGroupForPost } from '../../utils/GetGroup'
import { groupBusiness, groupStudent } from '../../constants/Variables'

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const logout = useCallback(() => {
    AsyncStorage.removeItem(TOKEN_KEY)
    AsyncStorage.removeItem(USER_LOGIN_KEY)
    navigation.navigate(LOGIN_SCREEN)
  }, [])

  const t = useTranslation()

  const getScreenOfUser = (role?: string) => {
    let screen = '';
    if (role === TYPE_POST_STUDENT) {
      screen = STUDENT_DISCUSSION_DASHBOARD_SCREEN;
    } else if (role === TYPE_POST_FACULTY) {
      screen = FACULTY_DASHBOARD_SCREEN;
    } else {
      screen = BUSINESS_DASHBOARD_SCREEN;
    }
    navigation.navigate(screen);
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader />
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        {
          isStudent(userLogin) &&
          <List.Accordion
            titleNumberOfLines={5}
            title={<AccordionItem title={t('DrawerContentComponent.userGroup')} iconName='users-line' />}
            titleStyle={{ fontSize: 17 }}
            id={0}
          >
            {isStudent(userLogin) && (
              <DrawerItem
                style={{ marginStart: 60 }}
                label={getGroupForPost(groupStudent, t)}
                onPress={() => getScreenOfUser(userLogin.roleCodes)}
                inactiveBackgroundColor={'#fff'}
                pressColor={'#0088ff03'}
              />
            )}

            {isFaculty(userLogin) && (
              <DrawerItem
                style={{ marginStart: 60 }}
                label={getGroupForPost(userLogin?.facultyGroupCode + "", t)}
                onPress={() => getScreenOfUser(userLogin.roleCodes)}
                inactiveBackgroundColor={'#fff'}
                pressColor={'#0088ff03'}
              />
            )}

            {isBusiness(userLogin) && (
              <DrawerItem
                style={{ marginStart: 60 }}
                label={getGroupForPost(groupBusiness, t)}
                onPress={() => getScreenOfUser(userLogin.roleCodes)}
                inactiveBackgroundColor={'#fff'}
                pressColor={'#0088ff03'}
              />
            )}
          </List.Accordion>
        }

        {isStudent(userLogin) && (
          <DrawerItem
            label={t('DrawerContentComponent.userJobApplyProfile')}
            onPress={() => navigation.navigate(MANAGEMENT_JOB_APPLY_SCREEN)}
            inactiveBackgroundColor={'#fff'}
            pressColor={'#0088ff03'}
            labelStyle={{ color: '#0088ff' }}
            icon={({ color, focused, size }) => (
              <FontAwesome6Icon style={{ width: 15 }} name='file-lines' size={16} color={'#0088ff'} />
            )}
          />
        )}

        {(isAdmin(userLogin) || isFaculty(userLogin)) && (
          <DrawerItem
            label={t('DrawerContentComponent.approvingPost')}
            onPress={() => navigation.navigate(APPROVAL_POST_SCREEN)}
            inactiveBackgroundColor={'#fff'}
            pressColor={'#0088ff03'}
            labelStyle={{ color: '#0088ff' }}
            icon={({ color, focused, size }) => (
              <FontAwesome6Icon style={{ width: 15 }} name='bars-progress' size={16} color={'#0088ff'} />
            )}
          />
        )}

        {
          isStudent(userLogin) &&
          <DrawerItem
            label={t('DrawerContentComponent.peddingPost')}
            onPress={() => navigation.navigate(PEDDING_POST_SCREEN)}
            inactiveBackgroundColor={'#fff'}
            pressColor={'#0088ff03'}
            labelStyle={{ color: '#0088ff' }}
            icon={({ color, focused, size }) => (
              <FontAwesome6Icon style={{ width: 15 }} name='list' size={16} color={'#0088ff'} />
            )}
          />
        }

        <DrawerItem
          label={t('DrawerContentComponent.option')}
          onPress={() => navigation.navigate(APPLICATION_OPTION_SCREEN)}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff', margin: 0 }}
          icon={({ color, focused, size }) => (
            <FontAwesome6Icon style={{ width: 15 }} name='gear' size={16} color={'#0088ff'} />
          )}
        />

        <DrawerItem
          label={t('DrawerContentComponent.logout')}
          onPress={logout}
          labelStyle={{ color: '#f12749' }}
          icon={({ color, focused, size }) => <FontAwesome6Icon name='power-off' size={16} color={'#f12749'} />}
        />
      </DrawerContentScrollView>
    </View>
  )
}
