import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR_BLACK } from '../../constants/Color'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../DefaultAvatar'

export interface UserReactionType {
  id: number
  name: string
  avatar: string
  handleClickIntoUserReactedEvent: (userId: number) => void
}

const CustomizeUserReaction = (props: UserReactionType) => {
  return (
      <TouchableOpacity onPress={() => props.handleClickIntoUserReactedEvent(props.id)} style={styles.container}>
        {
          props.avatar != null ?
            <Image style={styles.avatar} source={{ uri: SERVER_ADDRESS + `api/images/${props.avatar}` }} />
            :
            <DefaultAvatar size={40} identifer={props.name[0]}/>
        }
        <Text style={styles.txtName}>{props.name}</Text>
      </TouchableOpacity>
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
