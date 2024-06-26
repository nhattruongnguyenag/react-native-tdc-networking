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
import { COLOR_BUTTON, COLOR_WHITE, COLOR_BORDER, COLOR_BLACK, COLOR_GREY } from '../constants/Color'
import IconButton from '../components/buttons/IconButton'
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from '../utils/SystemDimensions'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import CustomizeModalLoading from '../components/modal/CustomizeModalLoading'
import ActionSheet from 'react-native-actionsheet'
import { useAppSelector } from '../redux/Hook'
import { isLengthInRange, isNotBlank } from '../utils/ValidateUtils'
import { NUMBER_MAX_CHARACTER, NUMBER_MIN_CHARACTER, TYPE_NORMAL_POST } from '../constants/Variables'
import { handlePutDataAPI, updateNormalPostAPI } from '../api/CallApi'
import { NormalPost } from '../types/NormalPost'
import { useTranslation } from 'react-multi-lang'
import ImagePicker from '../components/ImagePicker'
import { Asset } from 'react-native-image-picker'
import { handleUploadImage } from '../utils/ImageHelper'
import { useUpdateNormalPostMutation } from '../redux/Service'

interface ImageUpdate {
  id: number,
  uri: string
}

export default function CreateNormalPostScreen({ navigation, route }: any) {
  const t = useTranslation();
  const { group, updateNormalPost } = route.params
  let alertString = null
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const apiUrl = SERVER_ADDRESS + 'api/posts/normal'
  const [imagePickerOption, setImagePickerOption] = useState<ActionSheet | null>()
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [userId, setUserId] = useState<number>(userLogin?.id ?? 0);
  const [postId, setPostId] = useState<number>(-1);
  const [imagePicker, setImagePicker] = useState<Asset[] | null>(null);
  const [type, setType] = useState<string>(TYPE_NORMAL_POST);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [updatePost, updatePostResponse] = useUpdateNormalPostMutation()

  useEffect(() => {
    if (updateNormalPost != undefined) {
      setPostId(updateNormalPost.postId);
      setContent(updateNormalPost.content);
      const listImages = updateNormalPost.images.map((item: ImageUpdate) => { return item.uri })
      setImages(listImages)
    }
  }, [updateNormalPost])

  const handleClickCompleteButton = async () => {
    if (isNotBlank(content.trim()) && isLengthInRange(content.trim(), NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER)) {
      try {
        if (postId === -1) {
          const data: NormalPost = {
            images: images ?? [],
            type: type,
            userId: userId,
            content: content,
            groupId: group === -1 ? null : group,
          }
          const status = await handlePutDataAPI(apiUrl, data)
          setIsLoading(false)
          if (status === 201) {
            showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyCreateNewPostSuccess"), false)
            setContent('');
            setImagePicker(null);
            setImages([]);
            Keyboard.dismiss()
            navigation.goBack();
          } else {
            showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyCreateNewPostFail"), false)
          }
        } else {
          const data = {
            postId: postId,
            content: content,
            images: images
          }

          updatePost(data)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      if (
        isNotBlank(content.trim()) === false &&
        isLengthInRange(content.trim(), NUMBER_MIN_CHARACTER, NUMBER_MAX_CHARACTER) === false
      ) {
        alertString =
          `${t("AlertNotify.alertNotifyPostContentCannotNull")}` +
          ', ' +
          `${t("AlertNotify.alertNotifyPostContentHaveNumberCharacterGreaterThanLimitedNumber")}` +
          " " + `${NUMBER_MAX_CHARACTER}` + " " + `${t("AlertNotify.alertNotifyCharacter")}`;
      } else if (isNotBlank(content.trim()) === false) {
        alertString = t("AlertNotify.alertNotifyPostContentCannotNull")
      } else {
        alertString = `${t("AlertNotify.alertNotifyPostContentHaveNumberCharacterGreaterThanLimitedNumber")}` + " " + NUMBER_MAX_CHARACTER + " " + `${t("AlertNotify.alertNotifyCharacter")}`;
      }
      Alert.alert(t("AlertNotify.alertNotifyCreateNewPostFail"), alertString)
    }
  }

  useEffect(() => {
    setIsLoading(false)
    if (updatePostResponse.data) {
      if (updatePostResponse.data.status == 201) {
        setContent('');
        setImagePicker(null);
        setImages([]);
        showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyUpdatePostSuccess"), false)
        Keyboard.dismiss()
        navigation.goBack();
      } else {
        showAlert(t("AlertNotify.alertNotifyTitle"), t("AlertNotify.alertNotifyUpdatePostFail"), false)
      }
    }
  }, [updatePostResponse.data])

  const HandleClickIntoIconBtnArrowLeft = () => {
    setContent('');
    setImagePicker(null);
    setImages([]);
    navigation.goBack()
  }

  const handleLongClickIntoImage = async (imageName: string) => {
    let result: boolean = false
    result = await showAlert(t("CreateNormalPost.createNormalPostAllerTitle"), t("CreateNormalPost.createNormalPostAllertQuestion"), true)
    if (result) {
      handleDeleteImage(imageName)
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
              text: t("AlertNotify.alertNotifyTextAccept"),
              onPress: () => {
                resolve(true)
              }
            },
            {
              text: t("AlertNotify.alertNotifyTextReject"),
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
              text: `${t("CreateNormalPost.createNormalPostAllertButton")}`,
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
    const newImage = images.filter((item: string) => item !== imageName)
    setImages(newImage)
  }

  useEffect(() => {
    if (Boolean(imagePicker)) {
      setIsUploadingImage(true);
      handleUploadImage(imagePicker ?? [], (data) => {
        setImages([...images, ...data])
        setIsUploadingImage(false)
      })
    }
  }, [imagePicker])

  return (
    <>
      {
        isLoading ? <CustomizeModalLoading /> : <View style={styles.container}>
          {/* Tab bar area */}
          {/* Wrap tab bar */}
          <View style={styles.tabBarContainer}>
            {/* Tab bar */}
            <View style={styles.wrapTabBar}>
              <TouchableOpacity onPress={() => HandleClickIntoIconBtnArrowLeft()}>
                <IconEntypo name={'chevron-left'} size={25} color={COLOR_BLACK} />
              </TouchableOpacity>
              <Text style={styles.tabBarTxt}>{postId === -1 ? t("CreateNormalPost.createNormalPostTitle") : t("CreateNormalPost.updateNormalPostTitle")}</Text>
              <TouchableOpacity disabled={isUploadingImage} onPress={handleClickCompleteButton} style={isUploadingImage ? styles.wrapTabBarBtnRightUnAble : styles.wrapTabBarBtnRightAble}>
                <Text style={styles.tabBarBtnRightTxt}>{t("CreateNormalPost.createNormalPostButtonFinish")}</Text>
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
              placeholder={t("CreateNormalPost.createNormalPostPlaceholder")}
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
                  images.map((item: string, index: number) => (
                    <Pressable
                      onLongPress={() => handleLongClickIntoImage(item)}
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
                <ImagePicker
                  optionsRef={(ref) => setImagePickerOption(ref)}
                  onResult={(result) => {
                    setImagePicker(result)
                  }}
                />
                <Text style={styles.bottomText}>{t("CreateNormalPost.createNormalPostButtonText")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      }
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
  wrapTabBarBtnRightAble: {
    width: 77,
    height: 31,
    backgroundColor: COLOR_BUTTON,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapTabBarBtnRightUnAble: {
    width: 77,
    height: 31,
    backgroundColor: COLOR_GREY,
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