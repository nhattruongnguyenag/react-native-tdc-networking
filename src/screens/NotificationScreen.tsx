import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Pressable, Vibration, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import axios from 'axios'
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const { height, width } = Dimensions.get('screen')

// man hinh hien thi danh sach thong bao
export default function NotificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  // const [menuRef, setMenuRef] = useState<Menu | null>()
  const [data, setData] = useState([]);
  const [dataIsRead, setDataIsRead] = useState([])
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [filterData, setFilterData] = useState([]);

  const callData = () => {
    axios.get(`${SERVER_ADDRESS}/api/notifications/user/12`)
      .then(res => {
        const respo = res.data.data;
        setData(respo)
      })
      .catch(error => console.log(error));
  }
  useEffect(() => {
    callData()
  }, [])

  useEffect(() => {
    axios.get(`${SERVER_ADDRESS}/api/notifications/find?content=${search}`)
      .then(res => {
        const respo = res.data.data
        setFilterData(respo)
      })
  }, [search])

  const handleIsRead = (id: any, userId: any) => {
    try {
      axios.put(`${SERVER_ADDRESS}/api/notifications/changeStatus/makeNotSeen`, {
        id: id,
        userId: userId
      })
      callData()
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  const handleDelNotification = (id: number, userId: number) => {

    try {
      axios.delete(`${SERVER_ADDRESS}/api/notifications/`, { data: { id: id, userId: userId } })
      callData()
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  const handleItem = (id: number, userId: number) => {
    try {
      // navigation.navigate('Man hinh muon den', { id: id })
      axios.put(`${SERVER_ADDRESS}/api/notifications/changeStatus`, {
        id: id,
        userId: userId
      })
      callData()
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  const handleListIsRead = () => {
    try {
      axios.put(`${SERVER_ADDRESS}/api/notifications/changeStatus/all`, { userId: 12 })
      callData()
    }
    
    catch(error) {
     console.log(error)}
  }

  const handleDelSearch = () => {
    setSearch('')
  }

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  }

  //Render Items
  const renderItem = (item: any, index: any) => {
    return (
      <View>
        <Pressable
          onPress={() => handleItem(item.id, item.user.id)}
          key={index}
          style={[styles.item, { backgroundColor: item.status === '1' ? '#ffffff' : '#f3f9ff' }]}>
          <View style={styles.cont}>
            <Image
              style={styles.image}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7h13cetHlwG784hz57YxCRBAfacOVhCmPrt0EoVRAcg&s' }} />
            <View style={styles.content}>
              <Text style={styles.name}>{item.content}</Text>
              <Text style={styles.tg}>15 phut truoc</Text>
            </View>
          </View>
          <Menu style={styles.menu}
            key={item.id}
            onOpen={() => setMenuOpen(true)
            }
            onClose={() => setMenuOpen(false)
            }
          >
            <MenuTrigger
            >
              <Icon1 name="dots-three-vertical" size={17} color="#000000" />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{ marginLeft: 50, marginTop: 25, borderRadius: 10 }}>
              <MenuOption
                onSelect={() => handleDelNotification(item.id, item.user.id)}
              >
                <Text style={styles.option}>Xóa thông báo</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => handleIsRead(item.id, item.user.id)}
              >
                <Text style={styles.option}>Đánh dấu chưa đọc</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </Pressable>
      </View>
    )
  }

  return (
    <>
      <View style={styles.screen}>
        {/* Select */}
        <View style={[styles.operation, { height: openSearch ? height * 0.168 : height * 0.1 }]}>
          <View style={styles.select}>
            <View style={styles.txtN}>
              <Text style={styles.txt}>Thông báo</Text>
            </View>
            <View style={styles.tick}>
              <TouchableOpacity style={styles.tickButton}
                onPress={handleListIsRead}
              >
                <Text style={styles.txtTick}>
                  Đánh dấu tất cả đã đọc
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.searchBtn}>
              <TouchableOpacity style={styles.searchButton}
                onPress={handleOpenSearch}
              >
                <Text>
                  <Icon name="search" size={20} color="#ffffff" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {openSearch && (<View >
            <TextInput
              value={search}
              style={styles.search}
              placeholder='Tìm kiếm thông báo...'
              multiline={true}
              numberOfLines={4}
              onChangeText={(i) => setSearch(i)}
            />
            {
              search != '' ?
                (<Pressable
                  style={{ position: 'absolute', right: 0, paddingRight: 30, marginTop: 20 }}
                  onPress={handleDelSearch}>
                  <Icon2 name="closecircleo" size={18} color="grey" />
                </Pressable>) : null
            }

          </View>)}

        </View>
        {/*  */}
        <ScrollView style={styles.platList}>
          {
            search === '' ?
              (data !== null ? (
                data.map((item, index) => (
                  renderItem(item, index)
                ))
              ) : null)
              :
              (
                filterData.map((item, index) => (
                  renderItem(item, index)
                ))
              )
          }
        </ScrollView >
      </View >
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
    flexDirection: 'row',
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
  //Flatlist
  platList: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    // backgroundColor: '#f3f9ff',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 15,
    borderBottomWidth: 0.8,
    borderBottomColor: 'grey'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    paddingVertical: 20,
    borderColor: '#0065ff',
    borderWidth: 1
  },
  cont: {
    flexDirection: 'row'
  },
  content: {
    paddingTop: 8,
    paddingLeft: 10,
    width: '80%',
  },
  name: {
    color: '#000000',
    fontSize: 17,
  },
  tg: {
    fontSize: 15,
    color: '#B9B6B6',
    paddingBottom: 0
  },
  menu: {
    justifyContent: 'center',
  },
  option: {
    fontSize: 15,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
  }

})
