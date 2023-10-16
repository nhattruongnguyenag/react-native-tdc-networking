import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLOR_BLACK, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { closeModalImage, openModalImage } from '../../redux/Slice'
import CustomizeLayoutImageNotify from '../CustomizeLayoutImageNotify'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils'
// Definition type
type CustomizeModalImageType = {
  visible: boolean
}
const CustomizeModalImage = () => {
  const { modalImageData } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  const [imageActive, setImageActive] = useState(0)
  // Function
  const handleCheckImageHaveError = (id: number) => {
    let result: Boolean = false
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
  return (
    <Modal statusBarTranslucent={true} transparent>
      <ScrollView
        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {modalImageData?.images.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              dispatch(closeModalImage())
            }}
            style={styles.wrapperContent}
          >
            <Pressable style={styles.containerContent}>
              {/* Header */}
              <View style={styles.wrapHeaderModalImage}>
                <Pressable style={styles.userInfoRight} onPress={() => console.log('go to profile')}>
                  <Image style={styles.avatar} source={{ uri: modalImageData?.avatar }} />
                  <Text style={styles.useName} numberOfLines={1}>
                    {modalImageData?.name}
                  </Text>
                </Pressable>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(closeModalImage())
                  }}
                >
                  <IconAntDesign name='close' size={30} color={COLOR_BLACK} />
                </TouchableOpacity>
              </View>

              {handleCheckImageHaveError(item.id) ? (
                <>
                  <CustomizeLayoutImageNotify />
                </>
              ) : (
                <>
                  <Image style={styles.showMainImage} source={{ uri: item.image }} />
                </>
              )}
            </Pressable>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: '15%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {modalImageData?.images.map((item, index) => (
          <Text
            key={item.id}
            style={
              imageActive == index
                ? {
                    marginHorizontal: 2,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#fff'
                  }
                : {
                    marginHorizontal: 2,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'black'
                  }
            }
          ></Text>
        ))}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
  }
})
export default CustomizeModalImage
