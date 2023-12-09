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
  MANAGEMENT_JOB_APPLY_SCREEN,
  BUSINESS_DASHBOARD_SCREEN,
  APPLICATION_OPTION_SCREEN,
  APPROVAL_POST_SCREEN,
  LOGIN_SCREEN,
  PEDDING_POST_SCREEN,
  STUDENT_AND_FACULTY_GROUP
} from '../../constants/Screen'
import Divider from '../common/Divider'
import AccordionItem from './AccordionItem'
import DrawerHeader from './DrawerHeader'

import { useTranslation } from 'react-multi-lang'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { isAdmin, isFaculty, isStudent, isBusiness } from '../../utils/UserHelper'
import { TYPE_POST_BUSINESS, groupBusiness } from '../../constants/Variables'
import { setIsLogout } from '../../redux/Slice'
import { Faculty } from '../../types/Faculty'
import { Student } from '../../types/Student'
import { getGroupForPost } from '../../utils/GetGroup'

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const dispatch = useAppDispatch()
  const logout = useCallback(() => {
    dispatch(setIsLogout(true));
    AsyncStorage.removeItem(TOKEN_KEY)
    AsyncStorage.removeItem(USER_LOGIN_KEY)
    navigation.navigate(LOGIN_SCREEN)
  }, [])

  const t = useTranslation()
  const isUserFacultyOrStudent = (isFaculty(userLogin) || isStudent(userLogin));
  const groupCode = isUserFacultyOrStudent ? (userLogin as unknown as Faculty || userLogin as unknown as Student).facultyGroupCode : "";
  const getScreenOfUser = (role: string) => {
    let screen: string = '';
    if (role === TYPE_POST_BUSINESS) {
      screen = BUSINESS_DASHBOARD_SCREEN;
    } else {
      screen = STUDENT_AND_FACULTY_GROUP;
    }
    navigation.navigate(screen);
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader />
      <Divider />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <List.Accordion
          titleNumberOfLines={5}
          title={<AccordionItem title={t('DrawerContentComponent.userGroup')} iconName='users-line' />}
          titleStyle={{ fontSize: 17 }}
          id={0}
        >
          {isStudent(userLogin) && (
            <DrawerItem
              style={{ marginStart: 60 }}
              label={getGroupForPost(groupCode, t)}
              onPress={() => getScreenOfUser(userLogin.roleCodes ?? "")}
              inactiveBackgroundColor={'#fff'}
              pressColor={'#0088ff03'}
            />
          )}
          {isFaculty(userLogin) && (
            <DrawerItem
              style={{ marginStart: 60 }}
              label={getGroupForPost(groupCode, t)}
              onPress={() => getScreenOfUser(userLogin.roleCodes ?? "")}
              inactiveBackgroundColor={'#fff'}
              pressColor={'#0088ff03'}
            />
          )}

            {isBusiness(userLogin) && (
              <DrawerItem
                style={{ marginStart: 60 }}
                label={getGroupForPost(groupBusiness, t)}
                onPress={() => getScreenOfUser(userLogin.roleCodes ?? "")}
                inactiveBackgroundColor={'#fff'}
                pressColor={'#0088ff03'}
              />
            )}
          </List.Accordion>

        {isStudent(userLogin) && (
          <DrawerItem
            label={t('DrawerContentComponent.userJobApplyProfile')}
            onPress={() => navigation.navigate(MANAGEMENT_JOB_APPLY_SCREEN)}
            inactiveBackgroundColor={'#fff'}
            pressColor={'#0088ff03'}
            labelStyle={{ color: '#0088ff' }}
            icon={({ color, focused, size }) => (
              <FontAwesome6Icon style={{ width: 15 }} name='paste' size={16} color={'#0088ff'} />
            )}
          />
        )}

        <DrawerItem
          label={t('DrawerContentComponent.userJobApplyProfile')}
          onPress={() => { }}
          inactiveBackgroundColor={'#fff'}
          pressColor={'#0088ff03'}
          labelStyle={{ color: '#0088ff' }}
          icon={({ color, focused, size }) => (
            <FontAwesome6Icon style={{ width: 15 }} name='file-lines' size={16} color={'#0088ff'} />
          )}
        />

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
