import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOR_TEXT_CREATE_NORMAL_POST, COLOR_BLACK, COLOR_WHITE, BACKGROUND_COLOR_BOTTOM_ICON } from '../constants/Color'
import { BusinessPost } from '../types/BusinessPost'

export const NUM_OF_LINES = 5
export const TEXT_AVAILABLE = 'Khả dụng'
export const TEXT_SEE_MORE = 'xem thêm'
export const TEXT_HIDE_LESS = 'ẩn bớt'
export const HEADER_ICON_SIZE = 15
export const BOTTOM_ICON_SIZE = 30
// get devices info 
const { width, height } = Dimensions.get('screen');

const CustomizeBusinessPost = (props: BusinessPost) => {
  // Get data 
  let post = props

  // Hooks
  const [showMore, setShowMore] = useState(false);
  const [seeMore, setSeeMore] = useState(true);
  const [isLike, setLike] = useState(post.isLike);
  const [isComment, setComment] = useState(post.isComment);

  //  Function area
  const onTextLayout = useCallback((e: any) => {
    setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES)
  }, [])

  const handleClickSeeMoreEvent = () => {
    setSeeMore(!seeMore);
  }

  const handleClickBottomBtnEvent = (type: number) => {
    type === 1 ? (setLike(!isLike)
    ) : setComment(!isComment)
  }

  let processShow = () => {
    let data: any = null;
    if (showMore) {
      data = seeMore ?
        (<Text style={styles.bodyTxtSeeMore}>{TEXT_SEE_MORE}</Text>) :
        (<Text style={styles.bodyTxtSeeMore}>{TEXT_HIDE_LESS}</Text>)
    }
    return data;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.wrapHeader}>
        {/* Avatar company */}
        <Image
          style={styles.headerAvatar}
          source={{ uri: post.avatar }} />
        <View style={styles.wrapLeftHeader}>
          <View style={styles.headerCenter}>
            <View style={styles.headerCenterTop}>
              {/* Name company */}
              <Text style={[styles.headerBusinessName, styles.headerItem]}>{post.name}</Text>
              {/* Icon check authentications */}
              <IconAntDesign name='checkcircle' size={HEADER_ICON_SIZE} color={"blue"} style={styles.headerItem} />
              {/* Type author */}
              <View style={styles.headerCenterType}><Text style={styles.headerTxt}>{post.typeAuthor}</Text></View>
            </View>
            <View style={styles.headerCenterTop}>
              {/* Time created post */}
              <Text style={[styles.headerCenterTimePost, styles.headerItem]}>{post.timeCreatePost} - {post.type}</Text>
              {/* in ability? */}
              <View style={styles.headerCenterType}><Text style={styles.headerTxt}>{post.available ? TEXT_AVAILABLE : null}</Text></View>
            </View>
          </View>
          {/* Menu 3 dot */}
          <TouchableOpacity>
            <IconEntypo name="dots-three-vertical" size={HEADER_ICON_SIZE} color={COLOR_BLACK} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Body */}
      <View style={styles.containerContent}>
        {/* Post content */}
        <Text
          onTextLayout={onTextLayout}
          style={styles.bodyContent}
          numberOfLines={seeMore ? NUM_OF_LINES : undefined}>
          {
            post.content
          }
        </Text>
        {/* See more text */}
        <Text
          onPress={handleClickSeeMoreEvent}
        >
          {
            processShow()
          }
        </Text>
      </View>
      {/* Image */}
      <View style={styles.wrapImage}>
        <Image style={styles.ImagePost1} source={{ uri: 'https://a.cdn-hotels.com/gdcs/production69/d31/7e6c2166-24ef-4fa4-893a-39b403ff02cd.jpg' }} />
        <View style={styles.wrapImagesPostLeft}>
          <Image style={styles.ImagePost2} source={{ uri: 'https://a.cdn-hotels.com/gdcs/production69/d31/7e6c2166-24ef-4fa4-893a-39b403ff02cd.jpg' }} />
          <Image style={styles.ImagePost2} source={{ uri: 'https://a.cdn-hotels.com/gdcs/production69/d31/7e6c2166-24ef-4fa4-893a-39b403ff02cd.jpg' }} />
        </View>
      </View>
      {/* Bottom */}
      <View style={styles.wrapBottom}>
        <Pressable style={styles.wrapBottomChild}
          onPress={() => handleClickBottomBtnEvent(1)}>
          <View style={styles.wrapIconAndTextBottom}>
            {
              !isLike ?
                (
                  <IconAntDesign name='like2' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                )
                :
                (
                  <IconAntDesign name='like1' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                )
            }
            <Text>
              {
                post.likes
              }
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => handleClickBottomBtnEvent(0)}
          style={styles.wrapBottomChild}>
          <View style={styles.wrapIconAndTextBottom}>
            {
              !isComment ?
                (
                  <IconMaterialCommunityIcons name='comment-outline' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                )
                :
                (
                  <IconMaterialCommunityIcons name='comment' size={BOTTOM_ICON_SIZE} color={COLOR_BLACK} />
                )
            }
            <Text>
              {
                post.comments
              }
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    backgroundColor: COLOR_WHITE,
    marginBottom: 0.5,
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  headerAvatar: {
    width: 43,
    height: 43,
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
    backgroundColor: '#D9D9D9',
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
    marginTop: 4,
  },
  headerTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLOR_BLACK
  },
  wrapLeftHeader: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerItem: {
    marginRight: 5,
  },
  bodyTxtSeeMore: {
    color: COLOR_TEXT_CREATE_NORMAL_POST
  },
  bodyContent: {
    color: COLOR_BLACK,
  },
  // Images area test
  wrapImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: height * 0.4,
  },
  ImagePost1: {
    width: '49.5%',
    height: '100%'
  },
  wrapImagesPostLeft: {
    width: '49.5%',
    height: '100%',
    justifyContent: 'space-between'
  },
  ImagePost2: {
    width: '100%',
    height: '49.5%'
  },
  // Bottom
  wrapBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  wrapIconAndTextBottom: {
    width: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerCenter: {

  },
  wrapBottomChild: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: BACKGROUND_COLOR_BOTTOM_ICON,
    borderRadius: 15
  },
  containerContent: {
    paddingVertical: 10,
  }
})
export default CustomizeBusinessPost