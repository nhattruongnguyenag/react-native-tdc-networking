import { StyleSheet, View, Image, Pressable } from 'react-native'
import React, { memo } from 'react'
import { COLOR_BLACK, COLOR_GREY, COLOR_GREY_FEEBLE, COLOR_WHITE } from '../../constants/Color'
import DefaultAvatar from '../common/DefaultAvatar'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { SCREEN_HEIGHT } from '../../utils/SystemDimensions'
import { CLICK_CAMERA_AVATAR_EVENT, CLICK_CAMERA_BACKGROUND_EVENT, SEE_AVATAR, SEE_BACKGROUND } from '../../constants/Variables'

interface HeaderProfileType {
  isSameUser: boolean,
  background: string,
  avatar: string | null,
  name: string,
  handleClickIntoHeaderComponentEvent: (flag: number) => void
}
const CustomizeHeaderProfile = (props: Readonly<HeaderProfileType>) => {
  return (
    <View>
      <Pressable
        onPress={() => props.handleClickIntoHeaderComponentEvent(SEE_BACKGROUND)}
      >
        <Image
          style={styles.imageBackground}
          source={{ uri: SERVER_ADDRESS + `api/images/${props.background}` }} />
        <View style={styles.wrapperCameraBackground}>
          {
            props.isSameUser && <Pressable
              onPress={() => props.handleClickIntoHeaderComponentEvent(CLICK_CAMERA_BACKGROUND_EVENT)}
              style={[styles.btnUploadImageBackground, styles.border]}>
              <IconEntypo name='camera' size={15} color={COLOR_BLACK} />
            </Pressable>
          }
        </View>
      </Pressable>
      <Pressable
        onPress={() => props.handleClickIntoHeaderComponentEvent(SEE_AVATAR)}
      >
        {
          Boolean(props.avatar) ?
            <View
              style={[styles.imageAvatarWrapper, styles.border]}
            >
              <Image
                style={styles.avatar}
                source={{ uri: SERVER_ADDRESS + `api/images/${props.avatar}` }}
              />
            </View>
            :
            <View style={styles.imageAvatarWrapper}>
              <DefaultAvatar identifer={props.name[0]} size={120} />
              <Pressable
                onPress={() => props.handleClickIntoHeaderComponentEvent(CLICK_CAMERA_AVATAR_EVENT)}
                style={[styles.btnUploadImageAvatar, styles.border]}>
                <IconEntypo name='camera' size={15} color={COLOR_BLACK} />
              </Pressable>
            </View>
        }
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    height: SCREEN_HEIGHT * 0.25,
    objectFit: 'cover',
    backgroundColor: COLOR_GREY_FEEBLE
  },
  imageAvatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    position: 'absolute',
    bottom: -20,
    left: 10,
  },
  btnUploadImageAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: COLOR_GREY_FEEBLE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
  btnUploadImageBackground: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: COLOR_GREY_FEEBLE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
  border: {
    borderWidth: 2,
    borderColor: COLOR_GREY_FEEBLE,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    objectFit: 'cover',
  },
  wrapperCameraBackground: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  }
})

export default memo(CustomizeHeaderProfile)