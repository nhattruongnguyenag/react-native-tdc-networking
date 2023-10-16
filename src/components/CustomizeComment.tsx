import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLOR_BLACK, COLOR_GREY } from '../constants/Color'

export interface CustomizeComment {
  type: number
  id: number
  name: string
  content: string
  avatar: string
  timeCreated: string
  handleClickToCommentReplyEven: (id: number) => void
}

const TEXT_REPLY = 'Trả lời'
const CustomizeComment = (props: CustomizeComment) => {
  return props.type === 0 ? (
    <View style={styles.containerType0}>
      <TouchableOpacity>
        <Image style={styles.avatarType0} source={{ uri: props.avatar }} />
      </TouchableOpacity>
      <View style={styles.wrapBody}>
        <TouchableOpacity>
          <Text style={styles.name}>{props.name}</Text>
        </TouchableOpacity>
        <Text style={styles.content}>{props.content}</Text>
        <View style={styles.wrapBodyBottom}>
          <Text style={styles.timeCreated}>{props.timeCreated}</Text>
          <TouchableOpacity onPress={() => props.handleClickToCommentReplyEven(props.id)}>
            <Text style={styles.reply}>Trả lời</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.containerType1}>
      <TouchableOpacity>
        <Image style={styles.avatarType1} source={{ uri: props.avatar }} />
      </TouchableOpacity>
      <View style={styles.wrapBody}>
        <TouchableOpacity>
          <Text style={styles.name}>{props.name}</Text>
        </TouchableOpacity>
        <Text style={styles.content}>{props.content}</Text>
        <View style={styles.wrapBodyBottom}>
          <Text style={styles.timeCreated}>{props.timeCreated}</Text>
          <TouchableOpacity onPress={() => props.handleClickToCommentReplyEven(props.id)}>
            <Text style={styles.reply}>{TEXT_REPLY}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerType0: {
    flexDirection: 'row',
    margin: 10
  },
  containerType1: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginVertical: 5
  },
  avatarType0: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarType1: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  name: {
    color: COLOR_BLACK,
    fontWeight: 'bold'
  },
  content: {
    color: COLOR_BLACK,
    marginVertical: 5
  },
  wrapBody: {
    marginLeft: 5
  },
  wrapBodyBottom: {
    flexDirection: 'row'
  },
  timeCreated: {
    color: COLOR_GREY
  },
  reply: {
    color: COLOR_BLACK,
    marginLeft: 20,
    fontWeight: 'bold'
  }
})
export default CustomizeComment
