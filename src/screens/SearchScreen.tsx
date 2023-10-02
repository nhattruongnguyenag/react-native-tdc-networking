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
  const [type, setType] = useState('posts')
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

  const postItems = (item: any, index: any) => { }


  //Render Items
  const renderItem = (item: any, index: any) => {
    return (
      <View
        key={index}
        style={styles.item}>
        <View style={styles.item2}>
          <Image
            style={styles.image}
            source={{ uri: "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg" }} />
          <Text style={styles.name}
          >{item.title}</Text>

        </View>
        <View>
          {
            item.title ?
              (<TouchableOpacity style={styles.follow} >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
              </TouchableOpacity>)
              : 
              (<View><Icon name="dots-three-vertical" size={20} color="#000000" /></View>)
          }

        </View>

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
            <View style={styles.drop}>
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
            <TouchableOpacity style={styles.btnSearch}>
              <Text>
                <Icon name="search" size={20} color="#ffffff" />
              </Text>
            </TouchableOpacity>
          </View>
          <View >
            <Text style={styles.txt}>Kết quả tìm kiếm ({qty})</Text>
          </View>
        </View>
        <View style={styles.listSearch}>

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
    borderRadius: 5,
    color: 'white',
    height: 35,
    justifyContent: 'center'
  },
  
  listSearch: {
    height: height * 0.66,
    resizeMode: 'contain',
  },
  drop: {
    flex: 5,
    color: 'white',

  },
  btnSearch: {
    flex: 1,
    backgroundColor: '#0065ff',
    height: 35,
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
    marginRight: 12,
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
  a: {
    flex: 1.2,
  }

})
