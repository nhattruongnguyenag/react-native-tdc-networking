import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'

export default function QuestionTitle() {
    return (
        <View style={styles.body}>
            <Text style={styles.questionTitle}>Bạn có đi làm thêm vào thứ mấy?</Text>
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
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnDelete: {
        marginStart: 'auto',
        marginEnd: 0
    }
})