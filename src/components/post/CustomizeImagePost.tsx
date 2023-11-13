import { View, Text, Image, StyleSheet, TouchableOpacity, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR_MODAL, COLOR_WHITE } from '../../constants/Color'
import CustomizeLayoutImageNotify from './CustomizeLayoutImageNotifyPost'
import { SCREEN_HEIGHT} from '../../utils/SystemDimensions'
import { Images } from '../../types/Images'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'

// Hide log warning to export image error
LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

// Definition props

interface ImagePostType {
  images: Images[]
  handleClickIntoAnyImageEvent: (flag: any, arr: Array<number>) => void
}

// Constant

const TYPE_LAYOUT_WIDTH_GREATER_HEIGHT = 1
const TYPE_LAYOUT_HEIGHT_GREATER_WIDTH = 2
const TYPE_LAYOUT_WIDTH_BALANCE_HEIGHT = 3
const CustomizeImagePost = (props: ImagePostType) => {
  // Variable

  const [typeImageLayout, setTypeImageLayout] = useState(-1)
  const [numberImageRemaining, setNumberImageRemaining] = useState(0)
  const imageQty = props.images?.length
  const [listImageError, setListImageError] = useState([] as any)

  // Function

  const handleAddImageToListError = (id: any) => {
    setListImageError([...listImageError, id])
  }

  const handleCheckImageHaveError = (image: any) => {
    let result = false
    listImageError.some((item: any) => {
      if (item === image.id) {
        result = true
      }
      return result
    })
    return result
  }

  useEffect(() => {
    if (props.images && props.images.length > 0) {
      setNumberImageRemaining(props.images.length - 5)
      try {
        Image.getSize(props.images[0].uri, (width, height) => {
          if (width > height) {
            setTypeImageLayout(TYPE_LAYOUT_WIDTH_GREATER_HEIGHT)
          } else if (height > width) {
            setTypeImageLayout(TYPE_LAYOUT_HEIGHT_GREATER_WIDTH)
          } else {
            setTypeImageLayout(TYPE_LAYOUT_WIDTH_BALANCE_HEIGHT)
          }
        })
      } catch (error) {
        setTypeImageLayout(TYPE_LAYOUT_WIDTH_GREATER_HEIGHT)
      }
    }
  }, [])

  switch (imageQty) {
    // 1 dieu kien sap xep
    case 1:
      return (
        <TouchableOpacity
          onPress={() => props.handleClickIntoAnyImageEvent(props.images[0].id, listImageError)}
          style={styles.wrapImage}
        >
          {handleCheckImageHaveError(props.images[0]) ? (
            <CustomizeLayoutImageNotify />
          ) : (
            <Image
              onError={() => handleAddImageToListError(props.images[0].id)}
              style={styles.imageOnePost}
              source={{ uri: SERVER_ADDRESS + `api/images/${props.images[0].uri}` }}
            />
          )}
        </TouchableOpacity>
      )
    case 2:
      // co 3 kieu sap xep
      if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
        return (
          <View style={styles.wrapImage}>
            {props.images.map((item, index) => (
              <TouchableOpacity
                onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                key={item.id}
                style={styles.widthGreaterHeight}
              >
                {handleCheckImageHaveError(item) ? (
                  <CustomizeLayoutImageNotify />
                ) : (
                  <Image
                    onError={() => handleAddImageToListError(item.id)}
                    style={styles.imageOnePost}
                    source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )
      } else if (typeImageLayout === TYPE_LAYOUT_HEIGHT_GREATER_WIDTH) {
        return (
          <View style={[styles.wrapImage, styles.wrapImageRow]}>
            {props.images.map((item, index) => (
              <TouchableOpacity
                onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                key={item.id}
                style={styles.heightGreaterWidth}
              >
                {handleCheckImageHaveError(item) ? (
                  <CustomizeLayoutImageNotify />
                ) : (
                  <Image
                    onError={() => handleAddImageToListError(item.id)}
                    style={styles.imageOnePost}
                    source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )
      } else {
        return (
          <View style={[styles.wrapImageSquare, styles.wrapImageRow, styles.justifyContent]}>
            {props.images.map((item, index) => (
              <TouchableOpacity
                onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                key={item.id}
                style={styles.heightGreaterWidth}
              >
                {handleCheckImageHaveError(item) ? (
                  <CustomizeLayoutImageNotify />
                ) : (
                  <Image
                    onError={() => handleAddImageToListError(item.id)}
                    style={styles.imageOnePost}
                    source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )
      }
    case 3:
      // chi co 2 kieu sap xep
      if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
        return (
          <View style={styles.wrapImage}>
            <TouchableOpacity
              onPress={() => props.handleClickIntoAnyImageEvent(props.images[0].id, listImageError)}
              key={props.images[0].id}
              style={styles.widthGreaterHeight}
            >
              {handleCheckImageHaveError(props.images[0]) ? (
                <CustomizeLayoutImageNotify />
              ) : (
                <Image
                  onError={() => handleAddImageToListError(props.images[0].id)}
                  style={styles.imageOnePost}
                  source={{ uri: SERVER_ADDRESS + `api/images/${props.images[0].uri}` }}
                />
              )}
            </TouchableOpacity>
            <View style={[styles.widthGreaterHeight, styles.wrapImageRow, styles.justifyContent]}>
              {props.images.slice(1, 3).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.heightGreaterWidth}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      } else {
        return (
          <View style={[styles.wrapImage, styles.wrapImageRow]}>
            <TouchableOpacity
              onPress={() => props.handleClickIntoAnyImageEvent(props.images[0].id, listImageError)}
              key={props.images[0].id}
              style={styles.heightGreaterWidth}
            >
              {handleCheckImageHaveError(props.images[0]) ? (
                <CustomizeLayoutImageNotify />
              ) : (
                <Image
                  onError={() => handleAddImageToListError(props.images[0].id)}
                  style={styles.imageOnePost}
                  source={{ uri: SERVER_ADDRESS + `api/images/${props.images[0].uri}` }}
                />
              )}
            </TouchableOpacity>
            <View style={[styles.heightGreaterWidth, styles.justifyContent]}>
              {props.images.slice(1, 3).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.widthGreaterHeight}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      }
    case 4:
      // co 3 kieu sap xep
      if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
        return (
          <View style={[styles.wrapImage, { justifyContent: 'space-between' }]}>
            {
              <TouchableOpacity
                onPress={() => props.handleClickIntoAnyImageEvent(props.images[0].id, listImageError)}
                key={props.images[0].id}
                style={styles.biggestWithGreaterHeight}
              >
                {handleCheckImageHaveError(props.images[0]) ? (
                  <CustomizeLayoutImageNotify />
                ) : (
                  <Image
                    onError={() => handleAddImageToListError(props.images[0].id)}
                    style={styles.imageOnePost}
                    source={{ uri: SERVER_ADDRESS + `api/images/${props.images[0].uri}` }}
                  />
                )}
              </TouchableOpacity>
            }
            <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
              {props.images.slice(1, 4).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.smallImageBottom}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <></>
          </View>
        )
      } else if (typeImageLayout === TYPE_LAYOUT_HEIGHT_GREATER_WIDTH) {
        return (
          <View style={[styles.wrapImage, styles.wrapImageRow]}>
            <TouchableOpacity
              onPress={() => props.handleClickIntoAnyImageEvent(props.images[0].id, listImageError)}
              key={props.images[0].id}
              style={styles.biggestHeightGreaterWidth}
            >
              {handleCheckImageHaveError(props.images[0]) ? (
                <CustomizeLayoutImageNotify />
              ) : (
                <Image
                  onError={() => handleAddImageToListError(props.images[0].id)}
                  style={styles.imageOnePost}
                  source={{ uri: SERVER_ADDRESS + `api/images/${props.images[0].uri}` }}
                />
              )}
            </TouchableOpacity>
            <View style={styles.rightWrapImageFour}>
              {props.images.slice(1, 4).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.smallImageRight}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <></>
          </View>
        )
      } else {
        return (
          <View style={[styles.wrapImage, { flexWrap: 'wrap' }]}>
            {props.images.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                key={item.id}
                style={[styles.imageSquare, index % 2 === 0 ? styles.marginRight : null]}
              >
                {handleCheckImageHaveError(item) ? (
                  <CustomizeLayoutImageNotify />
                ) : (
                  <Image
                    onError={() => handleAddImageToListError(item.id)}
                    style={styles.imageOnePost}
                    source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                  />
                )}
              </TouchableOpacity>
            ))}
            <></>
          </View>
        )
      }
    case 5:
      // co 2 kieu sap xep
      if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
        return (
          <View style={[styles.wrapImage, { justifyContent: 'space-between' }]}>
            <View style={[styles.biggestWithGreaterHeight, styles.wrapImageRow, styles.justifyContent]}>
              {props.images.slice(0, 2).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.heightGreaterWidth}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
              {props.images.slice(2, 5).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.smallImageBottom}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      } else {
        return (
          <View style={[styles.wrapImage, styles.wrapImageRow]}>
            <View style={[styles.biggestHeightGreaterWidth, styles.justifyContent]}>
              {props.images.slice(0, 2).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.widthGreaterHeight}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.rightWrapImageFour}>
              {props.images.slice(2, 5).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.smallImageRight}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      }
    default:
      //  Co 2 dieu kien
      if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
        return (
          <View style={[styles.wrapImage, { justifyContent: 'space-between' }]}>
            <View style={[styles.biggestWithGreaterHeight, styles.wrapImageRow, styles.justifyContent]}>
              {props.images.slice(0, 2).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.heightGreaterWidth}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
              {props.images.slice(2, 4).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.smallImageBottom}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={() => props.handleClickIntoAnyImageEvent(props.images[4].id, listImageError)}
                style={[styles.smallImageBottom, styles.wrapperLastImageButRemaining]}
                key={props.images[4].id}
              >
                {handleCheckImageHaveError(props.images[4]) ? (
                  <>
                    <View style={styles.wrapperLastImageButRemainingNotFound} />
                    <Text style={styles.numberImageRemaining}>+{numberImageRemaining}</Text>
                    <CustomizeLayoutImageNotify />
                  </>
                ) : (
                  <>
                    <Text style={styles.numberImageRemaining}>+{numberImageRemaining}</Text>
                    <Image
                      onError={() => handleAddImageToListError(props.images[4].id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${props.images[4].uri}` }}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <View style={[styles.wrapImage, styles.wrapImageRow]}>
            <View style={[styles.biggestHeightGreaterWidth, styles.justifyContent]}>
              {props.images.slice(0, 2).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.widthGreaterHeight}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.rightWrapImageFour}>
              {props.images.slice(2, 4).map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.handleClickIntoAnyImageEvent(item.id, listImageError)}
                  key={item.id}
                  style={styles.smallImageRight}
                >
                  {handleCheckImageHaveError(item) ? (
                    <CustomizeLayoutImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${item.uri}` }}
                    />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => props.handleClickIntoAnyImageEvent(props.images[4].id, listImageError)}
                style={[styles.smallImageRight, styles.wrapperLastImageButRemaining]}
              >
                {handleCheckImageHaveError(props.images[4]) ? (
                  <>
                    <View style={styles.wrapperLastImageButRemainingNotFound} />
                    <Text style={styles.numberImageRemaining}>+{numberImageRemaining}</Text>
                    <CustomizeLayoutImageNotify />
                  </>
                ) : (
                  <>
                    <Text style={styles.numberImageRemaining}>+{numberImageRemaining}</Text>
                    <Image
                      onError={() => handleAddImageToListError(props.images[4].id)}
                      style={styles.imageOnePost}
                      source={{ uri: SERVER_ADDRESS + `api/images/${props.images[4].uri}` }}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
  wrapImage: {
    justifyContent: 'space-between',
    width: '100%',
    height: SCREEN_HEIGHT * 0.4
  },
  wrapImageSquare: {
    justifyContent: 'space-between',
    aspectRatio: 2 / 1
  },
  imageOnePost: {
    width: '100%',
    height: '100%'
  },
  widthGreaterHeight: {
    width: '100%',
    height: '49.5%'
  },
  heightGreaterWidth: {
    width: '49.5%',
    height: '100%'
  },
  imageSquare: {
    width: '49.5%',
    height: '49.5%'
  },
  biggestWithGreaterHeight: {
    width: '100%',
    height: '59.5%'
  },
  biggestHeightGreaterWidth: {
    height: '100%',
    width: '59.5%'
  },
  justifyContent: {
    justifyContent: 'space-between'
  },
  smallImageBottom: {
    width: '32.83%',
    height: '100%'
  },
  smallImageRight: {
    height: '32.83%',
    width: '100%'
  },
  // Two image area
  wrapImageRow: {
    flexDirection: 'row'
  },
  // Three image area
  bottomWrapImageThree: {
    justifyContent: 'space-between',
    width: '100%',
    height: '39.5%'
  },
  // four image area
  bottomWrapImageFour: {
    justifyContent: 'space-between',
    width: '100%',
    height: '34.5%'
  },
  rightWrapImageFour: {
    justifyContent: 'space-between',
    height: '100%',
    width: '39.5%'
  },
  wrapImageFourSquare: {
    height: '49.5%',
    width: '100%'
  },
  wrapperLastImageButRemaining: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberImageRemaining: {
    zIndex: 999,
    position: 'absolute',
    color: COLOR_WHITE,
    fontSize: 35
  },
  marginRight: {
    marginRight: '0.5%'
  },
  wrapperLastImageButRemainingNotFound: {
    backgroundColor: COLOR_MODAL,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999
  }
})

export default CustomizeImagePost
