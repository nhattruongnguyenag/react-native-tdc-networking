import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import {
  Dimensions, Pressable, StyleSheet,
  Text,
  View
} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { RootStackParamList } from '../App'
import NotificationListView from '../components/listviews/NotificationListView'
import { DETAIL_JOB_APPLY, DETAIL_POST_SCREEN, SURVEY_CONDUCT_SCREEN } from '../constants/Screen'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppSelector } from '../redux/Hook'
import { useGetNotificationsUserQuery } from '../redux/Service'
import { ACCEPT_POST, CREATE_SURVEY, POST_LOG, SAVE_POST, UPDATE_POST, USER_APPLY_JOB, USER_COMMENT_POST, USER_CONDUCT_SURVEY, USER_CREATE_WATCH_JOB, USER_LIKE_POST, USER_REPLY_COMMENT } from '../constants/TypeNotification'
import { NotificationModel } from '../types/response/NotificationModel'
import { ActivityIndicator } from 'react-native-paper'
const { height, width } = Dimensions.get('screen')

const NOTIFICATION_CREATE_SURVEY = 'create_survey'

// man hinh hien thi danh sach thong bao
export default function NotificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const t = useTranslation()
  const [arr, setArr] = useState<NotificationModel[]>()
  const [isLoading, setIsLoading] = useState(false)

  const { data, isFetching } = useGetNotificationsUserQuery(
    {
      id: userLogin?.id ?? -1
    },
    {
      pollingInterval: 800
    }
  )

  useEffect(() => {
    setIsLoading(true)
    setArr([])
  }, [userLogin?.id])

  useEffect(() => {
    setArr([])
    if (data) {
      setIsLoading(false)
      setArr(data?.data)
    }
  }, [isFetching])

  const handleIsRead = (id: number) => {
    try {
      axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/makeNotSeen`, {
        id: id,
        userId: userLogin?.id
      })
    } catch (error) {
      console.error('Error updating name:', error)
    }
  }

  const handleDelNotification = (id: number) => {
    try {
      axios.delete(`${SERVER_ADDRESS}api/notifications/`, { data: { id: id, userId: userLogin?.id } })
    } catch (error) {
      console.error('Error updating name:', error)
    }
  }




  const handleItem = (id: number) => {
    const notification = data?.data.find(item => id === item.id)

    if (notification) {
      switch (notification.type) {
        case CREATE_SURVEY:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'create_survey' })
          break
        case SAVE_POST:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'save_post' })
          break
        case USER_LIKE_POST:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'user_like_post' })
          break
        case USER_COMMENT_POST:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'user_comment_post' })
          break
        case USER_REPLY_COMMENT:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'user_reply_comment' })
          break
        case USER_CONDUCT_SURVEY:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'user_conduct_survey' })
          break
        case ACCEPT_POST:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'accept_post' })
          break
        case USER_CREATE_WATCH_JOB:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'user_create_watch_job' })
          break
        case POST_LOG:
          navigation.navigate(DETAIL_POST_SCREEN, { post: notification.dataValue, notificationType: 'post_log' })
          break
        case USER_APPLY_JOB:
          navigation.navigate(DETAIL_JOB_APPLY, { cvId: notification.dataValue.id })
          break
        default:
          navigation.navigate(DETAIL_POST_SCREEN, { post: null, notificationType: '' })
          break
      }
    }
    try {
      axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus`, {
        id: id,
        userId: userLogin?.id
      })
    } catch (error) {
      console.error('Error updating name:', error)
    }
  }

  const handleItemCanNotClick = (id: number) => {
    console.log('123');

    try {
      axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus`, {
        id: id,
        userId: userLogin?.id
      })
    } catch (error) {
      console.error('Error updating name:', error)
    }
  }

  const handleListIsRead = () => {
    try {
      axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/all`, { userId: userLogin?.id })
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <>
      <View style={styles.screen}>

        {/* Select */}
        <View style={[styles.operation, { height: openSearch ? height * 0.168 : height * 0.1 }]}>
          <View style={styles.select}>
            <View style={styles.txtN}>
              <Text style={styles.txt}>{t('NotificationsComponent.notification')}</Text>
            </View>
            <View style={styles.tick}>
              <TouchableOpacity style={styles.tickButton} onPress={handleListIsRead}>
                <Icon name='readme' size={20} color='#ffffff' /><Text style={styles.txtTick}>{t('NotificationsComponent.readAll')}</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
        {

          isLoading ?
            <ActivityIndicator color={'#000000'} style={[{ display: isLoading ? 'flex' : 'none' }, { marginTop: 100 }]} />
            :
            <NotificationListView data={arr}
              handleItem={handleItem}
              handleDelNotification={handleDelNotification}
              handleIsRead={handleIsRead}
              handleItemCanNotClick={handleItemCanNotClick} />
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  operation: {
    justifyContent: 'center'
  },
  select: {
    flexDirection: 'row'
  },
  search: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
    paddingRight: 50,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    height: 40,
    alignItems: 'center'
  },
  //Text thong báo
  txtN: {
    flex: 2.5,
    justifyContent: 'center',
    paddingLeft: 15
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  //Tick read notification
  tick: {
    flex: 3,
    justifyContent: 'center',
    marginRight: 15
  },
  tickButton: {
    backgroundColor: '#0065ff',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 35,
    borderRadius: 6,
    alignItems: 'center'
  },
  txtTick: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  //Search
  searchBtn: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5
  },
  searchButton: {
    backgroundColor: '#0065ff',
    width: '90%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
})
