import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import ToggleSwitch from 'toggle-switch-react-native'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { deleteQuestion, updateQuestion } from '../../redux/Slice'
import { Question } from '../../types/Question'

interface QuestionBottomBarOptionsProps {
    index?: number
    editMode?: boolean
    reviewMode?: boolean
    conductMode?: boolean
    onBtnUpdateQuestionPress?: (questionIndex: number) => void
}

export default function QuestionBottomBarOptions(props: QuestionBottomBarOptionsProps) {
    const t = useTranslation()
    const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const dispatch = useAppDispatch()

    const onBtnDeletePress = () => {
        dispatch(deleteQuestion(props.index))
    }

    const [switchToggle, setSwitchToggle] = useState(true)

    useEffect(() => {
        let questionUpdate = [...surveyPostRequest?.questions ?? []][props.index ?? -1]
        questionUpdate = {
            ...questionUpdate,
            required: switchToggle ? 1 : 0
        }
        if (surveyPostRequest) {
            dispatch(updateQuestion({
                index: props.index ?? -1,
                question: questionUpdate
            }))
        }
    }, [switchToggle])

    return (
        <View style={[styles.body, { display: props.reviewMode || props.conductMode ? 'none' : 'flex' }]}>
            <IconButton
                icon='delete'
                iconColor='#f70000'
                size={25}
                style={[styles.btnDelete]}
                onPress={() => {
                    onBtnDeletePress()
                }}
            />

            <IconButton
                icon='square-edit-outline'
                iconColor='#14a44d'
                size={25}
                onPress={() => {
                    props.onBtnUpdateQuestionPress && props.onBtnUpdateQuestionPress(props.index ?? -1)
                }}
            />

            <ToggleSwitch
                isOn={switchToggle}
                onColor="#6f42c1"
                offColor="gray"
                label={t('QuestonBottomBarOptions.questionBottomBarQuestionRequireToggle')}
                size="small"
                onToggle={() => {
                    setSwitchToggle(!switchToggle)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnDelete: {
        marginStart: 'auto',
        marginEnd: 5
    }
})