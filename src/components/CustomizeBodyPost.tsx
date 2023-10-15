import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR_BLACK, COLOR_TEXT_CREATE_NORMAL_POST } from '../constants/Color'

// Definition props
export interface PostContent {
  content: string
}

// Constant
export const NUM_OF_LINES = 5
export const TEXT_SEE_MORE = 'xem thêm'
export const TEXT_HIDE_LESS = 'ẩn bớt'

const CustomizeBodyPost = (props: PostContent) => {
  const [showMore, setShowMore] = useState(false)
  const [seeMore, setSeeMore] = useState(true)

  const onTextLayout = useCallback((e: any) => {
    setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES)
  }, [])

  const handleClickSeeMoreEvent = () => {
    setSeeMore(!seeMore)
  }

  let processShow = () => {
    let data: any = null
    if (showMore) {
      data = seeMore ? (
        <Text style={styles.bodyTxtSeeMore}>{TEXT_SEE_MORE}</Text>
      ) : (
        <Text style={styles.bodyTxtSeeMore}>{TEXT_HIDE_LESS}</Text>
      )
    }
    return data
  }

  return (
    <View style={styles.wrapBody}>
      {/* Post content */}
      <Text onTextLayout={onTextLayout} style={styles.bodyContent} numberOfLines={seeMore ? NUM_OF_LINES : undefined}>
        {props.content}
      </Text>
      {/* See more text */}
      <Text onPress={handleClickSeeMoreEvent}>{processShow()}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  bodyTxtSeeMore: {
    color: COLOR_TEXT_CREATE_NORMAL_POST
  },
  bodyContent: {
    color: COLOR_BLACK
  },
  wrapBody: {
    paddingVertical: 10
  }
})
export default CustomizeBodyPost
