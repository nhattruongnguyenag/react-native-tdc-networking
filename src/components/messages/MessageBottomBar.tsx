import React, { LegacyRef, useState } from 'react'
import { useTranslation } from 'react-multi-lang'
import { StyleSheet, TextInput, View } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import { Asset } from 'react-native-image-picker'
import { PURPLE_COLOR } from '../../constants/Color'
import IconButton from '../buttons/IconButton'
import CustomizedImagePicker from '../CustomizedImagePicker'
import ImagePicker from '../ImagePicker'

interface MessageBottomBarProps {
  onButtonSendPress?: () => void
  onButtonImagePickerPress?: () => void
  onInputMessageContent?: (value: string) => void
  onInputMessageFocus?: () => void
  onInputMessageBlur?: () => void
  onImagePickerResult: (result: Asset[]) => void
  textInputMessageRef: LegacyRef<TextInput>
}

export default function MessageBottomBar(props: MessageBottomBarProps) {
  const t = useTranslation()
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
        placeholder={t('MessageBottomBar.messageBottomBarComponentInputTextPlaceholder')}
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

      <ImagePicker optionsRef={(ref) => setImagePickerOptionsRef(ref)} onResult={(result) => props.onImagePickerResult(result)}/>
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
