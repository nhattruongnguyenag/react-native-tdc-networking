import { FlatList, View, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CustomizeProfile from '../components/profile/CustomizeProfile'
import axios from 'axios';
import { API_URL_GET_POST_BY_USER_ID, API_URL_LIKE } from '../constants/Path';
import CustomizePost from '../components/post/CustomizePost';
import { LikeAction } from '../types/LikeActions';
import { Client } from 'stompjs';
import CustomizeModalLoading from '../components/modal/CustomizeModalLoading';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, updatePostWhenHaveChangeComment } from '../redux/Slice';

const ProfileScreen = ({ route }: any) => {
    const [userId, setUserId] = useState<number>(route.params.userId);
    const [post, setPost] = useState<any[]>([]);
    const [typeAuthorPost, setTypeAuthorPost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { updatePost } = useAppSelector((state) => state.TDCSocialNetworkReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPostByUserIdAPI();
        dispatch(updatePostWhenHaveChangeComment(false))
    }, [updatePost])

    useEffect(() => {
        if (post.length != 0) {
            setIsLoading(false);
        }
    }, [post])

    useEffect(() => {
        dispatch(setCurrentScreenNowIsProfileScreen(true));
    }, [])

    const getPostByUserIdAPI = useCallback(() => {
        // Set userId profile now
        dispatch(goToProfileScreen(userId))
        // Get data
        axios.get(API_URL_GET_POST_BY_USER_ID + userId)
            .then((response) => {
                setPost(response.data.data);
                setTypeAuthorPost(post[0].user['roleCodes']);
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        getPostByUserIdAPI();
    }, [getPostByUserIdAPI])

    const likeAction = (obj: LikeAction) => {
        like(obj)
    }

    const like = useCallback(async (likeData: LikeAction) => {
        axios.post(API_URL_LIKE, {
            "postId": likeData.postId,
            "userId": likeData.userId
        }).then((response) => {
            if (response.data.status === 201) {
                getPostByUserIdAPI();
            }
        }).catch((error) => {
            console.error(error);
        })
    }, [])

    const renderItem = (item: any) => {
        return (
            <CustomizePost
                    id={item.id}
                    userId={item.user['id']}
                    name={item.user['name']}
                    avatar={item.user['image']}
                    typeAuthor={'Doanh Nghiệp'}
                    available={null}
                    timeCreatePost={item.createdAt}
                    content={item.content}
                    type={item.type}
                    likes={item.likes}
                    comments={item.comment}
                    commentQty={item.commentQuantity}
                    images={item.images}
                    role={item.user['roleCodes']}
                    likeAction={likeAction}
                    location={item.location ?? null}
                    title={item.title ?? null}
                    expiration={item.expiration ?? null}
                    salary={item.salary ?? null}
                    employmentType={item.employmentType ?? null}
                    description={item.description ?? null}
                />
        )
    }

    return (
        <View>
            <CustomizeModalLoading visible={isLoading} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            getPostByUserIdAPI();
                        }}
                    />
                }
            >
                {
                    post.length != 0 && <CustomizeProfile
                        data={post}
                        role={post[0].user['roleCodes']}
                        userData={post[0].user}
                    />
                }
                {
                    post.length != 0 &&
                    <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={post}
                        renderItem={({ item }) => renderItem(item)}
                    />
                }
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

