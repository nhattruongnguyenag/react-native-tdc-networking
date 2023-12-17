import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { useGetPostsQuery, useLazyGetPostsQuery } from '../../redux/Service'
import { PostSearchRequest } from '../../types/request/PostSearchRequest'
import { PostResponseModel } from '../../types/response/PostResponseModel'
import Loading from '../common/Loading'
import ModalPostRejectReason from '../postApproval/ModalPostRejectReason'
import NoMorePost from '../postApproval/NoMorePost'
import PostApprovalItem, { POST_PENDING } from '../postApproval/PostApprovalItem'
import SkeletonPostApprove from '../postApproval/SkeletonPostApprove'

const LIMIT = 3

interface ListPostsProps {
    active?: number,
    userId?: number,
    group?: string,
    type: number
}

export default function ListPosts(props: ListPostsProps) {
    const { userLogin, postDeleteId, surveyPostUpdated } = useAppSelector(state => state.TDCSocialNetworkReducer)
    const t = useTranslation()
    const dispatch = useAppDispatch()
    const [refresh, setRefresh] = useState(false)

    const requestData: PostSearchRequest = useMemo<PostSearchRequest>(() => ({
        active: props.active,
        userId: props.userId
    }), [])

    const [getPostRequest, getPostResponse] = useLazyGetPostsQuery({ refetchOnReconnect: true })

    const { data, isLoading, isFetching } = useGetPostsQuery(
        requestData,
        { refetchOnMountOrArgChange: true, refetchOnFocus: true })

    useEffect(() => {
        getPostRequest({
            active: props.active,
            userId: props.userId
        })
    }, [])

    const onRefresh = () => {
        setRefresh(true)
        getPostRequest({
            active: props.active,
            userId: props.userId
        })
    }

    useEffect(() => {
        if (getPostResponse.data?.data && refresh) {
            setRefresh(false)
        }
    }, [getPostResponse.data?.data, isFetching])

    return (
        <SafeAreaView style={styles.body}>
            {
                getPostResponse.isLoading ? <Loading title={t('PenddingPostScreen.loading')} />
                    :
                    <>
                        {
                            getPostResponse.data && getPostResponse.data.data.length > 0 ?
                                <>
                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        refreshing={refresh}
                                        onRefresh={
                                            () => onRefresh()
                                        }
                                        data={getPostResponse.data?.data}
                                        renderItem={({ item, index }) =>
                                            <PostApprovalItem
                                                key={index.toString()}
                                                post={{ ...item }}
                                                type={props.type}
                                            />
                                        }
                                        ListFooterComponent={<NoMorePost />}
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