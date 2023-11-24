import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderPostApprovalItem from './HeaderPostApprovalItem'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import { PostResponseModal } from '../../types/response/PostResponseModal'
import { TextImagePostResponseModal } from '../../types/response/TextImagePostResponseModal'
import { RecruitmentResponsePostModal } from '../../types/response/RecruitmentResponsePostModal'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { RECRUITMENT_DETAIL_SCREEN } from '../../constants/Screen'
import { PostApprovalItemProps } from './PostApprovalItem'

function isRecruitmentPost(post?: any): post is RecruitmentResponsePostModal {
    return post !== undefined && post instanceof Object && post !== null && 'salary' in post
}

export default function RecruitmentPostApprovalItem(props: PostApprovalItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [recruitmentPost, setRecruitmentPost] = useState<RecruitmentResponsePostModal>({} as RecruitmentResponsePostModal)

    const handleClickBtnRecruitmentDetailEvent = (idPost: number) => {
        console.log(idPost)
        navigation.navigate(RECRUITMENT_DETAIL_SCREEN, { postId: idPost })
    }

    useEffect(() => {
        if (isRecruitmentPost(props.post)) {
            setRecruitmentPost(props.post)
        }
    }, [props.post])

    return (
        <View>
            <CustomizeRecruitmentPost
                id={recruitmentPost.id}
                location={recruitmentPost.location ?? 'Đang tải...'}
                title={recruitmentPost.title ?? 'Đang tải...'}
                salary={String(recruitmentPost.salary) ?? '0'}
                employmentType={recruitmentPost.employmentType ?? 'Đang tải...'}
                handleClickBtnSeeDetailEvent={() => handleClickBtnRecruitmentDetailEvent(recruitmentPost.id)}
                createdAt={recruitmentPost.createdAt ?? new Date()}
            />
        </View>
    )
}

const styles = StyleSheet.create({})