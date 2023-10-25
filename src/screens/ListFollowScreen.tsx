import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/AntDesign'

const ListFollowScreen = () => {
  const [search, setSearch] = useState('')

  const handleDelSearch = () => {
    setSearch('')
  }


  return (
    <View >
      <View style={styles.container}>
        <View style={styles.follow}>
          <TouchableOpacity style={styles.following}>
            <Text style={styles.txt_following}>Đang theo dõi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followed}>
            <Text style={styles.txt_following}>Đang theo dõi bạn</Text>
          </TouchableOpacity>
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
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  followed: {
    width: 183,
    height: 40,
    backgroundColor: '#DBDBDB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
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