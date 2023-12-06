import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { Avatar } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'
import { API_URL_RENDER_IMAGE } from '../../constants/Path'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppSelector } from '../../redux/Hook'
import MessageSectionTimeItemStyle, { AVATAR_HEIGHT } from '../../styles/MessageSectionTimeItemStyle'
import { ImageUri } from '../../types/ImageUri'
import { Message } from '../../types/Message'
import { getMessageSectionTitle } from '../../utils/DateTimeUtils'
import { isApproximatelyTime } from '../../utils/MessageUtils'
import DefaultAvatar from '../common/DefaultAvatar'
import MessageSectionTitle from './MessageSectionTitle'
import { MessageItemProps, TextMessageRenderItemProps } from './MessageSentItem'

const BACKGROUND_COLOR = '#f0f0f0'

const messageContentRenderItems = (data: Message, index: number): React.JSX.Element => {
  if (data.type === 'images') {
    return imagesMessageRenderItem(data)
  }

  return (
    <View>
      <TextMessageRenderItem message={data} index={index} />
    </View>
  )
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

    if (props.message.receiver.id !== conversationMessages[preIndex + 1].receiver.id) {
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

    if (props.message.receiver.id !== conversationMessages[nextIndex - 1].receiver.id) {
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

  const isFirstItem = preIndex === props.index

  const isLastItem = nextIndex === props.index

  if (isSingleItem) {
    style = [MessageSectionTimeItemStyle.messageContentGroup, styles.messageContentGroup, { borderRadius: 20 }]
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

  return (
    <View
      style={{
        marginBottom: isSingleItem || isLastItem ? 10 : 0,
        marginTop: isSingleItem || isFirstItem ? 10 : 0
      }}
    >
      <View style={styles.messageWrapper}>
        <View style={{ alignItems: 'flex-end', flexShrink: 1 }}>
          <Pressable style={style}>
            <Text style={[styles.messageContent, MessageSectionTimeItemStyle.messageTextContent]}>
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
            <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: API_URL_RENDER_IMAGE + props.message.sender.image }} />
          ) : (
            <DefaultAvatar size={AVATAR_HEIGHT} identifer={props.message.sender.name[0]} />
          )}
        </View>
      </View>
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
      <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
        <View style={[MessageSectionTimeItemStyle.imagesGroup]}>
          <FlatGrid
            style={{ width: imageWidth * col + 8, marginLeft: 10 }}
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

      <Text style={{ marginLeft: 'auto', marginStart: AVATAR_HEIGHT + 20, marginBottom: 10, fontSize: 11 }}>
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

export default function MessageReceivedItem(props: MessageItemProps) {
  return (
    <Pressable style={MessageSectionTimeItemStyle.body}>
      <MessageSectionTitle title={getMessageSectionTitle(props.data.createdAt)} visible={props.dayHeaderVisible} />
      <View style={MessageSectionTimeItemStyle.wrapperContentGroup}>
        <View style={[MessageSectionTimeItemStyle.messageContentWrapper, styles.messageContentWrapper]}>
          {messageContentRenderItems(props.data, props.index)}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  messageContent: {
    color: '#000'
  },
  messageWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end'
  },
  messageContentGroup: {
    backgroundColor: BACKGROUND_COLOR,
    marginStart: 10,
    marginEnd: 20
  },
  messageDate: {
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
