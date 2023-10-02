import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import RadioInputWithTitle from '../inputs/RadioInputWithTitle'
import QuestionTitle from './QuestionTitle'

export default function OneChoiceQuestion() {
    const [value, setValue] = React.useState('Có đi làm thêm.')

    return (
        <View style={styles.itemBody}>
            <QuestionTitle title='Bạn có đi làm thêm không?' />
            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                <RadioInputWithTitle label='Có đi làm thêm.' value='0' />
                <RadioInputWithTitle label='Không đi làm thêm.' value='1' />
            </RadioButton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    itemBody: {
        marginTop: 10,
        marginHorizontal: 5
    }
})