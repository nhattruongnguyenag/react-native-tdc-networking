import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST } from '../../constants/Variables'
import { PostResponseModal } from '../../types/response/PostResponseModal'
import HeaderPostApprovalItem from './HeaderPostApprovalItem'
import RecruitmentPostApprovalItem from './RecruitmentPostApprovalItem'
import SurveyPostApprovalItem from './SurveyPostApprovalItem'
import TextImagePostApprovalItem from './TextImagePostApprovalItem'

export interface PostRejectedLog {
    postId: number
    content: string
}
export interface PostApprovalItemProps {
    post?: PostResponseModal
    onAcceptedPost?: (postId: number) => void
}

export default function PostApprovalItem(props: PostApprovalItemProps) {

    return (
        <Pressable style={styles.container}>
            <HeaderPostApprovalItem
             post={props.post} 
             onAcceptedPost={props.onAcceptedPost}
             />

            <View style={styles.postBody}>
                {props.post?.type === TYPE_NORMAL_POST && <TextImagePostApprovalItem post={props.post} />}
                {props.post?.type === TYPE_RECRUITMENT_POST && <RecruitmentPostApprovalItem post={props.post} />}
                {props.post?.type === TYPE_SURVEY_POST && <SurveyPostApprovalItem post={props.post} />}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        elevation: 10,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 5
    },
    postBody: {
        marginBottom: 10
    }
})