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
  const [isFirstLoading, setIsFirstLoading] = useState(true)
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
    ownerFaculty: faculty
  }, { refetchOnFocus: true, refetchOnMountOrArgChange: true })

  const [posts, setPosts] = useState<PostResponseModel[]>([])

  useEffect(() => {
    if (data) {
      setIsFirstLoading(false)
      setPosts([...posts, ...data.data])
    }
  }, [data])

  return (
    <SafeAreaView style={styles.body}>
      {
        isLoading ? <Loading title={t('PenddingPostScreen.loading')} />
          :
          <>
            {
              data && data.data.length > 0 ?
                <>
                  <FlatList
                    data={data.data}
                    renderItem={({ item, index }) =>
                      <PostApprovalItem
                        post={item}
                        type={POST_APPROVAL}
                        loading={isFetching && index === posts.length - 1}
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