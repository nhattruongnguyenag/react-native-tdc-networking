import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'

interface QuestionTitleProps {
    title?: string
}

export default function QuestionTitle(props: QuestionTitleProps) {
    return (
        <View style={styles.body}>
            <Text style={styles.questionTitle}>{props.title}</Text>
            <IconButton
                icon="close"
                size={25}
                style={styles.btnDelete}
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    questionTitle: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnDelete: {
        marginStart: 'auto',
        marginEnd: 0
    }
})