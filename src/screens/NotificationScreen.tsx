import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';


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
    "name": "John da dang ky thanh cong!!!",
    "time": "1 gio truoc",
    "image": "https://toanthaydinh.com/wp-content/uploads/2020/04/anh-dep-hoa-huong-duong-va-mat-troi_022805970-1-1181x800-6.jpg"
  },
  {
    "id": 3,
    "name": "Cong ty .......... vua dang thong tin tuyen dung ",
    "time": "15 ngay truoc",
    "image": "data:image/jpeg;base64,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"
  },

]

// man hinh hien thi danh sach thong bao
export default function NotificationScreen() {
  //Render Items
  const renderItem = (item: any, index: any) => {
    return (
      <View
        key={index}
        style={styles.item}>
        <Image
          style={styles.image}
          source={{uri:item.image}} />
        <Text style={styles.name}
        >{item.name}</Text>
        <View style={styles.time}>
          <Text style={styles.tg}>{item.time}</Text>

        </View>
      </View>
    )
  }

  return (
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
      <View style={styles.platList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataNew}
          renderItem={({ item, index }) => renderItem(item, index)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffffff',
  },
  select: {
    height: height * 0.04,
    flexDirection: 'row',

    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 18,
  },
  //Text thong báo
  txtN: {
    flex: 3,
    justifyContent: 'center',
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  //Tick read notification
  tick: {
    flex: 4.5,
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
    flex: 1.2,
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
    height: height * 1,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#f3f9ff',
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 15
  },
  image: {
    flex: 1.1,

    height: 74,
    borderRadius: 50,
    paddingVertical: 20,
  },
  name: {
    flex: 3,
    paddingLeft: 15,
    paddingTop: 8,
    color: '#000000',
    fontSize: 17,
  },
  time: {
    flex: 1.4,
    alignItems: 'flex-end',
    paddingTop: 6
  },
  tg: {
    fontSize: 15,
    color: '#B9B6B6',
  }
})