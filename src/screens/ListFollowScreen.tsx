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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { LIST_FOLLOWER, LIST_FOLLOWING } from '../constants/Screen'
import FollowingList from '../components/follow/FollowingList'
import FollowerList from '../components/follow/FollowerList'

let stompClient: Client


const TopTab = createMaterialTopTabNavigator()

function TopTabNavigator(): JSX.Element {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#0065FF',
        tabBarInactiveTintColor: '#808080',
        tabBarLabelStyle: styles.tabBarLabelStyle,
        header: null
      })}
    >
      <TopTab.Screen
        name={LIST_FOLLOWING}
        options={{ title: 'Đang theo dõi' }}
        component={FollowingList}
      />
      <TopTab.Screen
        name={LIST_FOLLOWER}
        options={{ title: 'Đang theo dõi bạn' }}
        component={FollowerList}
      />
    </TopTab.Navigator>
  )
}

const ListFollowScreen = () => {
  return (
    <View style={styles.screen}>
      <TopTabNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tabBarLabelStyle: {
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: 16
  },
})

export default ListFollowScreen