import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { COLOR_BLACK, COLOR_WHITE, COLOR_BLUE_BANNER, COLOR_BORDER } from '../../constants/Color'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { TYPE_POST_BUSINESS, TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import { CLICK_DELETE_POST_EVENT, CLICK_SAVE_POST_EVENT, CLICK_SEE_LIST_CV_POST_EVENT, CLICK_SEE_RESULT_POST_EVENT, GO_TO_PROFILE_ACTIONS, TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../../constants/Variables'
import DefaultAvatar from '../DefaultAvatar'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { useAppSelector } from '../../redux/Hook'

export interface HeaderPostPropsType {
  userId: number
  name: string
  avatar: string
  typeAuthor: string | null
  available: boolean | null
  timeCreatePost: string
  type: string | null
  role: string,
  handleClickMenuOption: (flag: number) => void
  handleClickIntoAvatarAndNameAndMenuEvent: (flag: number) => void
}

// Constant
export const NUM_OF_LINES = 5
export const HEADER_ICON_SIZE = 15
export const BOTTOM_ICON_SIZE = 30

const CustomizeHeaderPost = (props: HeaderPostPropsType) => {
  // Get data
  const { userLogin, conversations } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  let post = props
  const [menuOption, setMenuOption] = useState<JSX.Element>()
  useEffect(() => {
    if (props.type === TYPE_NORMAL_POST) {
      if (userLogin?.id === props.userId) {
        setMenuOption(
          <MenuOption onSelect={() => props.handleClickMenuOption(CLICK_DELETE_POST_EVENT)} >
            <Text style={styles.menuText}>Xóa bài viết</Text>
          </MenuOption>)
      } else {
        setMenuOption(
          <MenuOption onSelect={() => props.handleClickMenuOption(CLICK_SAVE_POST_EVENT)} >
            <Text style={styles.menuText}>Lưu bài viết</Text>
          </MenuOption>
        )
      }
    } else if (props.type === TYPE_RECRUITMENT_POST) {
      if (userLogin?.id === props.userId) {
        setMenuOption(
          <>
            <MenuOption onSelect={() => props.handleClickMenuOption(CLICK_DELETE_POST_EVENT)}>
              <Text style={styles.menuText}>Xóa bài viết</Text>
            </MenuOption>
            <MenuOption onSelect={() => props.handleClickMenuOption(CLICK_SEE_LIST_CV_POST_EVENT)}>
              <Text style={styles.menuText}>Xem danh sách cv</Text>
            </MenuOption>
          </>
        )
      } else {
        setMenuOption(
          <MenuOption
            onSelect={() => props.handleClickMenuOption(CLICK_SAVE_POST_EVENT)}>
            <Text style={styles.menuText}>Lưu bài viết</Text>
          </MenuOption>
        )
      }
    } else {
      if (userLogin?.id === props.userId) {
        setMenuOption(
          <>
            <MenuOption onSelect={() => props.handleClickMenuOption(CLICK_DELETE_POST_EVENT)}>
              <Text style={styles.menuText}>Xóa bài viết</Text>
            </MenuOption>
            <MenuOption onSelect={() => props.handleClickMenuOption(CLICK_SEE_RESULT_POST_EVENT)}>
              <Text style={styles.menuText}>Xem kết quả khảo sát</Text>
            </MenuOption>
          </>
        )
      } else {
        setMenuOption(
          <MenuOption onSelect={() => props.handleClickMenuOption(CLICK_SAVE_POST_EVENT)}>
            <Text style={styles.menuText}>Lưu bài viết</Text>
          </MenuOption>
        )
      }
    }
  }, [])

  useEffect(() => {}, [])
  return (
    <View style={[styles.wrapHeader]}>
      <View style={styles.wrapAvatar}>
        <TouchableOpacity
          // Go to profile screen
          onPress={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_PROFILE_ACTIONS)}
        >
          {props.avatar != null ? (
            <Image style={styles.headerAvatar} source={{ uri: SERVER_ADDRESS + `api/images/${post.avatar}` }} />
          ) : (
            <DefaultAvatar size={43} identifer={props.name[0]} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.wrapName}>
        <TouchableOpacity
          // Go to profile screen
          onPress={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_PROFILE_ACTIONS)}
        >
          {/* Name */}
          <Text style={[styles.headerBusinessName, styles.headerItem]}>
            {post.name}
            <Text> </Text>
            {post.role !== TYPE_POST_STUDENT && (
              <IconAntDesign
                name='checkcircle'
                size={HEADER_ICON_SIZE}
                color={COLOR_BLUE_BANNER}
                style={styles.headerItem}
              />
            )}
          </Text>
        </TouchableOpacity>
        <View style={styles.headerCenterTop}>
          {/* Time created post */}
          <Text style={[styles.headerCenterTimePost, styles.headerItem]}>{post.timeCreatePost}</Text>
          {/* Type author */}
          {post.role === TYPE_POST_BUSINESS && (
            <View style={styles.headerCenterType}>
              <Text style={styles.headerTxt}>{post.typeAuthor}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.wrapMenu}>
        <Menu>
          <MenuTrigger>
            <View style={{ paddingTop: 15 }}>
              <IconEntypo name='dots-three-vertical' size={HEADER_ICON_SIZE} color={COLOR_BLACK} />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.menuOption}>{menuOption}</MenuOptions>
        </Menu>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: COLOR_WHITE,
    marginBottom: 0.5
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    width: '100%'
  },
  headerAvatar: {
    width: 43,
    height: 43,
    borderRadius: 22.5
  },
  headerBusinessName: {
    fontSize: 16,
    color: COLOR_BLACK,
    fontWeight: 'bold'
  },
  headerCenterTop: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerCenterType: {
    backgroundColor: COLOR_BORDER,
    paddingHorizontal: 10,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCenterTimePost: {
    fontWeight: 'normal',
    fontSize: 13,
    color: COLOR_BLACK,
    marginTop: 4
  },
  headerTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLOR_BLACK
  },
  headerItem: {
    marginRight: 5
  },
  wrapAvatar: {
    width: '15%'
  },
  wrapName: {
    width: '80%'
  },
  wrapMenu: {
    width: '5%',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  menuText: {
    fontSize: 15
  },
  menuOption: {
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
    width: 130,
    marginLeft: -15,
    paddingTop: 10,
    paddingBottom: 10
  }
})
export default CustomizeHeaderPost
