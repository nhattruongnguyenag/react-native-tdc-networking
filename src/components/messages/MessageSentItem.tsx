import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { Avatar } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppSelector } from '../../redux/Hook'
import MessageSectionTimeItemStyle, { AVATAR_HEIGHT } from '../../styles/MessageSectionTimeItemStyle'
import { ImageUri } from '../../types/ImageUri'
import { Message } from '../../types/Message'
import { getMessageSectionTitle } from '../../utils/DateTimeUtils'
import { isApproximatelyTime } from '../../utils/MessageUtils'
import DefaultAvatar from '../DefaultAvatar'
import MessageSectionTitle from './MessageSectionTitle'
const BACKGROUND_COLOR = '#6942f4'

export interface MessageItemProps {
  data: Message
  index: number
  dayHeaderVisible: boolean
}

const messageContentRenderItems = (data: Message, index: number): React.JSX.Element => {
  if (data.type === 'images') {
    return imagesMessageRenderItem(data)
  }

  return <TextMessageRenderItem message={data} index={index} />
}

export interface TextMessageRenderItemProps {
  message: Message
  index: number
}

const TextMessageRenderItem = (props: TextMessageRenderItemProps) => {
  const { conversationMessages } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  let preIndex = props.index
  let nextIndex = props.index

  while (true) {
    if (preIndex === conversationMessages.length - 1) {
      break
    }

    if (props.message.type !== conversationMessages[preIndex + 1].type) {
      break
    }

    if (props.message.sender.id !== conversationMessages[preIndex + 1].sender.id) {
      break
    }

    if (!isApproximatelyTime(conversationMessages[preIndex].createdAt, conversationMessages[preIndex + 1].createdAt)) {
      break
    }

    preIndex++
  }

  while (true) {
    if (nextIndex === 0) {
      break
    }

    if (props.message.sender.id !== conversationMessages[nextIndex - 1].sender.id) {
      break
    }

    if (props.message.type !== conversationMessages[nextIndex - 1].type) {
      break
    }

    if (
      !isApproximatelyTime(conversationMessages[nextIndex - 1].createdAt, conversationMessages[nextIndex].createdAt)
    ) {
      break
    }

    nextIndex--
  }

  let style: StyleProp<ViewStyle>

  const isSingleItem = preIndex === nextIndex

  const isFirstItem = preIndex === props.index && !isSingleItem

  const isLastItem = nextIndex === props.index

  if (isSingleItem) {
    style = [MessageSectionTimeItemStyle.messageContentGroup, styles.messageContentGroup, styles.messageSingleItem]
  } else if (isFirstItem) {
    style = [
      MessageSectionTimeItemStyle.messageContentGroup,
      styles.messageContentGroup,
      styles.messageContentFirstItemGroup
    ]
  } else if (isLastItem) {
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
    <View
      style={{
        marginBottom: isSingleItem || isLastItem ? 10 : 0,
        marginTop: isSingleItem || isFirstItem ? 10 : 0
      }}
    >
      <View style={styles.messageWrapper}>
        <View style={{ alignItems: 'flex-end', flexShrink: 1 }}>
          <Pressable
            style={style}
            onPress={() => {
              setStatusMessageVisible(!isVisibleMessageStatus)
            }}
          >
            <Text style={[{ color: '#fff' }, MessageSectionTimeItemStyle.messageTextContent]}>
              {props.message.content}
            </Text>
            <Text
              style={[
                { color: '#fff' },
                MessageSectionTimeItemStyle.messageDate,
                styles.messageDate,
                { display: isLastItem ? 'flex' : 'none' }
              ]}
            >
              {moment(props.message.createdAt).format('hh:mm a')}
            </Text>
          </Pressable>
        </View>
        <View style={{ opacity: isLastItem || isSingleItem ? 1 : 0 }}>
          {props.message.sender.image ? (
            <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: props.message.sender.image }} />
          ) : (
            <DefaultAvatar size={AVATAR_HEIGHT} identifer={props.message.sender.name[0]} />
          )}
        </View>
      </View>
      <Text style={{ marginRight: 50, fontSize: 13, display: isVisibleMessageStatus ? 'flex' : 'none' }}>
        {Boolean(props.message.status) ? 'Đã xem' : 'Đã nhận'}
      </Text>
    </View>
  )
}

const imagesMessageRenderItem = (data: Message): React.JSX.Element => {
  const [visible, setIsVisible] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const images = data.content.split(',')
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
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={[MessageSectionTimeItemStyle.imagesGroup]}>
          <FlatGrid
            style={{ width: imageWidth * col + 8, marginRight: 10 }}
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
        </View>

        {data.sender.image ? (
          <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: data.sender.image }} />
        ) : (
          <DefaultAvatar size={AVATAR_HEIGHT} identifer={data.sender.name[0]} />
        )}
      </View>

      <Text style={{ marginLeft: 'auto', marginRight: AVATAR_HEIGHT + 20, marginBottom: 10, fontSize: 11 }}>
        {moment(data.createdAt).format('hh:mm a')}
      </Text>

      <ImageView
        images={imageURIs}
        imageIndex={selectedImageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        animationType={'slide'}
        presentationStyle={'formSheet'}
        doubleTapToZoomEnabled={true}
      />
    </View>
  )
}

export default function MessageSentItem(props: MessageItemProps): React.JSX.Element {
  return (
    <View style={[{ alignItems: 'flex-end' }, MessageSectionTimeItemStyle.body]}>
      <MessageSectionTitle title={getMessageSectionTitle(props.data.createdAt)} visible={props.dayHeaderVisible} />
      <View style={MessageSectionTimeItemStyle.wrapperContentGroup}>
        <View style={[MessageSectionTimeItemStyle.messageContentWrapper, styles.messageContentWrapper]}>
          {messageContentRenderItems(props.data, props.index)}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  messageContentGroup: {
    backgroundColor: BACKGROUND_COLOR,
    marginEnd: 10,
    marginStart: 20
  },
  messageSingleItem: {
    borderRadius: 20
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
  messageDate: {
    marginEnd: 'auto'
  },
  messageContentWrapper: {
    alignItems: 'flex-end',
    flexShrink: 1
  },
  messageItemContainer: {
    flexShrink: 1,
    backgroundColor: 'red',
    flex: 1
  }
})
