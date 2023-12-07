import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import { COLOR_TEXT_CREATE_NORMAL_POST, COLOR_BLACK } from '../../constants/Color'
import { useTranslation } from 'react-multi-lang'

interface PostContentType {
  content: string
}

export const NUM_OF_LINES = 5
const CustomizeBodyPost = (props: PostContentType) => {
  const t = useTranslation();
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
        <Text style={styles.bodyTxtSeeMore}>{t("Post.normalPostSeeMoreContent")}</Text>
      ) : (
        <Text style={styles.bodyTxtSeeMore}>{t("Post.normalPostHiddentContent")}</Text>
      )
    }
    return data
  }

  return (
    <View style={styles.wrapBody}>
      <Text onTextLayout={onTextLayout} style={styles.bodyContent} numberOfLines={seeMore ? NUM_OF_LINES : undefined}>
        {props.content}
      </Text>
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
    paddingVertical: 10,
  }
})
export default CustomizeBodyPost
