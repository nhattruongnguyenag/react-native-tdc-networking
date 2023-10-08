import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR_BUTTON, COLOR_WHITE, COLOR_BORDER, COLOR_BLACK } from '../constants/Color'
import IconButton from '../components/buttons/IconButton'

const { width, height } = Dimensions.get('screen')
const TEXT_COMPLETE = 'Hoàn tất'
const TEXT_TITLE = 'Thêm bài viết'
const TEXT_INPUT_PLACEHOLDER = 'Hãy nhập nội dung bài viết.'
const TEXT_ADD_IMAGES = 'Thêm hình ảnh'
// man hinh dang bai viet thong thuong
export default function CreateNormalPostScreen({ navigation }: any) {
  // Function area
  const handleClickPickerImageButton = () => {
    console.log('change to picker images screen')
  }

  const handleClickCompleteButton = () => {
    console.log('Finish')
  }

  const handleClickBackIcon = () => {
    console.log('Back')
  }

  return (
    <View style={styles.container}>
      {/* Tab bar area */}
      {/* Wrap tab bar */}
      <View style={styles.tabBarContainer}>
        {/* Tab bar */}
        <View style={styles.wrapTabBar}>
          <IconButton
            iconSize={18}
            iconName='chevron-left'
            iconColor={COLOR_BLACK}
            onPress={handleClickBackIcon}
            inactiveBackgroundColor='#ffffff00'
            activeBackgroundColor='#ffffff1a'
          />
          <Text style={styles.tabBarTxt}>{TEXT_TITLE}</Text>
          <TouchableOpacity onPress={handleClickCompleteButton} style={styles.wrapTabBarBtnRight}>
            <Text style={styles.tabBarBtnRightTxt}>{TEXT_COMPLETE}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Body */}
      <View style={styles.wrapperBody}>
        <TextInput
          scrollEnabled={false}
          style={styles.txtBody}
          placeholder={TEXT_INPUT_PLACEHOLDER}
          placeholderTextColor={COLOR_BLACK}
          multiline={true}
        />
        {/* images container when user post images */}
        <View style={styles.wrapperBodyImage}>{/* TODO */}</View>
      </View>
      {/* Bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleClickPickerImageButton}>
          <View style={styles.wrapBottom}>
            <IconButton
              iconSize={18}
              iconName='images'
              iconColor='#fff'
              onPress={() => {}}
              inactiveBackgroundColor='#ffffff00'
              activeBackgroundColor='#ffffff1a'
            />
            <Text style={styles.bottomText}>{TEXT_ADD_IMAGES}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height
  },
  tabBarContainer: {
    borderLeftWidth1: 1,
    borderRightWidth1: 1,
    borderBottomWidth: 1,
    borderColor: COLOR_BORDER
  },
  // Header
  tabBarTxt: {
    color: COLOR_BLACK,
    fontWeight: 'bold',
    fontSize: 16
  },
  wrapTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height * 0.08,
    alignItems: 'center',
    marginHorizontal: 10
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
    height: height * 0.75
  },
  txtBody: {
    color: COLOR_BLACK,
    paddingHorizontal: 10
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
    height: height * 0.07,
    backgroundColor: COLOR_BUTTON,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperBodyImage: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: 0
  }
})
