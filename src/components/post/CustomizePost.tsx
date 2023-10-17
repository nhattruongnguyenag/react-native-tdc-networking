import { View, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLOR_WHITE } from '../../constants/Color'
import CustomizeHeaderPost from './CustomizeHeaderPost';
import CustomizeBottomPost from './CustomizeBottomPost';
import CustomizeBodyPost from './CustomizeBodyPost';
import CustomizeImagePost from './CustomizeImagePost';
import { Post } from '../../types/Post';
import { useAppDispatch, useAppSelector } from '../../redux/Hook';
import { openModalComments, openModalImage, openModalUserReaction } from '../../redux/Slice';
import { SERVER_ADDRESS } from '../../constants/SystemConstant';
import { likeApi } from '../../api/CallApi';
import { Like } from '../../types/Like';
import { Client, Frame } from 'stompjs';
import { getStompClient } from '../../sockets/SocketClient';
import { LikeAction } from '../../types/LikeActions';

// Constant
export const NUM_OF_LINES = 5
export const HEADER_ICON_SIZE = 15
const GO_TO_PROFILE_ACTIONS = 0;
const LIKE_ACTIONS = 0;
const COMMENT_ACTIONS = 1;
const SHOW_USER_REACTED_ACTIONS = 2;
const urlLike = SERVER_ADDRESS + 'api/posts/like';
const CustomizePost = (props: Post) => {

    // Get data 
    let post = props
    const dispatch = useAppDispatch();
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    //--------------Function area--------------

    // Header area
    const handleClickIntoAvatarAndNameAndMenuEvent = (flag: number | null) => {
        if (flag === GO_TO_PROFILE_ACTIONS) {
            console.log('go to profile user have id: ' + post.userId);
        } else {
            console.log('show menu');
        }
    }

    // Image area
    const handleClickIntoAnyImageEvent = (imageId: number, listImageError: number[]) => {
        dispatch(openModalImage({
            name: props.name,
            userId: props.userId,
            imageIdClicked: imageId,
            avatar: props.avatar,
            images: props.images,
            listImageError: listImageError
        }))
    }

    // Bottom area 
    const handleClickBottomBtnEvent = async (flag: number | null) => {
        if (flag === LIKE_ACTIONS) {
            handleClickIntoBtnIconLikeEvent();
        } else if (flag === COMMENT_ACTIONS) {
            handleClickIntoBtnIconComments();
        } else if (flag === SHOW_USER_REACTED_ACTIONS) {
            handleClickIntoListUserReactions();
        }
    }

    const handleClickIntoListUserReactions = () => {
        dispatch(openModalUserReaction({
            likes: props.likes
        }))
    }


    const handleClickIntoBtnIconLikeEvent = async () => {
        const dataLike: LikeAction = {
            code: '',
            postId: post.id,
            userId: userLogin?.id ?? 0
        }
        props.likeAction(dataLike)
    }


    const checkLiked = (likes: Like[], userId: number | undefined) => {
        let result = false;
        likes.some((item: any) => {
            if (item.id === userId) {
                result = true;
            }
        })
        return result;
    }

    const handleClickIntoBtnIconComments = () => {
        dispatch(openModalComments({
            id: props.id
        }))
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
                handleClickIntoAvatarAndNameAndMenuEvent={
                    handleClickIntoAvatarAndNameAndMenuEvent
                } />
            {/* Body */}
            <CustomizeBodyPost
                content={post.content}
            />
            {/* Image */}
            {
                post.images && post.images.length > 0 && <CustomizeImagePost
                    images={post.images}
                    handleClickIntoAnyImageEvent={handleClickIntoAnyImageEvent}
                    name={post.name}
                    avatar={post.avatar}
                />
            }
            {/* Bottom */}
            <CustomizeBottomPost
                id={post.id}
                userLoginId={userLogin?.id}
                role={post.role}
                isLike={checkLiked(post.likes, userLogin?.id)}
                likes={post.likes}
                comments={props.comments}
                handleClickBottomBtnEvent={handleClickBottomBtnEvent}
                commentQty={post.commentQty}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: COLOR_WHITE,
        marginBottom: 40,
    },
    wrapHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 300,
    }
})
export default CustomizePost
