import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { deleteQuestion, setSurveyPostRequest, updateQuestion } from '../../redux/Slice'
import ToggleSwitch from 'toggle-switch-react-native'
import { QUESTION_BOTTOM_BAR_QUESTION_REQUIRE_TOGGLE } from '../../constants/StringVietnamese'

interface QuestionBottomBarOptionsProps {
    index?: number
    editMode?: boolean
    reviewMode?: boolean
    conductMode?: boolean
}

export default function QuestionBottomBarOptions(props: QuestionBottomBarOptionsProps) {
    const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const dispatch = useAppDispatch()

    const onBtnDeletePress = () => {
        if (props.index) {
            dispatch(deleteQuestion(props.index))
        }
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

            <ToggleSwitch
                isOn={switchToggle}
                onColor="green"
                offColor="gray"
                label={QUESTION_BOTTOM_BAR_QUESTION_REQUIRE_TOGGLE}
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
        marginEnd: 0
    }
})