import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import IconButton from '../buttons/IconButton'
import { PURPLE_COLOR } from '../../constants/Color'
import ActionSheet from 'react-native-actionsheet'
import CustomizedImagePicker from '../CustomizedImagePicker'
import { MESSAGE_BOTTOM_BAR_COMPONENT_INPUT_TEXT_PLACEHOLDER } from '../../constants/StringVietnamese'

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

  const [imagePickerOptionsRef, setImagePickerOptionsRef] = useState<ActionSheet | null>()

  return (
    <View style={styles.inputMessageGroup}>
      <IconButton
        iconSize={22}
        width={50}
        height={50}
        iconName='image'
        iconColor={PURPLE_COLOR}
        onPress={() => {
          imagePickerOptionsRef?.show()
        }}
        inactiveBackgroundColor={PURPLE_COLOR + '00'}
        activeBackgroundColor={PURPLE_COLOR + '40'}
        customStyle={{ marginLeft: 'auto' }}
      />

      <TextInput
        value={messageContent}
        ref={props.textInputMessageRef}
        onChangeText={(value) => {
          setMessageContent(value)
          props.onInputMessageContent && props.onInputMessageContent(value)
        }}
        placeholder={MESSAGE_BOTTOM_BAR_COMPONENT_INPUT_TEXT_PLACEHOLDER}
        style={styles.inputMessage}
        cursorColor={PURPLE_COLOR}
        multiline
      />

      <IconButton
        iconSize={22}
        width={50}
        height={50}
        iconName='paper-plane'
        iconColor={PURPLE_COLOR + (messageContent.trim().length > 0 ? 'FF' : '80')}
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

      <CustomizedImagePicker optionsRef={(ref) => setImagePickerOptionsRef(ref)} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputMessageGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: -10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
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
