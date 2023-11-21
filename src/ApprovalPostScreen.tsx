import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import RecruitmentPostApprovalItem from './components/postApproval/RecruitmentPostApprovalItem'
import HeaderPostApprovalItem from './components/postApproval/HeaderPostApprovalItem'
import SurveyPostApprovalItem from './components/postApproval/SurveyPostApprovalItem'
import TextImagePostApprovalItem from './components/postApproval/TextImagePostApprovalItem'
import PostApprovalItem from './components/postApproval/PostApprovalItem'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST } from './constants/Variables'
import { useGetAllWaitingPostQuery } from './redux/Service'
import ModalPostRejectReason from './components/postApproval/ModalPostRejectReason'

export default function ApprovalPostScreen() {
  const { data, isLoading, isSuccess, error } = useGetAllWaitingPostQuery()

  return (
    <Fragment>
      <FlatList
        style={styles.body}
        data={data?.data}
        renderItem={({ item, index }) => <PostApprovalItem post={item} />}
      />
      <ModalPostRejectReason />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff'
  }
})