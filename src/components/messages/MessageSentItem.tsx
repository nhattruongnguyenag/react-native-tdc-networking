import moment from 'moment'
import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Avatar } from 'react-native-paper'
import MessageSectionTimeItemStyle, {
    AVATAR_HEIGHT
} from '../../styles/MessageSectionTimeItemStyle'
import { Message } from '../../types/Messages'
import { MessageSectionByTime } from '../../types/MessageSection'
import DefaultAvatar from '../DefaultAvatar'

const BACKGROUND_COLOR = '#6942f4'

interface MessageSentItemProps {
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
      <Text style={[{ color: '#fff' }, MessageSectionTimeItemStyle.messageTextContent]}>{item.content}</Text>
      <Text
        style={[
          { color: '#fff' },
          MessageSectionTimeItemStyle.messageDate,
          styles.messageSentDate,
          { display: index == lastIndex ? 'flex' : 'none' }
        ]}
      >
        {moment(item.createdAt).format('hh:mm a')}
      </Text>
    </View>
  )
}

export default function MessageSentItem({ showDate, data }: MessageSentItemProps) {
  return (
    <View style={[{ alignItems: 'flex-end' }, MessageSectionTimeItemStyle.body]}>
      <View style={MessageSectionTimeItemStyle.wrapperContentGroup}>
        <View style={[MessageSectionTimeItemStyle.messageContentWrapper, styles.messageContentWrapper]}>
          {data.messages.map((item, index) => messageRenderItems(data.messages.length - 1, item, index))}
        </View>
        {data.sender.image ? (
          <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: data.sender.image }} />
        ) : (
          <DefaultAvatar size={AVATAR_HEIGHT} identifer={data.sender.name[0]} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContentGroup: {
    backgroundColor: BACKGROUND_COLOR,
    marginEnd: 10,
    marginStart: 20
  },
  messageContentFirstItemGroup: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5
  },
  messageContentGroupMiddleItemGroup: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5
  },
  messageContentLastItemGroup: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  messageSentDate: {
    marginEnd: 'auto'
  },
  messageContentWrapper: {
    alignItems: 'flex-end',
    flexShrink: 1
  }
})
