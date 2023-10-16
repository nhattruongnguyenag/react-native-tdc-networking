import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { PURPLE_COLOR } from '../../constants/Color'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { setSelectConversation } from '../../redux/Slice'
import { getUserStatus } from '../../utils/DateTimeUtils'
import DefaultAvatar from '../DefaultAvatar'

const AVATAR_HEIGHT = 40

export default function MessengerToolbar({}) {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { selectConversation } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon={'arrow-left'}
        iconColor={PURPLE_COLOR}
        onPress={() => {
          dispatch(setSelectConversation(null))
          navigation.goBack()
        }}
        size={25}
      />
      <Appbar.Content
        style={styles.body}
        title={
          <Fragment>
            <View style={styles.avatarGroup}>
              {selectConversation?.receiver.image ? (
                <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: selectConversation?.receiver?.image }} />
              ) : (
                <DefaultAvatar size={AVATAR_HEIGHT} identifer={selectConversation?.receiver.name[0]} />
              )}
              <View
                style={[styles.activeSignal, { display: selectConversation?.receiver.status === 1 ? 'flex' : 'none' }]}
              />
            </View>
            <View style={styles.conversationContentGroup}>
              <Text style={styles.userFullnameTitle}>{selectConversation?.receiver.name}</Text>
              <Text style={styles.conversationContent}>{getUserStatus(selectConversation?.receiver)}</Text>
            </View>
          </Fragment>
        }
      />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 55,
    elevation: 5
  },
  appbarContent: {
    color: '#0065FF',
    fontWeight: 'bold',
    fontSize: 20
  },
  appbarAction: {
    width: 35,
    height: 35
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10
  },
  avatarGroup: {
    position: 'relative',
    backgroundColor: '#eee',
    borderRadius: 999
  },
  activeSignal: {
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#00ea5f',
    position: 'absolute',
    left: (AVATAR_HEIGHT / 2) * (1 + 1 / Math.SQRT2) - 5.5,
    top: (AVATAR_HEIGHT / 2) * (1 + 1 / Math.SQRT2) - 5.5
  },
  conversationContentGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginStart: 7
  },
  userFullnameTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3
  },
  conversationContent: {},
  conversationExtraInfoGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 'auto'
  },
  conversationTime: {
    fontSize: 12,
    marginBottom: 10
  },
  conversationCountNewMessage: {
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
