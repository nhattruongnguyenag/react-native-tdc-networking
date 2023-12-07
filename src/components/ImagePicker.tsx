import React, { useEffect } from 'react'
import { LogBox, PermissionsAndroid } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import { ExternalDirectoryPath, moveFile } from 'react-native-fs'
import {
    Asset,
    CameraOptions,
    ImageLibraryOptions,
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker'
import { useAppDispatch } from '../redux/Hook'

interface ImagePickerProps {
  optionsRef: (ref: ActionSheet | null) => void
  onResult: (images: Asset[]) => void
}

export default function ImagePicker({ optionsRef, onResult }: ImagePickerProps) {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'Warning: componentWillReceiveProps has been renamed'])
  }, [])

  const dispatch = useAppDispatch()

  return (
    <ActionSheet
      ref={(ref) => {
        optionsRef(ref)
      }}
      options={['Camera', 'Gallery', 'Cancel']}
      cancelButtonIndex={2}
      destructiveButtonIndex={2}
      onPress={async (index: number) => {
        if (index === 0) {
          const options: CameraOptions = {
            mediaType: 'photo',
            saveToPhotos: true
          }

          try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              launchCamera(options, (res: ImagePickerResponse) => {
                if (res.assets) {
                    onResult(res.assets)
                }
              })
            } else {
              console.log('Camera permission denied')
            }
          } catch (err) {
            console.warn(err)
          }
        } else if (index === 1) {
          const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 50
          }

          launchImageLibrary(options, (res: ImagePickerResponse) => {
            if (res.assets) {
               onResult(res.assets)
            }
          })
        }
      }}
    />
  )
}

const handleImagePickerResult = (res: ImagePickerResponse): string | null => {
  let newFilePath = null
  if (res.didCancel) {
    console.log('INFO', 'User cancel image picker')
  } else if (res.errorCode) {
    console.log('ERROR', res.errorMessage)
  } else {
    const filePath = res.assets ? res.assets[0].uri : ''
    newFilePath = ExternalDirectoryPath + '/' + Date.now().toString() + '.jpg'
    moveFile(filePath as string, newFilePath)
  }
  return newFilePath
}