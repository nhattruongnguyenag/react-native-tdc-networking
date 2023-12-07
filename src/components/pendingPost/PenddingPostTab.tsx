import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { useGetPostsQuery } from '../../redux/Service'
import { setPostDeleteId } from '../../redux/Slice'
import { PostSearchRequest } from '../../types/request/PostSearchRequest'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import { buildPostSearchRequest } from '../../utils/PostHelper'
import Loading from '../common/Loading'
import ModalPostRejectReason from '../postApproval/ModalPostRejectReason'
import NoMorePost from '../postApproval/NoMorePost'
import PostApprovalItem, { POST_PENDING } from '../postApproval/PostApprovalItem'
import SkeletonPostApprove from '../postApproval/SkeletonPostApprove'

const LIMIT = 3

export default function PenddingPostTab() {
    const { userLogin, postDeleteId } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const [offset, setOffset] = useState(0)
    const t = useTranslation()
    const dispatch = useAppDispatch()

    const requestData: PostSearchRequest = useMemo<PostSearchRequest>(() => ({
        active: 0,
        userId: userLogin?.id,
        limit: LIMIT,
        offset: offset
    }), [offset])

    const { data, isLoading, isFetching } = useGetPostsQuery(
        requestData,
        { refetchOnMountOrArgChange: true, refetchOnFocus: true })

    const [posts, setPosts] = useState<PostResponseModel[]>([])

    useEffect(() => {
        if (data) {
            setPosts([...posts, ...data.data])
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
            setOffset(posts.length)
        }
    }, [posts, data])

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
                                        data={posts}
                                        renderItem={({ item, index }) =>
                                            <PostApprovalItem
                                                post={item}
                                                type={POST_PENDING}
                                            />
                                        }
                                        ListFooterComponent={data && data.data.length < LIMIT ?
                                            <NoMorePost />
                                            :
                                            <SkeletonPostApprove loading={isFetching} />}
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