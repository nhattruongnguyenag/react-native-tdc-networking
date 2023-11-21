import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { RootStackParamList } from '../../App'
import { SURVEY_CONDUCT_SCREEN } from '../../constants/Screen'
import { SurveyResponsePostModal } from '../../types/response/SurveyResponsePostModal'
import CustomizeSurveyPost from '../surveyPost/CustomizeSurveyPost'
import { PostApprovalItemProps } from './PostApprovalItem'

function isSurveyPost(post?: any): post is SurveyResponsePostModal {
    return post !== undefined && post instanceof Object && post !== null && 'questions' in post
}

export default function SurveyPostApprovalItem(props: PostApprovalItemProps) {
    const [surveyPost, setSurveyPost] = useState<SurveyResponsePostModal>({} as SurveyResponsePostModal)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    useEffect(() => {
        if (isSurveyPost(props.post)) {
            setSurveyPost(props.post)
        }
    }, [])

    const handleClickBtnSurveyDetailEvent = (idPost: number) => {
        navigation.navigate(SURVEY_CONDUCT_SCREEN, { surveyPostId: idPost })
    }

    return (
        <CustomizeSurveyPost
            id={surveyPost.id}
            title={surveyPost.title ?? 'Đang tải...'}
            handleClickBtnSeeDetailEvent={() => handleClickBtnSurveyDetailEvent(surveyPost.id)}
            description={surveyPost.description ?? 'Đang tải...'}
        />
    )
}

const styles = StyleSheet.create({})