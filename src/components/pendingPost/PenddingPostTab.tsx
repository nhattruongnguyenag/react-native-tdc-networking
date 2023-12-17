import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { useGetPostsQuery, useLazyGetPostsQuery } from '../../redux/Service'
import { setPostDeleteId } from '../../redux/Slice'
import { PostSearchRequest } from '../../types/request/PostSearchRequest'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import { buildPostSearchRequest, isSurveyPost } from '../../utils/PostHelper'
import Loading from '../common/Loading'
import ModalPostRejectReason from '../postApproval/ModalPostRejectReason'
import NoMorePost from '../postApproval/NoMorePost'
import PostApprovalItem, { POST_PENDING } from '../postApproval/PostApprovalItem'
import SkeletonPostApprove from '../postApproval/SkeletonPostApprove'

const LIMIT = 3

export default function PenddingPostTab() {
    const { userLogin, postDeleteId, surveyPostUpdated } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const t = useTranslation()
    const dispatch = useAppDispatch()
    const [refresh, setRefresh] = useState(false)

    const requestData: PostSearchRequest = useMemo<PostSearchRequest>(() => ({
        active: 0,
        userId: userLogin?.id,
        limit: LIMIT,
        offset: 0
    }), [])

    const [getPostRequest, getPostResponse] = useLazyGetPostsQuery({ refetchOnReconnect: true })

    const { data, isLoading, isFetching } = useGetPostsQuery(
        requestData,
        { refetchOnMountOrArgChange: true, refetchOnFocus: true })

    const [posts, setPosts] = useState<PostResponseModel[]>([])

    useEffect(() => {
        if (data && data.data.length > 0) {
            data.data.forEach((item, index) => {
                if (posts.findIndex(post => post.id === item.id) !== -1) {
                    posts.splice(index, 1, item)
                } else {
                    posts.push(item)
                }
            })
            setPosts([...posts])
        }
    }, [data])

    useEffect(() => {
        if (postDeleteId) {
            setPosts([...posts].filter(post => post.id !== postDeleteId))
            dispatch(setPostDeleteId(undefined))
        }
    }, [postDeleteId])

    const onLoadMore = useCallback(() => {
        if (data && data.data.length === LIMIT) {
            getPostRequest({
                active: 0,
                userId: userLogin?.id,
                limit: LIMIT,
                offset: posts.length
            }).unwrap().then((result) => {
                result.data.forEach((item, index) => {
                    if (posts.findIndex(post => post.id === item.id) !== -1) {
                        posts.splice(index, 1, item)
                    } else {
                        posts.push(item)
                    }
                })
                setPosts([...posts])
            })

        }
    }, [posts, data])

    const onRefresh = () => {
        setRefresh(true)
        getPostRequest({
            active: 0,
            userId: userLogin?.id,
            limit: LIMIT,
            offset: 0
        }).unwrap().then((result) => {
            setPosts([...result.data])
            setRefresh(false)
        })
    }

    return (
        <SafeAreaView style={styles.body}>
            {
                isLoading ? <Loading title={t('PenddingPostScreen.loading')} />
                    :
                    <>
                        {
                            posts.length > 0 ?
                                <>
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        refreshing={refresh}
                                        onRefresh={
                                            () => onRefresh()
                                        }
                                        data={posts}
                                        renderItem={({ item, index }) =>
                                            <PostApprovalItem
                                                key={index.toString()}
                                                post={{ ...item }}
                                                type={POST_PENDING}
                                            />
                                        }
                                        ListFooterComponent={getPostResponse.data && getPostResponse.data.data.length < LIMIT ?
                                            <NoMorePost />
                                            :
                                            <SkeletonPostApprove loading={getPostResponse.isFetching} />}
                                        onEndReached={() => onLoadMore()}
                                    />
                                    <ModalPostRejectReason />
                                </>
                                :
                                <Text style={{ marginTop: -60 }}>{t('PenddingPostScreen.emptyMessage')}</Text>
                        }
                    </>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
})