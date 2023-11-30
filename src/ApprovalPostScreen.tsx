import React, { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-multi-lang'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import Loading from './components/common/Loading'
import ModalPostRejectReason from './components/postApproval/ModalPostRejectReason'
import PostApprovalItem, { POST_APPROVAL } from './components/postApproval/PostApprovalItem'
import { useAppSelector } from './redux/Hook'
import { useGetPostsQuery } from './redux/Service'
import { isAdmin, isFaculty } from './utils/UserHelper'

export default function ApprovalPostScreen() {
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer)
  const t = useTranslation()
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

  const { data, isLoading } = useGetPostsQuery({
    active: 0,
    group: group,
    ownerFaculty: faculty
  }, {refetchOnFocus: true, refetchOnMountOrArgChange: true})

  return (
    <SafeAreaView style={styles.body}>
      {
        isLoading ? <Loading title={t('ApprovingScreen.isLoading')} />
          :
          <Fragment>
            {
              data?.data.length ?
                <Fragment>
                  <FlatList
                    data={data?.data}
                    renderItem={({ item, index }) =>
                      <PostApprovalItem
                        type={POST_APPROVAL}
                        post={item}
                      />}
                  />
                  <ModalPostRejectReason />
                </Fragment>
                :
                <Text style={{ marginTop: -60 }}>{t('ApprovingScreen.emptyMessage')}</Text>
            }
          </Fragment>
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