import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { useTranslation } from 'react-multi-lang'
import { useGetPostsQuery } from '../../redux/Service'
import Loading from '../common/Loading'
import ModalPostRejectReason from '../postApproval/ModalPostRejectReason'
import PostApprovalItem, { POST_REJECT } from '../postApproval/PostApprovalItem'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import { setPostDeleteId } from '../../redux/Slice'
import NoMorePost from '../postApproval/NoMorePost'
import SkeletonPostApprove from '../postApproval/SkeletonPostApprove'

const LIMIT = 3

export default function RejectedPostTab() {
    const { userLogin, postDeleteId } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const [offset, setOffset] = useState(0)
    const t = useTranslation()
    const dispatch = useAppDispatch()

    const { data, isLoading, isFetching } = useGetPostsQuery({
        active: 2,
        userId: userLogin?.id,
        limit: LIMIT,
        offset: offset
    }, { refetchOnMountOrArgChange: true })

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
                                                type={POST_REJECT}
                                                loading={isFetching && index === posts.length - 1}
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