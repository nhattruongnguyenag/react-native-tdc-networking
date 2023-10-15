import axios from 'axios'
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
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { useAppDispatch } from '../redux/Hook'
import { setImagesUpload } from '../redux/Slice'
import { Data } from '../types/Data'

interface ImagePickerOptionsProps {
  optionsRef: (ref: ActionSheet | null) => void
  onResult?: (data: any) => void
}

export default function CustomizedImagePicker({ optionsRef, onResult }: ImagePickerOptionsProps) {
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
                  handleUploadImage(res.assets, onResult ? onResult : (data) => {
                    dispatch(setImagesUpload(data as string[]))
                  })
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
              handleUploadImage(res.assets, onResult ? onResult : (data) => {
                dispatch(setImagesUpload(data as string[]))
              })
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

const handleUploadImage = (imagesRequest: Asset[], onResult: (data: any) => void) => {
  const formData = new FormData()

  imagesRequest.forEach((item, index) => {
    const tempPhoto = {
      uri: item.uri,
      type: item.type,
      name: item.fileName,
    };
    formData.append('files', tempPhoto)
  })

  axios.post(SERVER_ADDRESS + 'api/upload/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    console.log("TEST:", res.data)
    onResult((res.data as Data<string[]>).data)

  }).catch(error => {
    console.log(error);
  });
}