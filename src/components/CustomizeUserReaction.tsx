import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR_BLACK } from '../constants/Color'

export interface CustomizeUserReactionType {
  id: number
  name: string
  avatar: string
}

const CustomizeUserReaction = (props: CustomizeUserReactionType) => {
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <Image style={styles.avatar} source={{ uri: props.avatar }} />
        <Text style={styles.txtName}>{props.name}</Text>
      </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  txtName: {
    color: COLOR_BLACK,
    paddingLeft: 10
  }
})

export default CustomizeUserReaction
