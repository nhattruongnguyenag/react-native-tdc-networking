import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Divider } from 'react-native-paper'
import { useAppSelector } from '../../redux/Hook'
import { User } from '../../types/User'
import DefaultAvatar from '../DefaultAvatar'

export default function DrawerHeader() {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  return (
    <View style={styles.body}>
      {userLogin && (userLogin as User).image ? (
        <Avatar.Image size={60} source={{ uri: (userLogin as User).image }} />
      ) : (
        <DefaultAvatar size={60} identifer={userLogin?.name[0]} />
      )}
      <Text style={styles.textName}>{userLogin ? userLogin?.name : ''}</Text>
      <Text style={styles.textEmail}>{userLogin ? (userLogin as User).email : ''}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    borderTopWidth: 20,
    borderTopColor: '#e0e0e0',
    padding: 15
  },
  avatar: {
    marginTop: 5
  },
  textName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    marginTop: 5
  },
  textEmail: {
    color: '#000',
    marginTop: 2,
    fontSize: 14,
    marginBottom: 5
  }
})
