import { FlatList, View, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL_GET_POST_BY_USER_ID, API_URL_LIKE } from '../constants/Path';
import CustomizePost from '../components/post/CustomizePost';
import { LikeAction } from '../types/LikeActions';
import { useAppDispatch, useAppSelector } from '../redux/Hook';
import { goToProfileScreen, setCurrentScreenNowIsProfileScreen, updatePostWhenHaveChangeComment } from '../redux/Slice';
import CustomizeProfile from '../components/profile/CustomizeProfile';
import CustomizeModalLoading from '../components/modal/CustomizeModalLoading';
import CustomizeCreatePostToolbar from '../components/CustomizeCreatePostToolbar';
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST } from '../constants/Variables';
import { CREATE_NORMAL_POST_SCREEN, CREATE_RECRUITMENT_SCREEN, CREATE_SURVEY_SCREEN, PROFILE_SCREEN } from '../constants/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useIsFocused } from '@react-navigation/native';

const ProfileScreen = ({ route }: any) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { deviceToken, userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const [type, setType] = useState<number>();
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
        dispatch(goToProfileScreen(userId))
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
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        getPostByUserIdAPI();
    }, [getPostByUserIdAPI, isFocused])

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

    const handleClickToCreateButtonEvent = (type: string) => {
        if (type === TYPE_NORMAL_POST) {
            navigation.navigate(CREATE_NORMAL_POST_SCREEN, { group: -1 });
        } else if (type === TYPE_RECRUITMENT_POST) {
            navigation.navigate(CREATE_RECRUITMENT_SCREEN);
        } else {
            navigation.navigate(CREATE_SURVEY_SCREEN);
        }
    }

    const handleClickIntoAvatar = () => {
        navigation.navigate(PROFILE_SCREEN, { userId: userLogin?.id ?? 0 })
    }

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
                    (userLogin?.id === userId) ? <View style={styles.wrapperCreateNormalPostToolbar}>
                        <CustomizeCreatePostToolbar
                            role={userLogin?.roleCodes ?? ''}
                            handleClickToCreateButtonEvent={handleClickToCreateButtonEvent}
                            handleClickIntoAvatar={handleClickIntoAvatar}
                            image={userLogin?.image ?? null}
                            name={userLogin?.name ?? ''}
                        />
                    </View> : null
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

const styles = StyleSheet.create({
    wrapperCreateNormalPostToolbar: {
        marginBottom: 20
    }
})
export default ProfileScreen

