import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { RootStackParamList } from '../../App'
import { MESSENGER_SCREEN } from '../../constants/Screen'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { setSelectConversation } from '../../redux/Slice'
import { Conversation } from '../../types/Conversation'
import { getConversationLastUpdate } from '../../utils/DateTimeUtils'
import DefaultAvatar from '../DefaultAvatar'

interface ConversationItemProps {
  data: Conversation
}

export default function ConversationItem({ data }: ConversationItemProps) {
  const [active, setActive] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()
  const { conversations } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const onItemPressIn = useCallback(() => {
    setActive(true)
  }, [])

  const onItemPressOut = useCallback(() => {
    setActive(false)
  }, [])

  const onItemPress = useCallback(() => {
    dispatch(setSelectConversation({
      receiver: data.receiver,
      sender: data.sender
    }))
    navigation.navigate(MESSENGER_SCREEN)
  }, [conversations])

  const lastMessageContent = useMemo(() => {
    if (data?.lastMessageType === 'images') {
      return '[Hình ảnh]'
    }

    return data?.lastMessageContent
  }, [conversations])

  return (
    <Pressable
      onPress={onItemPress}
      style={[styles.body, { backgroundColor: active ? '#f6f6f6' : '#fff' }]}
      onPressIn={onItemPressIn}
      onPressOut={onItemPressOut}
    >
      <View style={styles.avatarGroup}>
        {data?.receiver.image ? (
          <Avatar.Image size={60} source={{ uri: data?.receiver?.image }} />
        ) : (
          <DefaultAvatar identifer={data?.receiver.name[0]} />
        )}
        <View style={[styles.activeSignal, { display: data?.receiver.status === 1 ? 'flex' : 'none' }]} />
      </View>
      <View style={styles.conversationContentGroup}>
        <Text style={styles.userFullnameTitle}>{data?.receiver?.name}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontWeight: data?.countNewMessage ? 'bold' : 'normal' }}>
          {lastMessageContent}
        </Text>
      </View>
      <View style={styles.conversationExtraInfoGroup}>
        <Text style={styles.conversationTime}>{getConversationLastUpdate(data?.lastMessageSentAt)}</Text>
        <Text
          style={[styles.conversationCountNewMessage, { display: Boolean(data?.countNewMessage) ? 'flex' : 'none' }]}
        >
          {data?.countNewMessage}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  avatarGroup: {
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: 999
  },
  activeSignal: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 999,
    borderColor: '#fff',
    backgroundColor: '#00ea5f',
    position: 'absolute',
    left: 30 + 30 / Math.SQRT2 - 6.5,
    top: 30 + 30 / Math.SQRT2 - 6.5
  },
  conversationContentGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginStart: 10,
    flexShrink: 1
  },
  userFullnameTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10
  },
  conversationExtraInfoGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 'auto'
  },
  conversationTime: {
    fontSize: 12
  },
  conversationCountNewMessage: {
    marginTop: 10,
    width: 24,
    height: 24,
    lineHeight: 24,
    textAlign: 'center',
    borderRadius: 999,
    backgroundColor: '#F70029',
    color: '#ffffff',
    fontWeight: 'bold'
  }
})
