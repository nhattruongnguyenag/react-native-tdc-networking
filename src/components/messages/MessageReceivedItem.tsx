import { StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { Message } from '../../types/Messages'
import moment from 'moment'
import MessageSectionTimeItemStyle, {
  AVATAR_HEIGHT,
  MESSAGE_DATE_MARGIN_LEFT_OR_RIGHT
} from '../../styles/MessageSectionTimeItemStyle'
import { ViewStyle } from 'react-native'
import { MessageSectionByTime } from '../../types/MessageSection'
import DefaultAvatar from '../DefaultAvatar'

const BACKGROUND_COLOR = '#f0f0f0'

interface MessageReceivedItemProps {
  showDate: boolean
  data: MessageSectionByTime
}

const messageRenderItems = (lastIndex: number, item: Message, index: number) => {
  let style: StyleProp<ViewStyle>
  if (lastIndex == 0) {
    style = [MessageSectionTimeItemStyle.messageContentGroup, styles.messageContentGroup, { borderRadius: 20 }]
  } else if (index === 0) {
    style = [
      MessageSectionTimeItemStyle.messageContentGroup,
      styles.messageContentGroup,
      styles.messageContentFirstItemGroup
    ]
  } else if (index === lastIndex) {
    style = [
      MessageSectionTimeItemStyle.messageContentGroup,
      styles.messageContentGroup,
      styles.messageContentLastItemGroup
    ]
  } else {
    style = [
      MessageSectionTimeItemStyle.messageContentGroup,
      styles.messageContentGroup,
      styles.messageContentGroupMiddleItemGroup
    ]
  }

  return (
    <View style={style}>
      <Text style={[{ color: '#000' }, MessageSectionTimeItemStyle.messageTextContent]}>{item.content}</Text>
      <Text
        style={[
          MessageSectionTimeItemStyle.messageDate,
          styles.messageReceivedDate,
          { display: index == lastIndex ? 'flex' : 'none' }
        ]}
      >
        {moment(item.createdAt).format('hh:mm a')}
      </Text>
    </View>
  )
}

export default function MessageReceivedItem({ showDate, data }: MessageReceivedItemProps) {
  return (
    <View style={MessageSectionTimeItemStyle.body}>
      <View style={MessageSectionTimeItemStyle.wrapperContentGroup}>
        {data.sender.image ? (
          <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: data.sender.image }} />
        ) : (
          <DefaultAvatar size={AVATAR_HEIGHT} identifer={data.sender.name[0]} />
        )}
        <View style={[MessageSectionTimeItemStyle.messageContentWrapper, styles.messageContentWrapper]}>
          {data.messages.map((item, index) => messageRenderItems(data.messages.length - 1, item, index))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContentGroup: {
    backgroundColor: BACKGROUND_COLOR,
    marginStart: 10,
    marginEnd: 20
  },
  messageReceivedDate: {
    color: '#00000099'
  },
  messageContentFirstItemGroup: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20
  },
  messageContentGroupMiddleItemGroup: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20
  },
  messageContentLastItemGroup: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  messageContentWrapper: {
    alignItems: 'flex-start'
  }
})
