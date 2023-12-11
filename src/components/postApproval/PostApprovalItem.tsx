import React, { Fragment } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST } from '../../constants/Variables'
import { PostResponseModal } from '../../types/response/PostResponseModal'
import { SCREEN_WIDTH } from '../../utils/SystemDimensions'
import SkeletonPostItem from '../SkeletonPostItem'
import HeaderPostApprovalItem from './HeaderPostApprovalItem'
import RecruitmentPostApprovalItem from './RecruitmentPostApprovalItem'
import SurveyPostApprovalItem from './SurveyPostApprovalItem'
import TextImagePostApprovalItem from './TextImagePostApprovalItem'

export interface PostRejectedLog {
    postId: number
    content: string
}

export const POST_APPROVAL = 0
export const POST_PENDING = 1
export const POST_REJECT = 2

export interface PostApprovalItemProps {
    type?: number
    post?: PostResponseModal
    onAcceptedPost?: (postId: number) => void
    loading?: boolean
}

export default function PostApprovalItem(props: PostApprovalItemProps) {

    return (
        <Pressable style={styles.container}>
            {
                props.loading ?
                    <SkeletonPostItem />
                    :
                    <Fragment>
                        <HeaderPostApprovalItem
                            type={props.type}
                            post={props.post}
                            onAcceptedPost={props.onAcceptedPost}
                        />

                        <View style={styles.postBody}>
                            {props.post?.type === TYPE_NORMAL_POST && <TextImagePostApprovalItem post={props.post} />}
                            {props.post?.type === TYPE_RECRUITMENT_POST && <RecruitmentPostApprovalItem post={props.post} />}
                            {props.post?.type === TYPE_SURVEY_POST && <SurveyPostApprovalItem post={props.post} />}
                        </View>
                    </Fragment>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 20,
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