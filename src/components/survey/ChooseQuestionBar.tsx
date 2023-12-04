import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-multi-lang';
import AddQuestionModal, { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION, SHORT_ANSWER } from './AddQuestionModal';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Choice, Question } from '../../types/Question';

export interface QuestionType {
    icon: string
    name: string
    value: string
}

interface ChooseQuestionBarProps {
    onQuestionTypeDropdownChange: (type: QuestionType) => void
}

export default function ChooseQuestionBar(props: ChooseQuestionBarProps) {
    const t = useTranslation()

    const questionTypes: QuestionType[] = [
        {
            icon: 'file-alt',
            name: t('AddQuestionView.addQuestionViewComponentShortAnswer'),
            value: SHORT_ANSWER
        },
        {
            icon: 'check-circle',
            name: t('AddQuestionView.addQuestionViewComponentOneChoiceQuestion'),
            value: ONE_CHOICE_QUESTION
        },
        {
            icon: 'check-square',
            name: t('AddQuestionView.addQuestionViewComponentMultiChoiceQuestion'),
            value: MULTI_CHOICE_QUESTION
        }
    ]

    const [selectedType, setSelectedType] = useState<QuestionType | null>(null)

    const onQuestionTypeDropdownChange = (item: QuestionType) => {
        let choices: Choice[] = []
        if (item.value !== SHORT_ANSWER) {
            const initialChoice: Choice = {
                content: ""
            }
            choices = [initialChoice, initialChoice, initialChoice]
        }
        props.onQuestionTypeDropdownChange(item)
    }

    const renderItem = (item: QuestionType) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginStart: 10 }}>
                <Text style={{ margin: 5, fontSize: 16 }}>{item.name}</Text>
                <FontAwesome5Icon name={item.icon} size={16} style={{ marginStart: 'auto', marginEnd: 10 }} />
            </View>
        )
    }
    return (
        <Fragment>
            <View style={styles.body}>
                <Dropdown
                    style={styles.dropdown}
                    data={questionTypes}
                    search
                    labelField='name'
                    valueField='value'
                    placeholder={t('AddQuestionView.addQuestionViewComponentQuestionTypeDropdownTitle')}
                    searchPlaceholder={t('AddQuestionView.addQuestionViewComponentQuestionTypeDropdownSearch')}
                    value={selectedType?.value}
                    onChange={(item) => onQuestionTypeDropdownChange(item)}
                    renderItem={renderItem}
                />
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#00000099',
        elevation: 5
    },
    dropdown: {
        flex: 1,
        borderColor: '#97A1B0',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginStart: 5,
        marginEnd: 10
    }
})