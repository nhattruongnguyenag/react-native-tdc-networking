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
import CustomizeHeaderFollow from '../components/follow/CustomizeHeaderFollow'


const ListFollowScreen = () => {
  // const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([
    {
      label: 'Đang theo dõi',
      value: 'me',
    },
    {
      label: 'Đang theo dõi bạn',
      value: 'other'
    }
  ])
  const [type, setType] = useState('me')
  const [data, setData] = useState([])
  console.log(items);
  

  useEffect(() => {
    axios.post(`${SERVER_ADDRESS}api/users/follow/${type}`, {
      id: 12,
    }).then(response => {
      setData(response.data.data)
      // console.log(data);
    })
  }, [type])

  // useEffect(() => {
  //   stompClient = getStompClient()
  //   const onConnected = () => {
  //     stompClient.subscribe(`/topic/find/${subjects}`, onMessageReceived)
  //   }
  //   const onMessageReceived = (payload: any) => {
  //     console.log(payload.body)
  //     setMasterData(JSON.parse(payload.body))
  //     setQty(masterData.length)
  //     setSearch('')
  //   }
  //   const onError = (err: string | Frame) => {
  //     console.log(err)
  //   }
  //   stompClient.connect({}, onConnected, onError)
  // }, [])

  const handleFollow = (userFollowId: number) => {
    // stompClient.send(
    //   `/app/find/user/follow`,
    //   {},
    //   JSON.stringify({
    //     userId: userLogin?.id,
    //     type: type,
    //     name: search,
    //     userFollowId: userFollowId
    //   })
    // )
  }

  const handleDelSearch = () => {
    setSearch('')
  }


  return (
    <View style={styles.screen}>
      {/* <View style={styles.container}>
        <View style={styles.follow}>
          {
            items.map((tab) => (
              <TouchableOpacity
                style={[
                  styles.following,
                  type === tab.value ? styles.click : styles.noClick]}
                onPress={() => setType(tab.value)}
              >
                <Text style={[styles.txt_following, type === tab.value ? {color: '#033C9B'} : {}]}>{tab.label}</Text>
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
      </View> */}
      <CustomizeHeaderFollow
        search={search}
        setSearch={setSearch}
        items={items}
        type={type}
        setType={setType}
        handleDelSearch={handleDelSearch}
      />
      <MenuProvider>
        <ScrollView >
          {
            data.map((item: any, index) => <UserItem id={item.id} name={item.name} image={item.image} isFollow={item.isFollow} handleFollow={handleFollow} />)
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