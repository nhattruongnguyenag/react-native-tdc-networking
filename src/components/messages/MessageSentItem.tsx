import moment from 'moment'
import React, { Fragment, useMemo, useState } from 'react'
import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { Avatar } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import MessageSectionTimeItemStyle, { AVATAR_HEIGHT } from '../../styles/MessageSectionTimeItemStyle'
import { ImageUri } from '../../types/ImageUri'
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

  return (
    <View>
      {data.messages.map((item, index) => (
        <TextMessageRenderItem message={item} currentIndex={index} lastIndex={data.messages.length - 1} />
      ))}
    </View>
  )
}

export interface TextMessageRenderItemProps {
  message: Message
  lastIndex: number
  currentIndex: number
}

const TextMessageRenderItem = (props: TextMessageRenderItemProps) => {
  let style: StyleProp<ViewStyle>
  if (props.lastIndex === 0) {
    style = [MessageSectionTimeItemStyle.messageContentGroup, styles.messageContentGroup, { borderRadius: 20 }]
  } else if (props.currentIndex === 0) {
    style = [
      MessageSectionTimeItemStyle.messageContentGroup,
      styles.messageContentGroup,
      styles.messageContentFirstItemGroup
    ]
  } else if (props.currentIndex === props.lastIndex) {
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

  const [isVisibleMessageStatus, setStatusMessageVisible] = useState(false)

  return (
    <View style={{ flex: 1, alignItems: 'flex-end', flexShrink: 1 }}>
      <Pressable
        style={style}
        onPress={() => {
          setStatusMessageVisible(!isVisibleMessageStatus)
        }}
      >
        <Text style={[{ color: '#fff' }, MessageSectionTimeItemStyle.messageTextContent]}>{props.message.content}</Text>
        <Text
          style={[
            { color: '#fff' },
            MessageSectionTimeItemStyle.messageDate,
            styles.messageSentDate,
            { display: props.currentIndex == props.lastIndex ? 'flex' : 'none' }
          ]}
        >
          {moment(props.message.createdAt).format('hh:mm a')}
        </Text>
      </Pressable>
      <Text style={{ marginRight: 15, fontSize: 13, display: isVisibleMessageStatus ? 'flex' : 'none' }}>
        {Boolean(props.message.status) ? 'Đã xem' : 'Đã nhận'}
      </Text>
    </View>
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
      <View style={[MessageSectionTimeItemStyle.imagesGroup, { width: imageWidth * col + 8, marginRight: 10 }]}>
        <FlatGrid
          itemDimension={imageWidth - 2}
          spacing={1}
          data={images}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setSelectedImageIndex(index)
                setIsVisible(true)
              }}
            >
              <Image
                style={MessageSectionTimeItemStyle.imageItem}
                source={{
                  uri: SERVER_ADDRESS + 'api/images/' + item,
                  width:
                    images.length > 1 && images.length % 2 == 1 && index == images.length - 1
                      ? imageWidth * 2 + 3
                      : imageWidth,
                  height: imageHeight
                }}
              />
            </Pressable>
          )}
        />
        <Text style={{ marginLeft: 10, fontSize: 11 }}>{moment(data.messages[0].createdAt).format('hh:mm a')}</Text>
      </View>

      <ImageView
        images={imageURIs}
        imageIndex={selectedImageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        animationType={'slide'}
        presentationStyle={'formSheet'}
        doubleTapToZoomEnabled={true}
      />
    </Fragment>
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
