import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLOR_BLACK, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { closeModalImage } from '../../redux/Slice'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/SystemDimensions'
import CustomizeImageModalShow from './CustomizeImageModalShow'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { PROFILE_SCREEN } from '../../constants/Screen'

const CustomizeModalImage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { modalImageData, userIdOfProfileNow, currentScreenNowIsProfileScreen } = useAppSelector(
    (state) => state.TDCSocialNetworkReducer
  )
  const dispatch = useAppDispatch()
  const [imageActive, setImageActive] = useState(0)
  // Function
  const handleCheckImageHaveError = (id: number) => {
    let result: boolean = false
    modalImageData?.listImageError.some((item: number) => {
      if (item === id) {
        result = true
      }
    })
    return result
  }

  const onChange = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != imageActive) {
        setImageActive(slide)
      }
    }
  }

  const closeModal = () => {
    dispatch(closeModalImage())
  }

  const handleClickIntoUserNameOrAvatarEvent = () => {
    if (userIdOfProfileNow !== modalImageData?.userId) {
      closeModal()
      if (currentScreenNowIsProfileScreen) {
        navigation.replace(PROFILE_SCREEN, { userId: modalImageData?.userId ?? 0 })
      } else {
        navigation.navigate(PROFILE_SCREEN, { userId: modalImageData?.userId ?? 0 })
      }
    }
  }

  return (
    <Modal statusBarTranslucent={true} transparent>
      <ScrollView
        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {modalImageData?.images.map((item, index) => (
          <CustomizeImageModalShow
            key={item.id}
            closeModal={closeModal}
            data={item}
            authorInfo={modalImageData}
            handleCheckImageHaveError={handleCheckImageHaveError}
            handleClickIntoUserNameOrAvatarEvent={handleClickIntoUserNameOrAvatarEvent}
          />
        ))}
      </ScrollView>
      <View style={styles.container}>
        {modalImageData?.images.map((item, index) => (
          <Text key={item.id} style={imageActive == index ? styles.nodeActive : styles.nodeUnActive}></Text>
        ))}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperContent: {
    width: WINDOW_WIDTH,
    backgroundColor: COLOR_MODAL,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerContent: {
    width: WINDOW_WIDTH * 0.8,
    height: WINDOW_HEIGHT * 0.6,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: COLOR_WHITE,
    overflow: 'hidden'
  },
  showMainImage: {
    width: '100%',
    height: '90%'
  },
  btnClose: {
    position: 'absolute',
    top: 10,
    zIndex: 999,
    right: 10
  },
  wrapHeaderModalImage: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    zIndex: 999,
    height: '10%',
    backgroundColor: COLOR_WHITE
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR_BLACK
  },
  userInfoRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  useName: {
    color: COLOR_BLACK,
    marginLeft: 10,
    fontWeight: 'bold',
    width: '75%'
  },
  nodeActive: {
    margin: 2,
    marginHorizontal: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  nodeUnActive: {
    marginHorizontal: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    margin: 2
  }
})
export default CustomizeModalImage
