import React, { useEffect, useState } from 'react'
import { LogBox } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker'

interface ImagePickerOptionsProps {
  optionsRef: (ref: ActionSheet | null) => void
  onResult: (result: ImageOrVideo) => void
}

export default function CustomizedImagePicker({ optionsRef, onResult }: ImagePickerOptionsProps) {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'Warning: componentWillReceiveProps has been renamed'])
  }, [])

  return (
    <ActionSheet
      ref={(ref) => {
        optionsRef(ref)
      }}
      options={['Camera', 'Gallery', 'Cancel']}
      cancelButtonIndex={2}
      destructiveButtonIndex={2}
      onPress={(index: number) => {
        if (index === 0) {
          ImagePicker.openCamera({
            width: 300,
            height: 400
          }).then((image) => {
            onResult(image)
          })
        } else if (index == 1) {
          ImagePicker.openPicker({
            mediaType: 'any',
            showCropFrame: true,
            width: 300,
            height: 400,
            cropping: true
          }).then((image) => {
            onResult(image)
          })
        }
      }}
    />
  )
}
