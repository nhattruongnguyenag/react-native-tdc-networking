import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppDispatch, useAppSelector } from '../redux/Hook'
import UserItem from "../components/items/UserItem";
import { MenuProvider } from 'react-native-popup-menu'

import { Client, Frame, Message } from 'stompjs'
import { getStompClient } from '../sockets/SocketClient'

let stompClient: Client

const ListFollowScreen = () => {
  // const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([
    {
      label: 'Đang theo dõi',
      value: 'following',
    },
    {
      label: 'Đang theo dõi bạn',
      value: 'follower'
    }
  ])
  const [type, setType] = useState('following')
  const [data, setData] = useState([])


  // useEffect(() => {
  //   console.log('hello');
  //   axios.post(`${SERVER_ADDRESS}api/users/follow/${type}`, {
  //     id: 12,
  //   }).then(response => {
  //     setData(response.data.data)
  //     // console.log(data);
  //   })
  // }, [type])

  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/user/detail/follow/${type}`, onMessageReceived)
      stompClient.send(
        `/app/user/detail/follow/${type}`,
        {},
        JSON.stringify({
          userId: 12,
        })
      )
    }
    const onMessageReceived = (payload: any) => {
      setData(JSON.parse(payload.body))
    }
    const onError = (err: string | Frame) => {
      console.log('Loi ko lay dc du lieu')
    }
    stompClient.connect({}, onConnected, onError)
  }, [type])



  const handleFollow = (userFollowId: number) => {
    console.log('Alo');
    
    stompClient.send(
      `/app/user/detail/follow/${type}`,
      {},
      JSON.stringify({
        userId: 12,
        userFollowId: userFollowId
      })
    )
  }

  const handleDelSearch = () => {
    setSearch('')
  }


  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.follow}>
          {
            items.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.following,
                  type === tab.value ? styles.click : styles.noClick]}
                onPress={() => {
                  // onNavigate(tab.value)
                  setType(tab.value)
                }}
              >
                <Text style={[styles.txt_following, type === tab.value ? { color: '#033C9B' } : {}]}>{tab.label}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.search}>
          <TextInput
            value={search}
            style={styles.txt_input} placeholder='Tìm kiếm ...'
            onChangeText={(i) => setSearch(i)}
          />
          <Icon style={styles.btn_search} name='search' size={22} color='#000000' />
          {search != '' ? (
            <Pressable
              style={{ position: 'absolute', right: 0, paddingRight: 20, marginTop: 20 }}
              onPress={handleDelSearch}
            >
              <Icon2 name='closecircleo' size={18} color='grey' />
            </Pressable>
          ) : null}
        </View>
      </View>
      <MenuProvider>
        <ScrollView >
          {
            data !== null
              ? data.map((item: any) => <UserItem id={item.id} name={item.name} image={item.image} isFollow={item.isFollow} handleFollow={handleFollow} />)
              : null
          }
        </ScrollView>
      </MenuProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20,
  },
  follow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  following: {
    width: 180,
    height: 40,
    backgroundColor: '#DBDBDB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  noClick: {
    backgroundColor: '#DBDBDB',
  },

  click: {
    backgroundColor: '#CCE7F8',
    color: '#033C9B',
    borderWidth: 2,
    borderColor: '#002667'

  },
  // followed: {
  //   width: 183,
  //   height: 40,
  //   backgroundColor: '#DBDBDB',
  //   borderRadius: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: 10
  // },
  txt_following: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  search: {
    width: '100%',
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
  }
})

export default ListFollowScreen