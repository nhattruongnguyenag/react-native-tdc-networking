import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton, RadioButton } from 'react-native-paper'
import RadioInputWithTitle from '../inputs/RadioInputWithTitle'
import CheckboxInputWithTitle from '../inputs/CheckboxInputWithTitle'
import QuestionTitle from './QuestionTitle'

export default function MultiChoiceQuestion() {
    const [value, setValue] = React.useState('first')

    return (
        <View style={styles.itemBody}>
            <QuestionTitle />
            <CheckboxInputWithTitle label='Thứ 2' checked={true} />
            <CheckboxInputWithTitle label='Thứ 3' />
            <CheckboxInputWithTitle label='Thứ 4' />
        </View>
    )
}

const styles = StyleSheet.create({
    itemBody: {
        marginTop: 10,
        marginHorizontal: 5
    }
})