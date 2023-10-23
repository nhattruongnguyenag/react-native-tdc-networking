import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu'
import Icon1 from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface UserItemType{

}

const isFollowed = (item: any) => {
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
          <MenuOption onSelect={() => handleFollow(item.id)}>
            <Text style={styles.menuText}>Hủy theo dõi</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    )
  }

  const isNotFollow = (item: any) => {
    return (
      <TouchableOpacity style={styles.follow} onPress={() => handleFollow(item.id)}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Theo dõi</Text>
      </TouchableOpacity>
    )
  }


const UserItem = () => {
    const renderItem = (item: any, index: any) => {
        return (
          <Pressable key={index} style={styles.item}>
            <View style={styles.item2}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg'
                }}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View>{item.isFollow ? isFollowed(item) : isNotFollow(item)}</View>
          </Pressable>
        )
      }
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
        borderWidth: 1
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
export default UserItem