import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  Vibration,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import axios from 'axios'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import { TEXT_NOTIFICATION, TEXT_NOTIFICATION_ALL_READ, TEXT_NOTIFICATION_DELETE, TEXT_NOTIFICATION_NOT_READ } from '../constants/StringVietnamese'
import moment from 'moment'
import { useTranslation } from 'react-multi-lang'
import { useGetNotificationsUserQuery } from '../redux/Service'
import NotificationItem from '../components/items/NotificationItem'
import NotificationListView from '../components/listviews/NotificationListView'
const { height, width } = Dimensions.get('screen')

// man hinh hien thi danh sach thong bao
export default function NotificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
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
    try {
      // navigation.navigate('Man hinh muon den', { id: id })
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
            <NotificationListView data={data?.data} handleItem={handleItem} handleDelNotification={handleDelNotification} handleIsRead={handleIsRead} />
            :
            <NotificationListView data={filter} handleItem={handleItem} handleDelNotification={handleDelNotification} handleIsRead={handleIsRead} />
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
