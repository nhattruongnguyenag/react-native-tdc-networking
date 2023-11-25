import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../../App'
import { RECRUITMENT_DETAIL_SCREEN } from '../../constants/Screen'
import { RecruitmentResponsePostModal } from '../../types/response/RecruitmentResponsePostModal'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
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

    const t = useTranslation()

    return (
        <CustomizeRecruitmentPost
            id={recruitmentPost.id}
            location={recruitmentPost.location ?? t('PostApproveItem.isLoading')}
            title={recruitmentPost.title ?? t('PostApproveItem.isLoading')}
            salary={String(recruitmentPost.salary) ?? '0'}
            employmentType={recruitmentPost.employmentType ?? t('PostApproveItem.isLoading')}
            handleClickBtnSeeDetailEvent={() => handleClickBtnRecruitmentDetailEvent(recruitmentPost.id)}
            createdAt={recruitmentPost.createdAt ?? new Date()}
        />
    )
}

const styles = StyleSheet.create({})