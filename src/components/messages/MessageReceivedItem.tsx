import moment from 'moment'
import React, { Fragment, useMemo, useState } from 'react'
import { Pressable } from 'react-native'
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
import ImageView from "react-native-image-viewing"
import { ImageUri } from '../../types/ImageUri'
import * as Animatable from 'react-native-animatable'

const BACKGROUND_COLOR = '#f0f0f0'

interface MessageReceivedItemProps {
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

  const [statusMessageVisible, setStatusMessageVisible] = useState<boolean>(false)

  return (
    <Pressable style={style}>
      <Text style={[{ color: '#000' }, MessageSectionTimeItemStyle.messageTextContent]}>{message.content}</Text>
      <Text
        style={[
          { color: '#000' },
          MessageSectionTimeItemStyle.messageDate,
          styles.messageReceivedDate,
          { display: currentIndex == lastIndex ? 'flex' : 'none' }
        ]}
      >
        {moment(message.createdAt).format('hh:mm a')}
      </Text>
    </Pressable>
  )
}

const imagesMessageRenderItem = (data: MessageSectionByTime): React.JSX.Element => {
  const [visible, setIsVisible] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const images = data.messages[0].content.split(',')
  let imageWidth = 100
  let imageHeight = 100
  let col = 2

  if (images.length === 1) {
    imageWidth = 250
    imageHeight = 250
    col = 1
  }

  const imageURIs = useMemo(() => {
    return images.map<ImageUri>((item, index) => {

      return {
        uri: SERVER_ADDRESS + 'api/images/' + item
      }
    })
  }, [])

  return (
    <Fragment>
      <View style={[MessageSectionTimeItemStyle.imagesGroup, { width: imageWidth * col + 8, marginLeft: 10 }]}>
        <FlatGrid
          itemDimension={imageWidth - 2}
          spacing={1}
          data={images}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => {
              setSelectedImageIndex(index)
              setIsVisible(true)
            }}>
              <Image style={MessageSectionTimeItemStyle.imageItem} source={{ uri: SERVER_ADDRESS + 'api/images/' + item, width: images.length - 1 === index ? imageWidth * 2 + 3 : imageWidth, height: imageHeight }} />
            </Pressable>
          )}
        />
      </View>

      <ImageView
        images={imageURIs}
        imageIndex={selectedImageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        animationType={'slide'}
        presentationStyle={'formSheet'}
        doubleTapToZoomEnabled={true} />
    </Fragment>
  )
}

export default function MessageReceivedItem({ data }: MessageReceivedItemProps) {
  return (
    <Pressable style={MessageSectionTimeItemStyle.body}>
      <View style={MessageSectionTimeItemStyle.wrapperContentGroup}>
        {data.sender.image ? (
          <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: data.sender.image }} />
        ) : (
          <DefaultAvatar size={AVATAR_HEIGHT} identifer={data.sender.name[0]} />
        )}
        <View style={[MessageSectionTimeItemStyle.messageContentWrapper, styles.messageContentWrapper]}>
          {messageContentRenderItems(data)}
        </View>
      </View>
    </Pressable>
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
