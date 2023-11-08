import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { Post } from '../types/Post';
import SavePostListView from '../components/listviews/SavePostListView';


const ListPostSavedScreen = () => {
  const [data, setData] = useState<Post[]>([])
  const [dataType, setDataType] = useState<Post[]>([])
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false);
  const [type, setType] = useState('all')
  const [items, setItems] = useState([
    {
      label: 'Tất cả',
      value: 'all',
    },
    {
      label: 'Bài viết',
      value: 'thong-thuong',
    },
    {
      label: 'Khảo sát',
      value: 'khao-sat',
    },
    {
      label: 'Tin tuyển dụng',
      value: 'tuyen-dung',
    }
  ])

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}api/posts/user/save/12`)
      .then((response) => {
        setData(response.data.data)
      })
    getDataFollowType()
  }, [type])


  const getDataFollowType = () => {
    let dt = []
    for (let index = 0; index < data.length; index++) {
      if (data[index].type == type) {
        dt.push(data[index])
      }
    }
    setDataType(dt)
  }

  return (
    <View style={styles.searchScreen}>

      <View style={styles.operation}>
        <Dropdown
          style={[styles.dropDown, isFocus && { borderColor: 'blue' }]}
          data={items}
          labelField="label"
          valueField="value"
          placeholder={items[0].label}
          value={value}
          onChange={item => {
            setType(item.value)
            setDataType([])
          }}
        />
      </View>
      <SavePostListView data={data} dataType={dataType} type={type}/>
    </View>
  )
}

const styles = StyleSheet.create({
  searchScreen: {
    backgroundColor: 'white',
    flex: 1
  },
  operation: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  dropDown: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
})

export default ListPostSavedScreen