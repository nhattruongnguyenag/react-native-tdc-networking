import { Dimensions, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Pressable, Vibration } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import { SERVER_ADDRESS } from '../constants/SystemConstant';

import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';


const { height, width } = Dimensions.get('screen')
const dataNew = [
  {
    "id": 1,
    "name": "Ban da dang ky thanh cong!!!",
    "time": "1 phut truoc",
    "image": "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg"
  },
  {
    "id": 2,
    "name": "John da dang ky thanh cong!!",
    "time": "2 gio truoc",
    "image": "https://toanthaydinh.com/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg"
  },
  {
    "id": 3,
    "name": "Cong ty .......... vua dang thong tin tuyen dung ",
    "time": "3 ngay truoc",
    "image": "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
  },
  {
    "id": 4,
    "name": "Ban da dang ky thanh cong!!!",
    "time": "4 phut truoc",
    "image": "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg"
  },
  {
    "id": 5,
    "name": "John da dang ky thanh cong!!",
    "time": "5 gio truoc",
    "image": "https://toanthaydinh.com/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg"
  },
  {
    "id": 6,
    "name": "Cong ty .......... vua dang thong tin tuyen dung ",
    "time": "6 ngay truoc",
    "image": "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
  },
  {
    "id": 7,
    "name": "Ban da dang ky thanh cong!!!",
    "time": "7 phut truoc",
    "image": "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg"
  },
  {
    "id": 8,
    "name": "John da dang ky thanh cong!!",
    "time": "8 gio truoc",
    "image": "https://toanthaydinh.com/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg"
  },

  {
    "id": 9,
    "name": "John da dang ky thanh cong!!",
    "time": "9 gio truoc",
    "image": "https://toanthaydinh.com/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg"
  },



]

// man hinh hien thi danh sach thong bao
export default function NotificationScreen() {
  const [menuRef, setMenuRef] = useState<Menu | null>()
  const [isMenuOpen, setMenuOpen] = useState(false)

  // useEffect(() => {
  //   // document.title = title
  //   fetch(`${SERVER_ADDRESS}/api/notifications`)
  //     .then(res => res.json())
  //     .then(posts => {
  //       console.log(posts);

  //     })
  // }, [])

  const handleMenu = () => {

  }



  //Render Items
  const renderItem = (item: any, index: any) => {
    return (
      <View>
        <Pressable 
            style={{ backgroundColor: isMenuOpen ? '#f6f6f6' : '#000000'}}
            onLongPress={() => {
              console.log(item.id)
              
              Vibration.vibrate(75)
              menuRef?.open()
            }}
        >
          
        <View
          key={index}
          style={styles.item}>
          <View style={styles.cont}>

            <Image
              style={styles.image}
              source={{ uri: item.image }} />
            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.tg}>{item.time}</Text>
            </View>
          </View>

          <Menu style={styles.menu}
            key={item.id}
            onOpen={() => setMenuOpen(true)
            }
            onClose={() => setMenuOpen(false)
            }
            ref={(ref) => {
              setMenuRef(ref)
            }}
          >
            <MenuTrigger
            >
              <Icon1 name="dots-three-vertical" size={17} color="#000000" />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{ marginLeft: 50, marginTop: 25, borderRadius: 10 }}>
              <MenuOption>
                <Text style={styles.option}>Xóa thông báo</Text>
              </MenuOption>
              <MenuOption>
                <Text style={styles.option}>Đánh dấu chưa đọc</Text>
              </MenuOption>
              <MenuOption>
                <Text style={styles.option}>Báo cáo</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
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
            <TouchableOpacity style={styles.tickButton}>
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
        {/* Flatlist */}
        <ScrollView style={styles.platList}>
          {
            dataNew.map((item, index) => renderItem(item, index))
          }
        </ScrollView>
      </View>
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
    marginRight: 15,
  },
  tickButton: {
    backgroundColor: '#0065ff',
    width: '100%',
    height: 35,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTick: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
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
    borderRadius: 6,
  },
  //Flatlist
  platList: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: '#f3f9ff',
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