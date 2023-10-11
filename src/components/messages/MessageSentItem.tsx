import moment from 'moment'
import React from 'react'
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Avatar } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import MessageSectionTimeItemStyle, {
  AVATAR_HEIGHT
} from '../../styles/MessageSectionTimeItemStyle'
import { Message } from '../../types/Message'
import { MessageSectionByTime } from '../../types/MessageSection'
import DefaultAvatar from '../DefaultAvatar'
const BACKGROUND_COLOR = '#6942f4'

interface MessageSentItemProps {
  data: MessageSectionByTime
}

const messageContentRenderItems = (data: MessageSectionByTime): React.JSX.Element => {
  if (data.type === 'images') {
    return imagesMessageRenderItem(data)
  }

  return <View>
    {
      data.messages.map((item, index) => (
        textMessageRenderItem(item, data.messages.length - 1, index)
      ))
    }
  </View>
}

const textMessageRenderItem = (message: Message, lastIndex: number, currentIndex: number) => {
  let style: StyleProp<ViewStyle>
  if (lastIndex === 0) {
    style = [MessageSectionTimeItemStyle.messageContentGroup, styles.messageContentGroup, { borderRadius: 20 }]
  } else if (currentIndex === 0) {
    style = [
      MessageSectionTimeItemStyle.messageContentGroup,
      styles.messageContentGroup,
      styles.messageContentFirstItemGroup
    ]
  } else if (currentIndex === lastIndex) {
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
      <Text style={[{ color: '#fff' }, MessageSectionTimeItemStyle.messageTextContent]}>{message.content}</Text>
      <Text
        style={[
          { color: '#fff' },
          MessageSectionTimeItemStyle.messageDate,
          styles.messageSentDate,
          { display: currentIndex == lastIndex ? 'flex' : 'none' }
        ]}
      >
        {moment(message.createdAt).format('hh:mm a')}
      </Text>
    </View>
  )
}

const imagesMessageRenderItem = (data: MessageSectionByTime): React.JSX.Element => {
  const images = data.messages[0].content.split(',')
  let imageWidth = 100
  let imageHeight = 100
  let col = 2

  if (images.length === 1) {
    imageWidth = 250
    imageHeight = 250
    col = 1
  }

  return (
    <View style={[MessageSectionTimeItemStyle.imagesGroup, {width: imageWidth * col + 8, marginRight: 10}]}>
      <FlatGrid
        itemDimension={imageWidth - 2}
        spacing={1}
        data={images}
        renderItem={({ item, index }) => (
          <Image style={MessageSectionTimeItemStyle.imageItem} source={{ uri: SERVER_ADDRESS + 'api/images/' + item, width: images.length - 1 === index ? imageWidth * 2 + 3 : imageWidth, height: imageHeight }} />
        )}
      />
    </View>
  )
}

export default function MessageSentItem({ data }: MessageSentItemProps): React.JSX.Element {
  return (
    <View style={[{ alignItems: 'flex-end' }, MessageSectionTimeItemStyle.body]}>
      <View style={MessageSectionTimeItemStyle.wrapperContentGroup}>
        <View style={[MessageSectionTimeItemStyle.messageContentWrapper, styles.messageContentWrapper]}>
          {messageContentRenderItems(data)}
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
