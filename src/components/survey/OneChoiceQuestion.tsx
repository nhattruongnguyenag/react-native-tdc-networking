import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import RadioInputWithTitle from '../inputs/RadioInputWithTitle'

export default function OneChoiceQuestion() {
    const [value, setValue] = React.useState('Có đi làm thêm.')

    return (
        <View style={styles.itemBody}>
            <Text style={styles.questionTitle}>Bạn có đi làm thêm không?</Text>
            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                <RadioInputWithTitle label='Có đi làm thêm.' value='0'/>
                <RadioInputWithTitle label='Không đi làm thêm.' value='1'/>
            </RadioButton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    itemBody: {
        marginTop: 10,
        marginHorizontal: 5
    },
    questionTitle: {
        color: '#000',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
})