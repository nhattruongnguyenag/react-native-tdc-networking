import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import Loading from './components/common/Loading'
import ModalPostRejectReason from './components/postApproval/ModalPostRejectReason'
import NoMorePost from './components/postApproval/NoMorePost'
import PostApprovalItem, { POST_APPROVAL } from './components/postApproval/PostApprovalItem'
import SkeletonPostApprove from './components/postApproval/SkeletonPostApprove'
import { useAppDispatch, useAppSelector } from './redux/Hook'
import { useGetPostsQuery } from './redux/Service'
import { setPostAcceptId, setPostRejectId } from './redux/Slice'
import { PostResponseModel } from './types/response/PostResponseModel'
import { buildPostSearchRequest } from './utils/PostHelper'
import { isAdmin, isFaculty } from './utils/UserHelper'

const LIMIT = 3

export default function ApprovalPostScreen() {
  const { userLogin, postRejectId, postAcceptId } = useAppSelector(state => state.TDCSocialNetworkReducer)
  const [offset, setOffset] = useState(0)
  const t = useTranslation()
  const dispatch = useAppDispatch()
  const group = useMemo(() => {
    if (isAdmin(userLogin)) {
      return "group_connect_business"
    }

    return ""
  }, [userLogin])

  const faculty = useMemo(() => {
    if (isFaculty(userLogin)) {
      return userLogin.code
    }

    return ""
  }, [userLogin])

  const { data, isLoading, isFetching } = useGetPostsQuery({
    active: 0,
    group: group,
    ownerFaculty: faculty,
    limit: LIMIT,
    offset: offset
  }, { refetchOnFocus: true, refetchOnMountOrArgChange: true })

  const [posts, setPosts] = useState<PostResponseModel[]>([])

  useEffect(() => {
    if (data) {
      setPosts([...posts, ...data.data])
    }
  }, [data])

  useEffect(() => {
    console.log(buildPostSearchRequest({
      active: 0,
      group: group,
      ownerFaculty: faculty,
      limit: LIMIT,
      offset: offset
    }))
  }, [offset])

  useEffect(() => {
    if (postRejectId) {
      setPosts([...posts].filter(post => post.id !== postRejectId))
      dispatch(setPostRejectId(undefined))
    }
  }, [postRejectId])

  useEffect(() => {
    if (postAcceptId) {
      setPosts([...posts].filter(post => post.id !== postAcceptId))
      dispatch(setPostAcceptId(undefined))
    }
  }, [postAcceptId])

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
                        type={POST_APPROVAL}
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