import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SEACRH_SCREEN } from '../constants/Screen';
import { SERVER_ADDRESS } from '../constants/SystemConstant';


const { height, width } = Dimensions.get('screen')

// man hinh hien thi danh sach thong bao
export default function NotificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  // const [menuRef, setMenuRef] = useState<Menu | null>()
  const [data, setData] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [openListIsRead, setOpenListIsRead] = useState(false)
  const [userId, setUserId] = useState()


  useEffect(() => {
    axios.get(`${SERVER_ADDRESS}/api/notifications`)
      .then(res => {
        const respo = res.data.data;
        setData(respo)

      })
      .catch(error => console.log(error));
  }, [])


  const handleIsRead = (isId: any, userId: any) => {
    try {
      axios.put(`${SERVER_ADDRESS}/api/notifications/changeStatus`, {
        id: isId,
        userId: userId
      })
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  const handleDelNotification = (id: number, userId: number) => {
    // console.log(id + ':', userId);
    try {
      axios.delete(`${SERVER_ADDRESS}/api/notifications/`, {data: {id: id, userId: userId}})
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  const handleItem = (id: number) => {
    navigation.navigate(SEACRH_SCREEN, {id: id})
    
  }
  const handleListIsRead = () => {
    console.log('write');
  }

  //Render Items
  const renderItem = (item: any, index: any) => {
    return (
      <View>
        <Pressable
          onPress={() => handleItem(item.id)}
          key={index}
          style={[styles.item, { backgroundColor: item.status === '0' ? '#ffffff' : '#f3f9ff' }]}>
          <View style={styles.cont}>
            <Image
              style={styles.image}
              source={{ uri: item.image }} />
            <View style={styles.content}>
              <Text style={styles.name}>{item.content}</Text>
              <Text style={styles.tg}>{item.time}</Text>
            </View>
          </View>
          <Menu style={styles.menu}
            key={item.id}
            onOpen={() => setMenuOpen(true)
            }
            onClose={() => setMenuOpen(false)
            }
          // ref={(ref) => {
          //   setMenuRef(ref)
          // }}
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
          <View style={styles.search}>
            <TouchableOpacity style={styles.searchButton}>
              <Text>
                <Icon name="search" size={20} color="#ffffff" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}
        <ScrollView style={styles.platList}>
          {
            data !== null ? (
              data.map((item, index) => (
                renderItem(item, index)
                // <Text>{JSON.stringify(data)}</Text>
              ))
            ) : null
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
  select: {
    flexDirection: 'row',
    height: 70,
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
  search: {
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
    fontSize: 17
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
