import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { PURPLE_COLOR } from '../../constants/Color'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { setSelectConversation } from '../../redux/Slice'
import { User } from '../../types/User'
import DefaultAvatar from '../common/DefaultAvatar'

const AVATAR_HEIGHT = 40

export default function MessengerToolbar({ }) {
  const t = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const { selectConversation } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  const getUserStatus = (user?: User): string => {
    let status = ''

    if (user?.status === 1) {
      status = t('MessengerToolbar.userStatusActive')
    } else {
      status = `${t('MessengerToolbar.userStatusInactive')} ` + moment(user?.lastActive).fromNow()
    }

    return status
  }

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
                <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: SERVER_ADDRESS + 'api/images/' + selectConversation?.receiver?.image }} />
              ) : (
                <DefaultAvatar size={AVATAR_HEIGHT} identifer={selectConversation?.receiver.name[0]} />
              )}
              <View
                style={[styles.activeSignal, { display: selectConversation?.receiver.status === 1 ? 'flex' : 'none' }]}
              />
            </View>
            <View style={styles.conversationContentGroup}>
              <View style={{ flexDirection: 'row'}}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.userFullnameTitle}>{selectConversation?.receiver.name}</Text>
              </View>
              <View style={styles.conversationContent}>
                <Text>{getUserStatus(selectConversation?.receiver)}</Text>
              </View>
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
    marginStart: 7,
    flexDirection: 'column',
    flex: 1
  },
  userFullnameTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,
    flex: 1,
    paddingRight: 10,
    flexWrap: 'wrap'
  },
  conversationContent: {
    flex: 1
  },
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
