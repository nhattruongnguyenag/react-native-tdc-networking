import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useTransition, memo } from 'react'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { COLOR_BLACK, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/SystemDimensions'
import CustomizeLayoutImageNotify from '../post/CustomizeLayoutImageNotifyPost'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import DefaultAvatar from '../common/DefaultAvatar'
import { getFacultyTranslated } from '../../utils/getFacultyTranslated '
import { useTranslation } from 'react-multi-lang'

interface ImageModalShowType {
  t: ReturnType<typeof useTranslation>
  closeModal: () => void
  data: any
  authorInfo: any
  handleCheckImageHaveError: (id: number) => boolean
  handleClickIntoUserNameOrAvatarEvent: () => void
}

const CustomizeImageModalShow = (props: Readonly<ImageModalShowType>) => {
  return (
    <TouchableOpacity onPress={() => props.closeModal()} style={styles.wrapperContent}>
      <Pressable style={styles.containerContent}>
        {/* Header */}
        <View style={styles.wrapHeaderModalImage}>
          <TouchableOpacity style={styles.userInfoRight} onPress={() => props.handleClickIntoUserNameOrAvatarEvent()}>
            {
              Boolean(props.authorInfo?.avatar) ?
                <Image
                  style={styles.avatar}
                  source={{ uri: SERVER_ADDRESS + `api/images/${props.authorInfo?.avatar}` }}
                />
                :
                <DefaultAvatar identifer={props.authorInfo.name[0]} size={40} />
            }
            <Text style={styles.useName} numberOfLines={1}>
              {getFacultyTranslated(props.authorInfo?.name, props.t)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.closeModal()}>
            <IconAntDesign name='close' size={20} color={COLOR_BLACK} />
          </TouchableOpacity>
        </View>

        {props.handleCheckImageHaveError(props.data.id) ? (
          <CustomizeLayoutImageNotify />
        ) : (
          <Image style={styles.showMainImage} source={{ uri: SERVER_ADDRESS + `api/images/${props.data.uri}` }} />
        )}
      </Pressable>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapperContent: {
    width: WINDOW_WIDTH,
    backgroundColor: COLOR_MODAL,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerContent: {
    width: WINDOW_WIDTH * 0.8,
    height: WINDOW_HEIGHT * 0.6,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: COLOR_WHITE,
    overflow: 'hidden'
  },
  showMainImage: {
    width: '100%',
    height: '88%'
  },
  btnClose: {
    position: 'absolute',
    top: 10,
    zIndex: 999,
    right: 10
  },
  wrapHeaderModalImage: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    zIndex: 999,
    height: '12%',
    backgroundColor: COLOR_WHITE
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR_BLACK
  },
  userInfoRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  useName: {
    color: COLOR_BLACK,
    marginLeft: 10,
    fontWeight: 'bold',
    width: '75%'
  }
})
export default memo(CustomizeImageModalShow)