import { Dimensions, StyleSheet, Text, View, Button, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { Post } from '../types/Post';
import SavePostListView from '../components/listviews/SavePostListView';
import { Client, Frame } from 'stompjs';
import { useAppSelector } from '../redux/Hook';
import { LikeAction } from '../types/LikeActions';
import { getStompClient } from '../sockets/SocketClient';
import { RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomizePost from '../components/post/CustomizePost';
import { TEXT_SEARCH, TYPE_POST_BUSINESS } from '../constants/StringVietnamese';
import { useTranslation } from 'react-multi-lang';
import { useGetListPostSavedQuery } from '../redux/Service';

let stompClient: Client
const ListPostSavedScreen = () => {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState(null)
  const t = useTranslation()

  const { data, isFetching } = useGetListPostSavedQuery(userLogin ? userLogin.id : -1, {
    pollingInterval: 1000
  })
  const filter = (data?.data)?.filter(item => item.type == 'thong-thuong' ? (item.content).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/d/g, 'đ').includes(search.toLowerCase().normalize("NFD").replace(/d/g, 'đ')) : item.title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/d/g, 'đ').includes(search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/d/g, 'đ')))

  const likeAction = () => {
    axios
      .post(`${SERVER_ADDRESS}api/posts/like`, {
        postId: 1,
        userId: 1
      })
  }

  return (
    <View style={styles.searchScreen}>
      <View style={styles.search}>
        <TextInput
          value={search}
          style={styles.txt_input} placeholder={t('SavedPostListComponent.search')}
          onChangeText={(i) => setSearch(i)}
        />
        <Icon style={styles.btn_search} name='search' size={22} color='#000000' />
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl
        refreshing={false}
        onRefresh={() => data}
      />}
      >
        {
          search == '' ?
            <SavePostListView data={data?.data}/>
            : 
            <SavePostListView data={filter}/>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

  search: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '95%',
    height: 40,
    backgroundColor: '#E6E6E6',
    borderRadius: 50,
    justifyContent: 'center',
  },
  txt_input: {
    paddingLeft: 40
  },
  btn_search: {
    position: 'absolute',
    paddingLeft: 10,
    color: '#7A7A7A'
  },
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