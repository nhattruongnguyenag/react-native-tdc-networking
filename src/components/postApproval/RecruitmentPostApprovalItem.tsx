import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, View } from 'react-native'
import { RootStackParamList } from '../../App'
import { RECRUITMENT_DETAIL_SCREEN } from '../../constants/Screen'
import { RecruitmentResponsePostModal } from '../../types/response/RecruitmentResponsePostModal'
import { isRecruitmentPost } from '../../utils/PostHelper'
import CustomizeRecruitmentPost from '../recruitmentPost/CustomizeRecruitmentPost'
import { PostApprovalItemProps } from './PostApprovalItem'

export default function RecruitmentPostApprovalItem(props: PostApprovalItemProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [recruitmentPost, setRecruitmentPost] = useState<RecruitmentResponsePostModal>({} as RecruitmentResponsePostModal)

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
        id={recruitmentPost.id ?? -1}
        location={recruitmentPost.location ?? ''}
        title={recruitmentPost.title ?? ''}
        salary={recruitmentPost.salary ? recruitmentPost.salary.toLocaleString() : ''}
        employmentType={recruitmentPost.employmentType ?? ''}
        handleClickBtnSeeDetailEvent={handleClickBtnRecruitmentDetailEvent}
        createdAt={recruitmentPost.timeCreatePost}
        current={t('RecruitmentPost.recruitmentPostCurrency')}
        textButton={t('RecruitmentPost.recruitmentPostButtonSeeDetail')}
      />
    )
}