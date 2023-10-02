import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

interface ButtonFullWithProps {
    title?: string
    onPress?: () => void
}

export default function ButtonFullWith(props: ButtonFullWithProps) {
    return (
        <Button icon="plus"
            mode="elevated"
            buttonColor={'#0065FF'}
            textColor={'#fff'}
            style={styles.buttonCreateRecruitment}
            onPress={() => props.onPress && props.onPress()}>
            <Text style={styles.buttonCreateRecruitmentTitle}>{props.title}</Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    buttonCreateRecruitment: {
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 30,
        marginHorizontal: 5
    },
    buttonCreateRecruitmentTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})