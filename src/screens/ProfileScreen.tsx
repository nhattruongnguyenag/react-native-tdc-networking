import { FlatList, View, ScrollView, RefreshControl, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL_GET_POST_BY_USER_ID, API_URL_LIKE } from '../constants/Path';
import CustomizePost from '../components/post/CustomizePost';
import { LikeAction } from '../types/LikeActions';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, updatePostWhenHaveChangeComment } from '../redux/Slice';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import CustomizeModalLoading from '../components/modal/CustomizeModalLoading';

const ProfileScreen = ({ route }: any) => {
    const [type, setType] = useState<Number>();
    const [userId, setUserId] = useState<number>(route.params.userId);
    const [post, setPost] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState();
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
                try {
                    setTypeAuthorPost(response.data.data[0].user['roleCodes']);
                    setUserInfo(response.data.data[0].user);
                    setPost(response.data.data);
                    setType(1)
                } catch (error) {
                    setTypeAuthorPost(response.data.data[0].roleCodes);
                    setUserInfo(response.data.data[0]);
                    setPost([]);
                    setType(2)
                }
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
                userId={post[0].user['id']}
                name={post[0].user['name']}
                avatar={post[0].user['image']}
                typeAuthor={'Doanh Nghiệp'}
                available={null}
                timeCreatePost={item.createdAt}
                content={item.content}
                type={item.type}
                likes={item.likes}
                comments={item.comment}
                commentQty={item.commentQuantity}
                images={item.images}
                role={post[0].user['roleCodes']}
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
                    post[0] !== null && <>
                        {
                            type === 1 ? <CustomizeProfile
                                data={post}
                                role={typeAuthorPost}
                                userData={userInfo}
                            /> : <CustomizeProfile
                                data={post}
                                role={typeAuthorPost}
                                userData={userInfo}
                            />
                        }
                    </>

                }

                {
                    post.length !== 0 && type === 1 ? <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        data={post}
                        renderItem={({ item }) => renderItem(item)}
                    /> : null
                }

            </ScrollView>
        </View>
    )
}

export default ProfileScreen

