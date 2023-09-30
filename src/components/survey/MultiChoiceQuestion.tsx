import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper'
import RadioInputWithTitle from '../inputs/RadioInputWithTitle'
import CheckboxInputWithTitle from '../inputs/CheckboxInputWithTitle'

export default function MultiChoiceQuestion() {
    const [value, setValue] = React.useState('first')

    return (
        <View style={styles.itemBody}>
            <Text style={styles.questionTitle}>Bạn có đi làm thêm vào thứ mấy?</Text>
            <CheckboxInputWithTitle label='Thứ 2' checked={true}/>
            <CheckboxInputWithTitle label='Thứ 3' />
            <CheckboxInputWithTitle label='Thứ 4' />
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