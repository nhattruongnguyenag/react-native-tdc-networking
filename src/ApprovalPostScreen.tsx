import React, { Fragment, useMemo, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Loading from './components/common/Loading'
import ModalPostRejectReason from './components/postApproval/ModalPostRejectReason'
import PostApprovalItem, { PostRejectedLog } from './components/postApproval/PostApprovalItem'
import { useAppDispatch, useAppSelector } from './redux/Hook'
import { useGetPostsQuery } from './redux/Service'
import { isAdmin, isFaculty } from './utils/UserHelper'

export default function ApprovalPostScreen() {
  const {userLogin} = useAppSelector(state => state.TDCSocialNetworkReducer)
  const group = useMemo(() => {
    if (isAdmin(userLogin)) {
      return "group_connect_business"
    }

    return ""
  }, [userLogin])

  const faculty = useMemo(() => {
    if (isFaculty(userLogin)) {
      console.log(userLogin.code)
      return userLogin.code
    }

    return ""
  }, [userLogin])

  const { data, isLoading } = useGetPostsQuery({
    active: 0,
    group: group,
    ownerFaculty: faculty
  }, {pollingInterval: 5000})

  return (
    <SafeAreaView style={styles.body}>
      {
        isLoading ? <Loading title="Đang tải dữ liệu..." />
          :
          <Fragment>
            {
              data?.data.length ?
                <Fragment>
                  <FlatList
                    data={data?.data}
                    renderItem={({ item, index }) =>
                      <PostApprovalItem
                        post={item}
                      />}
                  />
                  <ModalPostRejectReason />
                </Fragment>
                :
                <Text style={{ marginTop: -60 }}>Chưa có bài viết mới</Text>
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