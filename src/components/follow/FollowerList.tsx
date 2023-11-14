import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/Hook'
import { Client, Frame } from 'stompjs'
import { getStompClient } from '../../sockets/SocketClient'
import FollowListView from '../../components/listviews/FollowListView'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { onFocus } from '@reduxjs/toolkit/dist/query/core/setupListeners'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/AntDesign'


let stompClient: Client
const FollowerList = () => {
  const [data, setData] = useState([])
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const isFocused = useIsFocused()
  const [search, setSearch] = useState('')


  useEffect(() => {
    stompClient = getStompClient()
    const onConnected = () => {
      stompClient.subscribe(`/topic/user/detail/follow/follower`, onMessageReceived)
      stompClient.send(
        `/app/user/detail/follow/follower`,
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
  }, [isFocused])


  const handleFollow = (userFollowId: number) => {
    stompClient.send(
      `/app/user/detail/follow/follower`,
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

  const getDataSearch = (i: string) => {
    setSearch(i)
    stompClient.send(
      `/app/user/detail/follow/follower/search`,
      {},
      JSON.stringify({
        userId: 12,
        search: search
      })
    )
  }

  return (
    <View>
      <View style={styles.search}>
        <TextInput
          value={search}
          style={styles.txt_input} placeholder='Tìm kiếm ...'
          onChangeText={(i) => getDataSearch(i)}
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
      <FollowListView data={data} handleFollow={handleFollow} />
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
  }
})
export default FollowerList