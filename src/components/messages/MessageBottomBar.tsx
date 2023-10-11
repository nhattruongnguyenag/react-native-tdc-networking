import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { LegacyRef, useEffect, useRef } from 'react'
import IconButton from '../buttons/IconButton'
import { PURPLE_COLOR } from '../../constants/Color'

interface MessageBottomBarProps {
    onButtonSendPress?: () => void
    onButtonImagePickerPress?: () => void
    onInputMessageContent?: (value: string) => void
    textInputMessageRef: LegacyRef<TextInput>
}


export default function MessageBottomBar(props: MessageBottomBarProps) {
    return (
        <View style={styles.inputMessageGroup}>
            <IconButton
                iconSize={20}
                iconName='images'
                iconColor={PURPLE_COLOR}
                onPress={
                    () => props.onButtonImagePickerPress && props.onButtonImagePickerPress()
                }
                inactiveBackgroundColor={PURPLE_COLOR + "00"}
                activeBackgroundColor={PURPLE_COLOR + "4d"}
            />

            <TextInput
                ref={props.textInputMessageRef}
                onChangeText={(value) => props.onInputMessageContent && props.onInputMessageContent(value)}
                placeholder='Tin nhắn' style={styles.inputMessage}
                cursorColor={PURPLE_COLOR} multiline />

            <IconButton
                iconSize={20}
                iconName='paper-plane'
                iconColor={PURPLE_COLOR}
                onPress={
                    () => props.onButtonSendPress && props.onButtonSendPress()
                }
                inactiveBackgroundColor={PURPLE_COLOR + "00"}
                activeBackgroundColor={PURPLE_COLOR + "40"}
                customStyle={{ marginLeft: 'auto' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputMessageGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    inputMessage: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 20,
        fontSize: 16,
        marginHorizontal: 5,
        paddingVertical: 5
    }
})