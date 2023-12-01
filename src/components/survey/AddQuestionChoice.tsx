import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-multi-lang'
import { useAppDispatch } from '../../redux/Hook'
import TextInputWithBottomBorder from '../inputs/TextInputWithBottomBorder'
import { Question } from '../../types/Question'
import { IconButton } from 'react-native-paper'

export interface QuestionUpdate {
    index: number
    data: Question
}

interface AddChoicesProps {
    questionUpdate?: QuestionUpdate
    question: Question
    onDeleteChoice: (index: number) => void
    onAddChoice: () => void
    onChoiceContentTextChange: (index: number, value: string) => void
}

const DELETE_CHOICE = 0
const ADD_CHOICE = 1

export default function AddQuestionChoice(props: AddChoicesProps) {
    const t = useTranslation()

    const buttonChoiceMode = useCallback((index: number) => {
        if (props.question?.choices && props.question.choices.length && index !== props.question.choices.length - 1) {
            return DELETE_CHOICE
        } else {
            return ADD_CHOICE
        }
    }, [props.question])
    return (
        <Fragment>
            <Text style={{ marginLeft: 10, marginTop: 15, fontSize: 16, fontWeight: 'bold', color: '#000' }}>
                {t('AddQuestionView.addQuestionViewComponentChoiceInputPlaceholder')}
            </Text>
            <View style={{ paddingHorizontal: 15 }}>
                {
                    props.question?.choices?.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TextInputWithBottomBorder
                                    defaultValue={item.content}
                                    onTextChange={(value) => props.onChoiceContentTextChange(index, value)}
                                    placeholder={`${t('AddQuestionView.addQuestionViewComponentChoiceInputPlaceholder')} ${index + 1}...`}
                                />
                                <IconButton
                                    icon={buttonChoiceMode(index) === DELETE_CHOICE ? 'delete' : 'plus'}
                                    iconColor={buttonChoiceMode(index) === DELETE_CHOICE ? '#f70000' : '#037fe8'}
                                    size={22}
                                    onPress={() => {
                                        if (buttonChoiceMode(index) === DELETE_CHOICE) {
                                            props.onDeleteChoice(index)

                                        } else {
                                            props.onAddChoice()
                                        }
                                    }}
                                />
                            </View>
                        )
                    })
                }
            </View>
        </Fragment>
    )
}