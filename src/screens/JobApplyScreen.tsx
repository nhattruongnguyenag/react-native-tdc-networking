import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ToastAndroid } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import Pdf from 'react-native-pdf'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import { RootStackParamList } from '../App'
import ButtonFullWith from '../components/buttons/ButtonFullWith'
import { BACKGROUND_BLUE } from '../constants/Color'
import { useAppSelector } from '../redux/Hook'
import { useJobApplyMutation } from '../redux/Service'
import { Data } from '../types/Data'
import { FileUploadRequest } from '../types/request/FileUploadRequest'
import { handleUploadDocumentFiles, handleUploadImages } from '../utils/UploadUtils'

const cvSourceDefalutValue: FileUploadRequest = {
  uri: '',
  type: '',
  size: 0,
  name: ''
}

export default function JobApplyScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const route = useRoute<RouteProp<RootStackParamList, 'JOB_APPLY_SCREEN'>>()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [jobApplyRequest, jobApplyResponse] = useJobApplyMutation()
  const [isBtnFinishDisable, setBtnFinishDisable] = useState(true)
  const [cvSource, setCVSource] = useState<FileUploadRequest>(cvSourceDefalutValue)

  const onBtnAddCVPress = async () => {
    DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      copyTo: 'cachesDirectory'
    })
      .then((result) => {
        setCVSource({
          uri: result[0].fileCopyUri ?? '',
          size: result[0].size ?? 0,
          type: result[0].type ?? '',
          name: result[0].name ?? ''
        })
      })
      .catch((error) => console.log(error))
  }

  const renderCVDocumentView = () => {
    if (cvSource.type.includes('image')) {
      return <Image style={{ flex: 1, objectFit: 'scale-down' }} source={{ uri: cvSource.uri }} />
    }

    return (
      <Pdf
        trustAllCerts={false}
        source={cvSource}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`)
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`)
        }}
        onError={(error) => {
          console.log(error)
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`)
        }}
        style={{ flex: 1 }}
      />
    )
  }

  const onBtnFinishJobApplyPress = () => {
    if (!Boolean(cvSource.size)) {
      Alert.alert('Thông báo', 'Vui lòng thêm CV')
    }

    const onResult = (result: Data<string[]>) => {
      if (result.status === 200 || result.status === 201) {
        jobApplyRequest({
          user_id: userLogin?.id ?? -1,
          post_id: route.params?.recruitmentPostId ?? -1,
          cv_url: result.data[0]
        })
      }
    }

    if (cvSource.type.includes('image')) {
      handleUploadImages([cvSource], onResult)
    } else {
      handleUploadDocumentFiles([cvSource], onResult)
    }
  }

  useEffect(() => {
    if (jobApplyResponse.isSuccess && jobApplyResponse.data) {
      Alert.alert(
        'Thông báo',
        'Hồ sơ của bạn đã được gửi đi thành công.\nChúng tôi sẽ liên hệ lại trong thời gian sớm nhất. Cảm ơn bạn đã nộp hồ sơ.'
      )
      navigation.goBack()
    }
  }, [jobApplyResponse])

  return (
    <View style={styles.body}>
      <Pressable
        style={({ pressed }) => [styles.btnContainer, { opacity: pressed ? 0.7 : 1 }]}
        onPress={() => {
          onBtnAddCVPress()
        }}
      >
        <Text style={styles.btnTitle}>{cvSource.size === 0 ? 'Thêm CV' : 'Chọn lại CV'}</Text>
        <FontAwesome6Icon style={styles.btnIcon} name='upload' size={20} color='#fff' />
      </Pressable>

      <View style={styles.cvSource}>{renderCVDocumentView()}</View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <ButtonFullWith
          textColor='#000'
          btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
          onPress={() => {
            setCVSource(cvSourceDefalutValue)
            navigation.goBack()
          }}
          iconName='arrow-left-thin'
          title='Quay lại'
        />

        <ButtonFullWith
          btnStyle={{ marginLeft: 10, width: 140 }}
          onPress={() => {
            onBtnFinishJobApplyPress()
          }}
          iconName='plus'
          title='Hoàn tất'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  btnContainer: {
    backgroundColor: BACKGROUND_BLUE,
    flexDirection: 'row',
    flexShrink: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  btnTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  btnIcon: {
    marginStart: 10
  },
  cvSource: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#eee',
    paddingBottom: 5
  }
})