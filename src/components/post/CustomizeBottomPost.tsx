import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BACKGROUND_COLOR_BOTTOM_ICON, COLOR_BLACK, COLOR_BOTTOM_AVATAR, COLOR_WHITE } from '../../constants/Color'
import { TEXT_LIKE_BY } from '../../constants/StringVietnamese'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { Like } from '../../types/Like'
import { Comment } from '../../types/Comment'
import { COMMENT_ACTION, LIKE_ACTION, SHOW_LIST_USER_REACTED } from '../../constants/Variables'
import DefaultAvatar from '../DefaultAvatar'

//  Definition props

export interface BottomPostType {
  id: number
  userLoginId: number | undefined
  role: string
  handleClickBottomBtnEvent: (a: number | null) => void
  isLike: boolean
  comments: Comment[] | null
  likes: Like[]
  commentQty: number
}

// Constant
const BOTTOM_ICON_SIZE = 30
const CustomizeBottomPost = (props: BottomPostType) => {
  // Variable
  const numberUserReacted: number = props.likes?.length
  const renderItem = (item: any) => {
    return item.image != null ?
      <Image
        key={item.id}
        style={[styles.avatarUserReacted]}
        source={{ uri: SERVER_ADDRESS + `api/images/${item.image}` }}
      />
      :
      <View style={styles.avatarUserReactedDefault}>
        <DefaultAvatar
          key={item.id}
          size={30} identifer={item.name[0]} />
      </View>
  }
  return (
    <View style={styles.wrapBottom}>
      <View style={[styles.wrapBottomLeft, styles.row]}>
        <View style={styles.wrapIconAndTextBottom}>
          <TouchableOpacity onPress={() => props.handleClickBottomBtnEvent(LIKE_ACTION)}>
            {!props.isLike ? (
              <IconAntDesign name='like2' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
            ) : (
              <IconAntDesign name='like1' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
            )}
          </TouchableOpacity>
          <Text>{props.likes?.length}</Text>
        </View>
        <View style={[styles.wrapIconAndTextBottom, styles.iconRight]}>
          <TouchableOpacity onPress={() => props.handleClickBottomBtnEvent(COMMENT_ACTION)}>
            <IconMaterialCommunityIcons name='comment-outline' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
          </TouchableOpacity>
          <Text>{props.commentQty}</Text>
        </View>
      </View>
      <View style={[styles.wrapBottomRight, styles.row]}>
        {numberUserReacted > 0 && <Text style={styles.bottomWrapRightText}>{TEXT_LIKE_BY}</Text>}
        {numberUserReacted > 3 ? (
          <TouchableOpacity
            onPress={() => props.handleClickBottomBtnEvent(SHOW_LIST_USER_REACTED)}
            style={styles.avatarUserReactedContainer}
          >

            {props.likes[0].image != null ?
              <Image
                style={[styles.avatarUserReacted, styles.avatarUserReactedOne, styles.absolute]}
                source={{ uri: SERVER_ADDRESS + `api/images/${props.likes[0].image}` }}
              />
              :
              <DefaultAvatar size={30} identifer={props.likes[0].name[0]} />
            }

            {props.likes[0].image != null ?
              <Image
                style={[styles.avatarUserReacted, styles.avatarUserReactedTwo, styles.absolute]}
                source={{ uri: SERVER_ADDRESS + `api/images/${props.likes[1].image}` }}
              />
              :
              <DefaultAvatar size={30} identifer={props.likes[1].name[0]} />
            }

            {props.likes[0].image != null ?
              <Image
                style={[styles.avatarUserReacted, styles.avatarUserReactedThree, styles.absolute]}
                source={{ uri: SERVER_ADDRESS + `api/images/${props.likes[2].image}` }}
              />
              :
              <DefaultAvatar size={30} identifer={props.likes[2].name[0]} />
            }
            <View style={[styles.avatarUserReacted, styles.numberUserReactedRemaining, styles.absolute]}>
              {numberUserReacted <= 9 ? (
                <>
                  <Text style={styles.txtNumberUserReactedRemaining}>+{numberUserReacted - 3}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.txtNumberUserReactedRemaining}>9+</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => props.handleClickBottomBtnEvent(SHOW_LIST_USER_REACTED)}
            >
              <FlatList
                style={styles.wrapAvatarBottomRight}
                keyExtractor={(item) => item.id.toString()}
                data={props.likes}
                renderItem={({ item }) => renderItem(item)}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Bottom
  wrapBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  wrapIconAndTextBottom: {
    width: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerCenter: {},
  wrapBottomChild: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: BACKGROUND_COLOR_BOTTOM_ICON,
    borderRadius: 15
  },
  containerContent: {
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row'
  },
  iconRight: {
    marginLeft: 20
  },
  wrapBottomLeft: {
    width: '50%'
  },
  wrapBottomRight: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  avatarUserReacted: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLOR_WHITE
  },
  absolute: {
    position: 'absolute'
  },
  avatarUserReactedOne: {
    right: '70%'
  },
  avatarUserReactedTwo: {
    right: '48%'
  },
  avatarUserReactedThree: {
    right: '24%'
  },
  numberUserReactedRemaining: {
    right: 0,
    backgroundColor: COLOR_BOTTOM_AVATAR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomWrapRightText: {
    color: 'black',
    marginRight: 5
  },
  txtNumberUserReactedRemaining: {
    color: 'black'
  },
  avatarUserReactedContainer: {
    width: 100,
    height: '100%'
  },
  wrapAvatarBottomRight: {
    flexDirection: 'row'
  },
  avatarUserReactedDefault:{
    margin:1,
  }
})
export default CustomizeBottomPost
