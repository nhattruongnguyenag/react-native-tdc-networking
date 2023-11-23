import React, { Fragment, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Loading from './components/common/Loading'
import ModalPostRejectReason from './components/postApproval/ModalPostRejectReason'
import PostApprovalItem, { PostRejectedLog } from './components/postApproval/PostApprovalItem'
import { useAppDispatch } from './redux/Hook'
import { useGetAllWaitingPostQuery } from './redux/Service'

export default function ApprovalPostScreen() {
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetAllWaitingPostQuery()

  return (
    <Fragment>
      {
        isLoading ? <Loading title="Đang tải dữ liệu..."/>
      :
      <Fragment>
        <FlatList
          style={styles.body}
          data={data?.data}
          renderItem={({ item, index }) =>
            <PostApprovalItem
              post={item}
            />}
        />
        <ModalPostRejectReason />
      </Fragment>
      }

    </Fragment>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff'
  }
})