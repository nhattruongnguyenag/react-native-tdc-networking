import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import IconButton from '../buttons/IconButton'
import { PURPLE_COLOR } from '../../constants/Color'

interface MessageBottomBarProps {
  onButtonSendPress?: () => void
  onButtonImagePickerPress?: () => void
  onInputMessageContent?: (value: string) => void
  onInputMessageFocus?: () => void
  onInputMessageBlur?: () => void
  textInputMessageRef: LegacyRef<TextInput>
}

export default function MessageBottomBar(props: MessageBottomBarProps) {
  const [messageContent, setMessageContent] = useState('')

  return (
    <View style={styles.inputMessageGroup}>
      <TextInput
        value={messageContent}
        ref={props.textInputMessageRef}
        onChangeText={(value) => {
          setMessageContent(value)
          props.onInputMessageContent && props.onInputMessageContent(value)
        }}
        placeholder='Tin nhắn'
        style={styles.inputMessage}
        cursorColor={PURPLE_COLOR}
        multiline
      />

      <IconButton
        iconSize={22}
        width={50}
        height={50}
        iconName='paper-plane'
        iconColor={PURPLE_COLOR +  (messageContent.trim().length > 0 ? 'FF' : '80')}
        onPress={() => {
          if (props.onButtonSendPress && messageContent.trim().length > 0) {
            props.onButtonSendPress()
          }
          setMessageContent('')
        }}
        inactiveBackgroundColor={PURPLE_COLOR + '00'}
        activeBackgroundColor={PURPLE_COLOR + '40'}
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
    paddingVertical: 7
  }
})
