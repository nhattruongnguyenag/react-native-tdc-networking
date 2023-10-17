import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { useEffect, useState, useCallback } from "react";
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';




const { height, width } = Dimensions.get('screen')
// man hinh tim kiem
export default function SearchScreen() {
  //Danh sach tim kiem
  const [masterData, setMasterData] = useState([])
  //Kieu du lieu
  const [search, setSearch] = useState('')
  const [subjects, setSubjects] = useState('user')
  const [type, setType] = useState('sinh-vien')
  const [qty, setQty] = useState(0)
  let URL = `${SERVER_ADDRESS}api/find/${subjects}`
  //Xu ly dropdown
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState('Người dùng')
  const [label2, setLabel2] = useState('- - Sinh viên - -')
  const [items, setItems] = useState([
    { label: 'Người dùng', value: 'user', children: [{ label: '- - Sinh viên - -', value: 'sinh-vien' }, { label: '- - Doanh nghiệp - -', value: 'doanh-nghiep' }, { label: '- - Khoa - -', value: 'khoa' }] },
    { label: 'Bài viết', value: 'post', children: [{ label: '- - Bài viết - -', value: 'thong-thuong' }, { label: '- - Khảo sát - -', value: 'khao-sat' }, { label: '- - Tin tuyển dụng - -', value: 'tuyen-dung' }] }
  ]);



  const handleSearch = () => {
    try {
      // console.log(subjects + '-' + type + '-' + search);
      axios.post(URL, {
        userId: 1,
        type: type,
        name: search
      }).then(res => {
        setMasterData(res.data.data);
        setQty(masterData.length)
        console.log(masterData.length);
        setSearch('')
      })
    } catch (error) {
      console.error('Lỗi trong quá trình tìm kiếm: ', error);
    }
  };

  
  //Render Posts Item
  const postItems = (item: any, index: any) => {
    
    return (
      <View
        key={index}
        style={styles.itemPost1}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 70, height: 70, borderRadius: 50, borderWidth: 1.5, borderColor: '#48AF7B' }}
            source={{ uri: "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg" }} />
          <View style={{ marginLeft: 10, width: '75%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#5A5F5C' }}>{item.user.name}</Text>
            <Text>{(item.content).length > 120 ? `${item.content.substring(0, 120)}...` : item.content}</Text>
          </View>
        </View>
        {/* <MenuProvider> */}
        <Menu
          key={item.id}
        >
          <MenuTrigger>
            <View style={{ paddingTop: 15 }}><Icon1 name="dots-three-vertical" size={18} color="#000000" /></View>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={styles.menuOption}
          >
            <MenuOption
            >
              <Text style={styles.menuText}>Xem chi tiết</Text>
            </MenuOption>
            <MenuOption
            >
              <Text style={styles.menuText}>Lưu</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        {/* </MenuProvider> */}

      </View>

    )
  }

const handleFollow = (userFollowId: number) => {
    console.log(userFollowId);

    try {
      axios.post(`${SERVER_ADDRESS}/api/users/follow`, {
        userFollowId: userFollowId,
        userId: 12,
      })
      
    } catch (error) {
      console.error('Lỗi trong quá trình follow: ', error);
    }
  }

  const isFollowed = (item: any) => {
    return (
      <Menu
        key={item.id}
      >
        <MenuTrigger>
          <View style={{ paddingTop: 10 }}><Icon1 name="dots-three-vertical" size={18} color="#000000" /></View>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={styles.menuOption}
        >
          <MenuOption
          >
            <Text style={styles.menuText}>Trang cá nhân</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => handleFollow(item.id)}
          >
            <Text style={styles.menuText}>Hủy theo dõi</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    )
  }

  const isNotFollow = (item: any) => {
    return (

      <TouchableOpacity style={styles.follow}
        onPress={() => handleFollow(item.id)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
      </TouchableOpacity>
    )
  }

  //Render Items(Users, Business)
  const renderItem = (item: any, index: any) => {
    return (
      <Pressable
        key={index}
        style={styles.item}>
        <View style={styles.item2}>
          <Image
            style={styles.image}
            source={{ uri: "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg" }} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View>
          {
            item.isFollow ?
              (
                isFollowed(item)
              )
              :
              (
                isNotFollow(item)
              )
          }
        </View>
      </Pressable>
    )
  }
  const checkType = () => {
    switch (type) {
      case 'sinh-vien':
        return masterData.map((item, index) => renderItem(item, index));
        break;
      case 'doanh-nghiep':
        return masterData.map((item, index) => renderItem(item, index));
        break;
      case 'khoa':
        return masterData.map((item, index) => renderItem(item, index));
        break;
      case 'thong-thuong':
        return masterData.map((item, index) => postItems(item, index));
        break;
      case 'khao-sat':
        return masterData.map((item, index) => postItems(item, index));
        break;
      case 'tuyen-dung':
        return masterData.map((item, index) => postItems(item, index));
        break;
      default:
        console.log('...');
    }
  }
  return (
    <View style={styles.searchScreen}>
      <View style={styles.operation}>
        <TextInput
          style={styles.search}
          placeholder='Nhập nội dung tìm kiếm...'
          placeholderTextColor='#000000'
          value={search}
          onChangeText={(txt) => setSearch(txt)}
        ></TextInput>
        <View style={styles.select}>
          <View style={styles.drop}>
            <Dropdown
              style={styles.dropDown}
              data={items}
              value={value}
              placeholder={label}
              labelField='label'
              valueField='value'
              onChange={item => {
                setMasterData([])
                setQty(0)
                setLabel(item.label)
                setSubjects(item.value)
                setType(item.label === 'Bài viết' ? items[1].children[0].value : items[0].children[0].value)
                setLabel2(item.label === 'Bài viết' ? items[1].children[0].label : items[0].children[0].label)
              }}
            />
            <Dropdown
              style={[styles.dropDown2]}
              data={
                label === 'Bài viết' ? items[1].children : items[0].children
              }
              value={value}
              placeholder={label2}
              labelField='label'
              valueField='value'
              onChange={item => {
                setType(item.value)
              }}
            />
          </View>
          <TouchableOpacity style={styles.btnSearch}
            onPress={handleSearch}
          >
            <Text>
              <Icon name="search" size={25} color="#ffffff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <MenuProvider
      
      >
        <ScrollView >
          <Text style={styles.qty}>Kết quả tìm kiếm ({qty})</Text>
          {
            checkType()
          }
        </ScrollView>
      </MenuProvider>

    </View>
  )
}

const styles = StyleSheet.create({
  menuText: {
    fontSize: 15
  },
  menuOption: {
    marginTop: 20, borderRadius: 10, paddingLeft: 10, width: 130, marginLeft: -15, paddingTop: 10, paddingBottom: 10
  },
  searchScreen: {
    backgroundColor: 'white',
    flex: 1
  },
  operation: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 50,
    height: 90
  },
  search: {
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    height: 45,
    paddingLeft: 10
  },
  select: {
    flexDirection: 'row',
    paddingTop: 5,

  },
  qty: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
    marginLeft: 15,
    marginBottom: 10
  },
  dropDown: {
    backgroundColor: '#0065ff',
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center',
    paddingLeft: 10
  },
  dropDown2: {
    backgroundColor: '#0065ff',
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 3
  },
  drop: {
    flex: 5,
    color: 'white',

  },
  btnSearch: {
    flex: 1,
    backgroundColor: '#0065ff',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 5
  },
  itemPost1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // borderBottomWidth: 0.9,
    // borderBottomColor: 'gray',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.9,
    borderBottomColor: 'gray'
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    paddingVertical: 20,
    borderColor: '#0065ff',
    borderWidth: 1
  },
  name: {
    paddingRight: 10,
    paddingLeft: 10,
    width: '62%',
    fontSize: 17,
    color: '#5A5F5C',
    fontWeight: 'bold'
  },
  follow: {
    height: 30,
    // marginRight: 12,
    borderRadius: 5,
    backgroundColor: '#0065ff',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonFollow: {
    backgroundColor: '#f3f9ff'
  }
})
