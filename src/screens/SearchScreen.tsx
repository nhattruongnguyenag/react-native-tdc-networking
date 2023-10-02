import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get('screen')
// man hinh tim kiem
export default function SearchScreen() {
  const [search, setSearch] = useState('')
  const [masterData, setMasterData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [type, setType] = useState('')
  const [qty, setQty] = useState('')
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '--posts--', value: 'posts' },
    { label: '--comments--', value: 'comments' },
    { label: '--albums--', value: 'albums' }
  ]);

  useEffect(() => {
    // document.title = title
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(res => res.json())
      .then(posts => {
        setMasterData(posts)
        setFilterData(posts)
      })
  }, [type])

  const postItems = (item: any, index: any) => {}


  //Render Items
  const renderItem = (item: any, index: any) => {
    return (
      <View
        key={index}
        style={styles.item}>
        <Image
          style={styles.image}
          source={{uri: "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg"}} />
        <Text style={styles.name}
        >{item.title}</Text>
        <TouchableOpacity style={styles.follow} >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
        </TouchableOpacity>
      </View>
    )
  }

  //
  const searchFilter = (txt: any) => {
    if (txt) {
      const newData = masterData.filter(
        function (item: any, index: any) {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
          const textData = txt.toUpperCase();
          const i = itemData.indexOf(textData) > -1;
          return i;
        }
      )
      setFilterData(newData)
      setSearch(txt)

    } else {
      setFilterData(masterData)
      setSearch(txt)
    }
  }

  useEffect(() => {
    setQty(filterData.length + '')

  })

  const show = () => {
    console.log(height - (height * 0.17));
    
  }

  return (
    <View>
      <View style={styles.searchScreen}>
        <View style={styles.operation}>
          <TextInput
            style={styles.search}
            placeholder='Nhập nội dung tìm kiếm...'
            placeholderTextColor='#000000'
            value={search}
            onChangeText={(txt) => searchFilter(txt)}
          ></TextInput>
          <View style={styles.select}>
            <View style={styles.s}>
              <Dropdown
                style={styles.dropDown}
                data={items}
                value={value}
                placeholder='-- Doi tuong --'
                labelField='label'
                valueField='value'
                onChange={item => {
                  setType(item.value)
                }}
              />
            </View>
            <TouchableOpacity style={styles.s1}
              onPress={show}
            >
              <Text>
                <Icon name="search" size={20} color="#ffffff" />
              </Text>
            </TouchableOpacity>
          </View>
          <View >
            <Text style={styles.txt}>Kết quả tìm kiếm ({qty})</Text>
          </View>
        </View>
        <View style={styles.listSearch}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterData}
            renderItem={({ item, index }) => renderItem(item, index)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchScreen: {
    backgroundColor: 'white'
  },
  operation: {
    height: height * 0.17,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
  },
  search: {
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    height: height * 0.06,

  },
  select: {
    flexDirection: 'row',
    paddingTop: 5,
    height: height * 0.06
  },
  txt: {
    height: height * 0.1,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
    marginTop: 10,
    marginLeft: 20
  },
  dropDown: {
    backgroundColor: '#0065ff',
    width: 310,
    borderRadius: 5,
    paddingLeft: 120,
    color: 'white'
  },
  bnt: {
    width: 30,
    height: 30
  },
  listSearch: {
    height: 500,
    resizeMode: 'contain'
  },
  s: {
    flex: 5,
    color: 'white',

  },
  s1: {
    flex: 1,
    backgroundColor: '#0065ff',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f9ff',
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 10,
    borderBottomWidth: 0.9,
    borderBlockColor: 'gray',
  },
  image: {
    flex: 1,
    width: 70,
    height: 70,
    borderRadius: 50,
    paddingVertical: 20,
    borderColor: '#0065ff',
    borderWidth: 1
  },
  name: {
    flex: 3.4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  follow: {
    flex: 1.2,
    height: 30,
    marginRight: 12,
    borderRadius: 5,
    backgroundColor: '#0065ff',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  buttonFollow: {
    backgroundColor: '#f3f9ff',
  }

})
