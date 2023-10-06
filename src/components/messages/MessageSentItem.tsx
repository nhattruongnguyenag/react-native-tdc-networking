import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { Message } from '../../types/Messages'

const AVATAR_HEIGHT = 30
const BACKGROUND_COLOR = '#6942f4'

interface MessageSentItemProps {
    showDate: boolean
    data: Message
}

export default function MessageSentItem({showDate, data}: MessageSentItemProps) {
    return (
        <View style={styles.body}>
            <View style={styles.mainContentGroup}>
                <View style={styles.messageContentGroup}>
                    <Text style={styles.messageTextContent}>{data?.content}</Text>
                </View>
                <Avatar.Image size={AVATAR_HEIGHT} source={{ uri: 'https://i.stack.imgur.com/bl1g5.png?s=192&g=1' }} />
            </View>
            <Text style={[styles.messageDate, {display: showDate ? 'flex' : 'none'}]}>6:45 AM</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: 10
    },
    mainContentGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    messageContentGroup: {
        backgroundColor: BACKGROUND_COLOR,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginEnd: 10,
        maxWidth: 300,
        minWidth: 95
    },
    messageTextContent: {
        color: '#fff',
        fontSize: 16
    },
    messageDate: {
        marginStart: 'auto',
        marginEnd: AVATAR_HEIGHT + 35,
        fontSize: 11,
        marginTop: 7,
        marginBottom: 10
    }
})