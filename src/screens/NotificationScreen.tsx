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
import { SURVEY_CONDUCT_SCREEN } from '../constants/Screen'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppSelector } from '../redux/Hook'
import { useGetNotificationsUserQuery } from '../redux/Service'
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

  const { data, isFetching } = useGetNotificationsUserQuery(
    {
      id: userLogin?.id ?? -1
    }
  )

  const filter = (data?.data)?.filter(item => (item.content).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/d/g, 'đ').includes(search.toLowerCase().normalize("NFD").replace(/d/g, 'đ')))

  const handleIsRead = (id: any) => {
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

    if (notification && notification.type === NOTIFICATION_CREATE_SURVEY) {
      const data = notification.data.split(':')
      if (data.length >= 2 && data[0] === 'id') {
        const surveyPostId = parseInt(data[1])
        if (!isNaN(surveyPostId)) {
          navigation.navigate(SURVEY_CONDUCT_SCREEN, { surveyPostId: surveyPostId })
        }
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

  const handleListIsRead = () => {
    try {
      axios.put(`${SERVER_ADDRESS}api/notifications/changeStatus/all`, { userId: userLogin?.id })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelSearch = () => {
    setSearch('')
  }

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch)
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
                <Text style={styles.txtTick}>{t('NotificationsComponent.readAll')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.searchBtn}>
              <TouchableOpacity style={styles.searchButton} onPress={handleOpenSearch}>
                <Text>
                  <Icon name='search' size={20} color='#ffffff' />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {openSearch && (
            <View>
              <TextInput
                value={search}
                style={styles.search}
                placeholder={t('NotificationsComponent.search')}
                multiline={true}
                numberOfLines={4}
                onChangeText={(i) => setSearch(i)}
              />
              {search != '' ? (
                <Pressable
                  style={{ position: 'absolute', right: 0, paddingRight: 30, marginTop: 20 }}
                  onPress={handleDelSearch}
                >
                  <Icon2 name='closecircleo' size={18} color='grey' />
                </Pressable>
              ) : null}
            </View>
          )}
        </View>
        {
          search == '' ?
            <NotificationListView data={data?.data}
              handleItem={handleItem}
              handleDelNotification={handleDelNotification}
              handleIsRead={handleIsRead} />
            :
            <NotificationListView data={filter}
              handleItem={handleItem}
              handleDelNotification={handleDelNotification}
              handleIsRead={handleIsRead} />
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
    width: '100%',
    height: 35,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTick: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold'
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
