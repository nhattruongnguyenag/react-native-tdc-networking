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
import { useGetFollowingUserQuery } from '../../redux/Service'
import axios from 'axios'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useTranslation } from 'react-multi-lang'


let stompClient: Client
const FollowingList = () => {
  const t = useTranslation()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [search, setSearch] = useState('')
  const { data, isFetching } = useGetFollowingUserQuery(
    {
      id: userLogin?.id,
    },
    {
      pollingInterval: 500
    }
  )

  useEffect(() => {console.log(data);
  },[data, isFetching])

  const filter = (data?.data)?.filter(item => item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))

  const handleFollow = (userFollowId: number) => {
    axios.post(`${SERVER_ADDRESS}api/users/follow`, {
      userFollowId: userFollowId,
      userId: userLogin?.id
    }
    )
  }
  const handleDelSearch = () => {
    setSearch('')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.search}>
        <TextInput
          value={search}
          style={styles.txt_input} placeholder={t('FollowComponent.search')}
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
      {
        search == '' ? 
        (<FollowListView data={data?.data} handleFollow={handleFollow} />) 
        : 
        (<FollowListView data={filter} handleFollow={handleFollow} />)
      }
      
    </View>
  )

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
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
export default FollowingList