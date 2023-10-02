import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Checkbox, RadioButton } from 'react-native-paper'

interface CheckboxInputWithTitleProps {
    label?: string
    checked?: boolean
}

export default function CheckboxInputWithTitle(props: CheckboxInputWithTitleProps) {
    return (
        <View style={styles.radioInputBody}>
            <Checkbox.Android status={props.checked ? 'checked' : 'unchecked'} />
            <Text style={styles.radioInputTitle}>{props.label ?? ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    radioInputBody: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#000'
    },
    radioInputTitle: {
        fontSize: 16
    }
})