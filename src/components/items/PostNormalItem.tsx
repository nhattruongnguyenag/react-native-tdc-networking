import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu'
import Icon1 from 'react-native-vector-icons/Entypo'

export interface PostNormalItemType {
    id: number
    image: string
    type: string
    user: {
      id: number
      name: string
      image: string
    }
    content: string
}
const PostNormalItem = (props: PostNormalItemType) => {
    let item = props
    return (
        <View style={styles.itemPost1}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{ width: 70, height: 70, borderRadius: 50, borderWidth: 1.5, borderColor: '#48AF7B' }}
                    source={require('../../assets/splash/logo.png')}
                />
                <View style={{ marginLeft: 10, width: '75%' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#5A5F5C' }}>{item.user.name}</Text>
                    <Text>{item.content.length > 120 ? `${item.content.substring(0, 120)}...` : item.content}</Text>
                </View>
            </View>
            {/* <MenuProvider> */}
            <Menu key={item.id}>
                <MenuTrigger>
                    <View style={{ paddingTop: 15 }}>
                        <Icon1 name='dots-three-vertical' size={18} color='#000000' />
                    </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOption}>
                    <MenuOption>
                        <Text style={styles.menuText}>Xem chi tiết</Text>
                    </MenuOption>
                    <MenuOption>
                        <Text style={styles.menuText}>Lưu</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            {/* </MenuProvider> */}
        </View>
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
      itemPost1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
        // borderBottomWidth: 0.9,
        // borderBottomColor: 'gray',
      },
})
export default PostNormalItem