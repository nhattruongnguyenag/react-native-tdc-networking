import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  Alert,
  Keyboard
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR_BUTTON, COLOR_WHITE, COLOR_BORDER, COLOR_BLACK } from '../constants/Color'
import IconButton from '../components/buttons/IconButton'
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from '../utils/SystemDimensions'
import { TEXT_ADD_IMAGES, TEXT_AGREE, TEXT_CANCEL, TEXT_CHAR, TEXT_COMPLETE, TEXT_CREATE_POST_FAIL, TEXT_CREATE_POST_SUCCESS, TEXT_DEFINITE_QUESTION, TEXT_DETAILED_WARNING_CONTENT_NULL, TEXT_DETAILED_WARNING_CONTENT_NUMBER_LIMITED, TEXT_INPUT_PLACEHOLDER, TEXT_NOTIFYCATIONS, TEXT_PLACEHOLDER_INPUT_COMMENT, TEXT_TITLE, TEXT_WARNING } from '../constants/StringVietnamese'
import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import CustomizeModalLoading from '../components/modal/CustomizeModalLoading'
import ActionSheet from 'react-native-actionsheet'
import CustomizedImagePicker from '../components/CustomizedImagePicker'
import { useAppSelector } from '../redux/Hook'
import { isLengthInRange, isNotBlank } from '../utils/ValidateUtils'
import { NUMBER_MAX_CHARACTER, NUMBER_MIN_CHARACTER } from '../constants/Variables'

// man hinh dang bai viet thong
export default function CreateNormalPostScreen({ navigation }: any) {
  // Variable
  let alertString = null;
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<any>([]);
  const apiUrl = SERVER_ADDRESS + 'api/posts/normal';
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { userLogin, imagesUpload } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  // Function area
  const handlePutDataAPI = async (postData: any): Promise<number> => {
    try {
      const response = await axios.post(apiUrl, postData)
      return response.data.status
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  const handleClickCompleteButton = async () => {
    if (isNotBlank(content.trim()) && isLengthInRange(content.trim(), NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER)) {
      try {
        const data = {
          images: images ?? [],
          type: 'thong-thuong',
          userId: 1,
          content: content
        }
        // Send
        const status = await handlePutDataAPI(data)
        // Reset data
        setContent('')
        setImages([])
        console.log(status)
        setIsLoading(false)
        if (status === 201) {
          showAlert(TEXT_NOTIFYCATIONS, TEXT_CREATE_POST_SUCCESS, false)
          Keyboard.dismiss()
        } else {
          showAlert(TEXT_NOTIFYCATIONS, TEXT_CREATE_POST_FAIL, false)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      if (isNotBlank(content.trim()) === false && isLengthInRange(content.trim(), NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER) === false) {
        alertString = TEXT_DETAILED_WARNING_CONTENT_NULL + 'Và' + TEXT_DETAILED_WARNING_CONTENT_NUMBER_LIMITED + `${NUMBER_MAX_CHARACTER}` + TEXT_CHAR;
      } else if (isNotBlank(content.trim()) === false) {
        alertString = TEXT_DETAILED_WARNING_CONTENT_NULL
      } else {
        alertString = TEXT_DETAILED_WARNING_CONTENT_NUMBER_LIMITED + `${NUMBER_MAX_CHARACTER} ` + TEXT_CHAR;
      }
      Alert.alert(TEXT_CREATE_POST_FAIL, alertString)
    }
  }

  const HandleClickIntoIconBtnArrowLeft = () => {
    navigation.goBack();
  }
  const handleLongClickIntoImage = async (imageName: string) => {
    let result: boolean = false
    result = await showAlert(TEXT_WARNING, TEXT_DEFINITE_QUESTION, true)
    if (result) {
      handleDeleteImage(imageName)
    } else {
      console.log('không xóa')
    }
  }

  const showAlert = async (title: string, messenger: string, QA: boolean) => {
    if (QA) {
      return new Promise<boolean>((resolve) => {
        Alert.alert(
          title,
          messenger,
          [
            {
              text: TEXT_AGREE,
              onPress: () => {
                resolve(true)
              }
            },
            {
              text: TEXT_CANCEL,
              onPress: () => {
                resolve(false)
              }
            }
          ],
          { cancelable: false }
        )
      })
    } else {
      return new Promise<boolean>((resolve) => {
        Alert.alert(
          title,
          messenger,
          [
            {
              text: TEXT_AGREE,
              onPress: () => {
                resolve(true)
              }
            }
          ],
          { cancelable: false }
        )
      })
    }
  }

  const handleDeleteImage = (imageName: string) => {
    const newImage = images.filter((item: any) => item !== imageName)
    setImages(newImage)
  }

  useEffect(() => {
    if (imagesUpload && imagesUpload.length != 0) {
      if (images && images.length != 0) {
        setImages([...images, ...imagesUpload])
      } else {
        setImages(imagesUpload)
      }
    }
  }, [imagesUpload])

  return (
    <>
      <CustomizeModalLoading visible={isLoading} />
      <View style={styles.container}>
        {/* Tab bar area */}
        {/* Wrap tab bar */}
        <View style={styles.tabBarContainer}>
          {/* Tab bar */}
          <View style={styles.wrapTabBar}>
            <TouchableOpacity onPress={() => HandleClickIntoIconBtnArrowLeft()}>
              <IconEntypo name={'chevron-left'} size={25} color={COLOR_BLACK} />
            </TouchableOpacity>
            <Text style={styles.tabBarTxt}>{TEXT_TITLE}</Text>
            <TouchableOpacity onPress={handleClickCompleteButton} style={styles.wrapTabBarBtnRight}>
              <Text style={styles.tabBarBtnRightTxt}>{TEXT_COMPLETE}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Body */}
        <View
          style={[styles.wrapperBody, { paddingBottom: images != null && images.length > 0 ? WINDOW_HEIGHT * 0.3 : 0 }]}
        >
          <TextInput
            value={content}
            onChangeText={(value) => setContent(value)}
            scrollEnabled={false}
            style={styles.txtBody}
            placeholder={TEXT_INPUT_PLACEHOLDER}
            placeholderTextColor={COLOR_BLACK}
            multiline={true}
            textAlignVertical='top'
          />
        </View>
        {/* Bottom */}
        {images != null && images.length != 0 && (
          <View style={styles.wrapperBodyImage}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {images.length != 0 &&
                images.map((item: any, index: number) => (
                  <Pressable
                    onLongPress={() => handleLongClickIntoImage(item)}
                    onPress={() => {
                      console.log(123)
                    }}
                    key={index.toString()}
                    style={styles.wrapImage}
                  >
                    <Image style={styles.image} source={{ uri: SERVER_ADDRESS + `api/images/${item}` }} />
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        )}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => imagePickerOption?.show()}>
            <View style={styles.wrapBottom}>
              <IconButton
                iconSize={18}
                iconName='images'
                iconColor='#fff'
                onPress={() => imagePickerOption?.show()}
                inactiveBackgroundColor='#ffffff00'
                activeBackgroundColor='#ffffff1a'
              />
              <CustomizedImagePicker optionsRef={(ref) => setImagePickerOption(ref)} />
              <Text style={styles.bottomText}>{TEXT_ADD_IMAGES}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT
  },
  tabBarContainer: {
    borderLeftWidth1: 1,
    borderRightWidth1: 1,
    borderBottomWidth: 1,
    borderColor: COLOR_BORDER,
    width: '100%'
  },
  // Header
  tabBarTxt: {
    color: COLOR_BLACK,
    fontWeight: 'bold',
    fontSize: 16
  },
  wrapTabBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: SCREEN_HEIGHT * 0.08,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  wrapTabBarBtnRight: {
    width: 77,
    height: 31,
    backgroundColor: COLOR_BUTTON,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarBtnRightTxt: {
    color: COLOR_WHITE,
    fontSize: 14
  },
  // Body
  wrapperBody: {
    height: SCREEN_HEIGHT * 0.75,
    zIndex: 999
  },
  txtBody: {
    color: COLOR_BLACK,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%'
  },
  // Image
  image: {
    width: '100%',
    height: '100%'
  },
  wrapImage: {
    width: 150,
    height: 200,
    padding: 2,
    zIndex: 999
  },
  // Bottom
  wrapBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomText: {
    color: COLOR_WHITE,
    fontWeight: '700'
  },
  bottomContainer: {
    height: SCREEN_HEIGHT * 0.07,
    backgroundColor: COLOR_BUTTON,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperBodyImage: {
    zIndex: 999,
    backgroundColor: COLOR_WHITE,
    position: 'absolute',
    bottom: '18%'
  }
})
