import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { COLOR_TEXT_CREATE_NORMAL_POST, COLOR_BLACK, COLOR_WHITE, COLOR_BORDER } from '../constants/Color'
import CustomizeHeaderPost from './CustomizeHeaderPost';
import CustomizeBottomPost from './CustomizeBottomPost';
import CustomizeBodyPost from './CustomizeBodyPost';
import CustomizeImagePost from './CustomizeImagePost';
import { ModalComments } from '../types/ModalComments';

// Definition props
export interface BusinessPost {
  id: number
  name: string,
  avatar: string,
  typeAuthor: string,
  available: boolean,
  timeCreatePost: string,
  content: string,
  images: {
    id: number,
    image: string
  }[],
  type: string,
  likes: {
    id: number,
    name: string,
    avatar: string
  }[],
  isLike: boolean,
  comments: {
    id: number
    name: string
    avatar: string
    content: string
    timeCreated: string
    commentChildren: {
      id: number
      name: string
      avatar: string
      content: string,
      timeCreated: string
    }[]
  }[],
  isComment: boolean,
  role: number
}

// Constant
export const NUM_OF_LINES = 5
export const TEXT_AVAILABLE = 'Khả dụng'
export const TEXT_SEE_MORE = 'xem thêm'
export const TEXT_HIDE_LESS = 'ẩn bớt'
export const HEADER_ICON_SIZE = 15
const HEADER_PADDING_TOP = 15;

const CustomizeBusinessPost = (props: BusinessPost) => {
  // Get data 
  let post = props

  // Hooks
  const [isLike, setLike] = useState(post.isLike);
  const [isComment, setComment] = useState(post.isComment);

  //  Function area

  const handleClickBottomBtnEvent = (type: number | null) => {
    type === 1 ? (setLike(!isLike)
    ) : setComment(!isComment)
    console.log('click into react');
  }


  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomizeHeaderPost
        name={post.name}
        avatar={post.avatar}
        typeAuthor={post.typeAuthor}
        available={post.available}
        timeCreatePost={post.timeCreatePost}
        type={post.type}
        role={post.role}
      />
      {/* Body */}
      <CustomizeBodyPost
        content={post.content}
      />
      {/* Image */}
      <CustomizeImagePost
        name={post.name}
        avatar={post.avatar}
        images={post.images}
      />
      {/* Bottom */}
      <CustomizeBottomPost
        id={post.id}
        role={post.role}
        isLike={post.isLike}
        isComment={post.isComment}
        likes={post.likes}
        comments={post.comments}
        handleClickBottomBtnEvent={
          handleClickBottomBtnEvent
        }
      />
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
    paddingTop: HEADER_PADDING_TOP,
  }
})
export default CustomizeBusinessPost