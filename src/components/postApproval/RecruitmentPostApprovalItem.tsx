import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../../App'
import { RECRUITMENT_DETAIL_SCREEN } from '../../constants/Screen'
import { RecruitmentPostResponseModel } from '../../types/response/RecruitmentPostResponseModel'
import { isRecruitmentPost } from '../../utils/PostHelper'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import { PostApprovalItemProps } from './PostApprovalItem'

export default function RecruitmentPostApprovalItem(props: PostApprovalItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [recruitmentPost, setRecruitmentPost] = useState<RecruitmentPostResponseModel>({} as RecruitmentPostResponseModel)

    const handleClickBtnRecruitmentDetailEvent = (idPost: number) => {
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
            salary={recruitmentPost.salary ? String(recruitmentPost.salary.toLocaleString()) : ''}
            employmentType={recruitmentPost.employmentType ?? t('PostApproveItem.isLoading')}
            handleClickBtnSeeDetailEvent={() => handleClickBtnRecruitmentDetailEvent(recruitmentPost.id)}
            createdAt={recruitmentPost.createdAt ?? new Date()}
        />
    )
}