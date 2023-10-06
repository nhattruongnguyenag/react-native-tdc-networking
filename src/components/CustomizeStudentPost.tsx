
import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { COLOR_TEXT_CREATE_NORMAL_POST, COLOR_BLACK, COLOR_WHITE, BACKGROUND_COLOR_BOTTOM_ICON } from '../constants/Color'
import CustomizeHeaderPost from './CustomizeHeaderPost';
import CustomizeBodyPost from './CustomizeBodyPost';
import CustomizeImagePost from './CustomizeImagePost';
import CustomizeBottomPost from './CustomizeBottomPost';
import { ModalComments } from '../types/ModalComments';

export interface StudentPost {
    id: number,
    name: string,
    avatar: string,
    timeCreatePost: string,
    content: string,
    images: { id: number, image: string }[],
    likes: {
        id: number;
        name: string;
        avatar: string;
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
            content: string
            timeCreated: string
        }[]
    }[],
    isComment: boolean,
    role: number
}

export const NUM_OF_LINES = 5
export const TEXT_AVAILABLE = 'Khả dụng'
export const TEXT_SEE_MORE = 'xem thêm'
export const TEXT_HIDE_LESS = 'ẩn bớt'
export const HEADER_ICON_SIZE = 15
export const BOTTOM_ICON_SIZE = 30


const CustomizeStudentPost = (props: StudentPost) => {
    // Get data 
    let post = props

    // Hooks
    const [isLike, setLike] = useState(post.isLike);
    const [isComment, setComment] = useState(post.isComment);

    //  Function area

    const handleClickBottomBtnEvent = (type: number | null) => {
        type === 1 ? (setLike(!isLike)
        ) : setComment(!isComment)
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <CustomizeHeaderPost
                name={post.name}
                avatar={post.avatar}
                timeCreatePost={post.timeCreatePost}
                role={post.role}
                typeAuthor={null}
                available={null}
                type={null}
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
                isLike={false}
                isComment={true}
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
})
export default CustomizeStudentPost