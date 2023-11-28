import { StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useMemo } from 'react'
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

export default function AddQuestionChoice(props: AddChoicesProps) {
    const t = useTranslation()
    return (
        <Fragment>
            <Text style={{ marginLeft: 10, marginTop: 15, fontSize: 16, fontWeight: 'bold', color: '#000' }}>
                {t('AddQuestionView.addQuestionViewComponentChoiceInputPlaceholder')}
            </Text>
            <View style={{ paddingHorizontal: 15 }}>
                {
                    props.question.choices.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <TextInputWithBottomBorder
                                    defaultValue={item.content}
                                    onTextChange={(value) => props.onChoiceContentTextChange(index, value)}
                                    placeholder={`${t('AddQuestionView.addQuestionViewComponentChoiceInputPlaceholder')} ${index + 1}...`}
                                />
                                <IconButton
                                    icon={index !== props.question.choices.length - 1 ? 'delete' : 'plus'}
                                    iconColor={index !== props.question.choices.length - 1 ? '#f70000' : '#037fe8'}
                                    size={22}
                                    onPress={() => {
                                        if (index === props.question.choices.length - 1) {
                                            props.onAddChoice()
                                        } else {
                                            props.onDeleteChoice(index)
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