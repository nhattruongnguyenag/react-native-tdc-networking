import { View, Text, Pressable, StyleSheet, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu'
import Icon1 from 'react-native-vector-icons/Entypo'

export interface UserItemType {
  id: number;
  image: string;
  name: string;
  isFollow: boolean;
  handleFollow: (userId: number) => void;
}


export default function UserItem(props: UserItemType) {
  let item = props

  const isFollowed = () => {
    return (
      <Menu key={item.id}>
        <MenuTrigger>
          <View style={{ paddingTop: 10 }}>
            <Icon1 name='dots-three-vertical' size={18} color='#000000' />
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menuOption}>
          <MenuOption>
            <Text style={styles.menuText}>Trang cá nhân</Text>
          </MenuOption>
          <MenuOption onSelect={() => item.handleFollow(item.id)}>
            <Text style={styles.menuText}>Hủy theo dõi</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    )
  }
  // handleFollow(item.id)
  const isNotFollow = () => {
    return (
      <TouchableOpacity style={styles.follow}
      onPress={() => item.handleFollow(item.id)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
      </TouchableOpacity>
    )
  }

  return (
    // <Text>{item.name}</Text>
    <Pressable style={styles.item}
      key={item.id}>
      <View style={styles.item2}>
        <Image
          style={styles.image}
          source={require('../../assets/splash/logo.png')}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View>{item.isFollow ? isFollowed() : isNotFollow()}</View>
    </Pressable>
  )
}





const styles = StyleSheet.create({
  menuText: {
    fontSize: 15
  },
  menuOption: {
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    width: 130,
    marginLeft: -15,
    paddingTop: 10,
    paddingBottom: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.9,
    borderBottomColor: 'gray'
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
    borderWidth: 1,
    resizeMode: 'cover'
  },
  name: {
    paddingRight: 10,
    paddingLeft: 10,
    width: '62%',
    fontSize: 17,
    color: '#5A5F5C',
    fontWeight: 'bold'
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
    paddingRight: 10
  },
  buttonFollow: {
    backgroundColor: '#f3f9ff'
  }
})
