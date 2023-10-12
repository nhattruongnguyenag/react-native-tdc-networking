import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { useEffect, useState, useCallback } from "react";
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import axios from 'axios';



const { height, width } = Dimensions.get('screen')
// man hinh tim kiem
export default function SearchScreen() {
  const [search, setSearch] = useState('')
  const [masterData, setMasterData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [type, setType] = useState('')
  const [qty, setQty] = useState('')
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState('Nguoi dung')
  const [indexType, setIndexType] = useState()
  const [items, setItems] = useState([
    { label: 'Nguoi dung', value: 'nguoi-dung', children: [{ label: 'Sinh viên', value: 'sinh-vien' }, { label: 'Doanh nghiệp', value: 'doanh-nghiep' }] },
    { label: 'Bài viết', value: 'bai-viet', children: [{ label: 'Bai viet', value: 'bai-viet' }, { label: 'khao sat', value: 'khao sat' }] }
  ]);

  const handleSearch = async () => {
    try {
      console.log(type + ' - ' + search)
      await axios.post(`${SERVER_ADDRESS}/api/find/user`, {
        type: type,
        name: search
      }).then(res => {
        setMasterData(res.data.data);
        setSearch('')
      })
    } catch (error) {
      console.error('Lỗi trong quá trình tìm kiếm: ', error);
    }
  };



  useEffect(() => {
    console.log(type)
    setG()
  }, [type])
  //Render Posts Item
  const postItems = (item: any, index: any) => { }


  //Render Items(Users, Business)
  const renderItem = (item: any, index: any) => {
    return (
      <View
        key={index}
        style={styles.item}>
        <View style={styles.item2}>
          <Image
            style={styles.image}
            source={{ uri: "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg" }} />
          <Text style={styles.name}>{index + ". " + item.name}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.follow} >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
          </TouchableOpacity>
          {/* {
            item.title ?
              (<TouchableOpacity style={styles.follow} >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
              </TouchableOpacity>)
              :
              (<View><Icon name="dots-three-vertical" size={20} color="#000000" /></View>)
          } */}

        </View>

      </View>
    )
  }


  useEffect(() => {
    setQty(filterData.length + '')
  })

  const setG = () => {
    for (let index = 0; index < items.length; index++) {
      if (items[index].label === label) {
        return index

      }
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
                setLabel(item.label)
              }}
            />
            <Dropdown
              style={[styles.dropDown2]}
              data={
                label === 'Bài viết' ? items[1].children : items[0].children
                // setG()

              }
              value={value}
              placeholder='doi tuong...'
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

      {/* <ScrollView >
        <Text style={styles.qty}>Kết quả tìm kiếm ({qty})</Text>
        {
          masterData.map((item, index) => renderItem(item, index))
        }
      </ScrollView> */}

    </View>
  )
}

const styles = StyleSheet.create({
  searchScreen: {
    backgroundColor: 'white',
    flex: 1
  },
  operation: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 50,
    height: 50
  },
  search: {
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    height: 40,
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
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10

  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
    borderBottomWidth: 0.9,
    borderBottomColor: 'gray',
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
    paddingLeft: 10,
    paddingRight: 10,
    width: '62%',
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
    paddingRight: 10,

  },
  buttonFollow: {
    backgroundColor: '#f3f9ff',
  },

})
//
// const searchFilter = (txt: any) => {
//   if (txt) {
//     const newData = masterData.filter(
//       function (item: any, index: any) {
//         const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
//         const textData = txt.toUpperCase();
//         const i = itemData.indexOf(textData) > -1;
//         return i;
//       }
//     )
//     setFilterData(newData)
//     setSearch(txt)

//   } else {
//     setFilterData(masterData)
//     setSearch(txt)
//   }
// }