import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Divider } from 'react-native-paper'

export default function DrawerHeader() {
    return (
        <View style={styles.body}>
            <Avatar.Image style={styles.avatar} size={60} source={{ uri: 'https://i.stack.imgur.com/bl1g5.png?s=192&g=1' }} />
            <Text style={styles.textName}>Nguyen Van A</Text>
            <Text style={styles.textEmail}>nguyenvana@gmail.com</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        borderTopWidth: 20,
        borderTopColor: '#e0e0e0',
        padding: 10
    },
    avatar: {
        marginTop: 5
    },
    textName: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
        marginTop: 2
    },
    textEmail: {
        color: '#000',
        marginTop: 2,
        fontSize: 14,
        marginBottom: 5
    }
})