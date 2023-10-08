import {
  Keyboard,
  Platform,
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { WINDOW_HEIGHT } from '../../utils'
import { COLOR_BLACK, COLOR_BUTTON, COLOR_GREY, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomizeComment from '../CustomizeComment'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { closeModalComments } from '../../redux/Slice'
//  Constant
const TEXT_PLACEHOLDER = 'hãy nhập tin nhắn của bạn'
const TEXT_TITLE = 'Bình luận'
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.5
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT
const MAX_DOWNWARD_TRANSLATE_Y = 0
const DRAG_THRESHOLD = 50
const TEXT_SEE_MORE_COMMENTS = 'Xem thêm bình luận'
const TEXT_HIDDEN_COMMENTS = 'Ẩn bớt bình luận'
const CustomizeModalComments = () => {
  const inputRef = useRef<any>()
  const [myComment, setMyComment] = useState('')
  const [idReply, setIdReply] = useState(-1)
  const [keyboardStatus, setKeyboardStatus] = useState(false)
  const { modalCommentData } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const dispatch = useAppDispatch()
  //
  const animatedValue = useRef(new Animated.Value(0)).current
  const lastGestureDy = useRef(0)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        animatedValue.setOffset(lastGestureDy.current)
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy)
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset()
        if (gesture.dy > 0) {
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up')
          } else {
            springAnimation('down')
          }
        } else {
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down')
          } else {
            springAnimation('up')
          }
        }
      }
    })
  ).current

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp'
        })
      }
    ]
  }

  const springAnimation = (direction: 'up' | 'down') => {
    lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true
    }).start()
  }

  const handleClickIntoBtnIconClose = () => {
    dispatch(closeModalComments())
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e: any) => {
      setKeyboardStatus(true)
      springAnimation('up')
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false)
    })
    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [keyboardStatus])

  // Send data to server
  const handleSubmitEvent = () => {
    setMyComment('')
    Keyboard.dismiss()
    const data = {
      id_post: modalCommentData?.id,
      id_comments_reply: idReply,
      comments: myComment
    }
    console.log('====================================')
    console.log('DATA ' + JSON.stringify(data))
    console.log('====================================')
  }

  const handleClickToCommentReplyEven = (id: number) => {
    setIdReply(id)
    inputRef.current.focus()
  }

  return (
    <Modal animationType='slide' transparent statusBarTranslucent={true}>
      <View style={styles.container}>
        <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
          <View style={styles.dragHandleArea} {...panResponder.panHandlers}>
            <View style={styles.dragHandle}>
              <Text style={styles.headerTitle}>{TEXT_TITLE}</Text>
            </View>
            <TouchableOpacity onPress={() => handleClickIntoBtnIconClose()} style={styles.btnIconClose}>
              <IconAntDesign name='close' size={25} color={COLOR_BLACK} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerComments}>
            <ScrollView
              automaticallyAdjustKeyboardInsets={true}
              contentContainerStyle={{ paddingBottom: '50%' }}
              showsVerticalScrollIndicator={false}
            >
              {modalCommentData?.commentFather.map((item, index) => {
                const [seeMore, setSeeMore] = useState(false)
                return (
                  <>
                    <CustomizeComment
                      type={0}
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      content={item.content}
                      avatar={item.avatar}
                      timeCreated={item.timeCreated}
                      handleClickToCommentReplyEven={handleClickToCommentReplyEven}
                    />
                    {item.commentChildren.length !== 0 && seeMore
                      ? item.commentChildren?.map((item, index) => (
                          <CustomizeComment
                            type={1}
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            content={item.content}
                            avatar={item.avatar}
                            timeCreated={item.timeCreated}
                            handleClickToCommentReplyEven={handleClickToCommentReplyEven}
                          />
                        ))
                      : item.commentChildren.length !== 0 && (
                          <TouchableOpacity onPress={() => setSeeMore(true)}>
                            <Text style={styles.txtActivity}>{TEXT_SEE_MORE_COMMENTS}</Text>
                          </TouchableOpacity>
                        )}
                    {seeMore && (
                      <TouchableOpacity onPress={() => setSeeMore(false)}>
                        <Text style={styles.txtActivity}>{TEXT_HIDDEN_COMMENTS}</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )
              })}
            </ScrollView>
          </View>
        </Animated.View>
        <SafeAreaView
          style={keyboardStatus ? [styles.textInput, { bottom: '41%' }] : [styles.textInput, { bottom: '0%' }]}
        >
          <TextInput
            ref={inputRef}
            value={myComment}
            onChangeText={(value) => {
              setMyComment(value)
            }}
            placeholderTextColor={COLOR_BLACK}
            style={styles.txtPlaceholder}
            placeholder={TEXT_PLACEHOLDER}
          />
          <TouchableOpacity onPress={() => handleSubmitEvent()}>
            <IconFontAwesome name='send' size={25} color={COLOR_BUTTON} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MODAL
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: COLOR_WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: COLOR_BLACK,
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2
        }
      }
    })
  },
  dragHandleArea: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: COLOR_GREY
  },
  dragHandle: {
    width: 100,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnIconClose: {
    position: 'absolute',
    right: 20
  },
  headerTitle: {
    color: COLOR_BLACK,
    fontWeight: 'bold',
    fontSize: 16
  },
  containerComments: {},
  txtActivity: {
    color: COLOR_GREY,
    marginLeft: 55
  },
  textInput: {
    position: 'absolute',
    backgroundColor: 'rgb(250 250 250)',
    height: 60,
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: COLOR_GREY,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtPlaceholder: {
    width: '90%',
    height: '100%',
    paddingLeft: 20
  }
})
export default CustomizeModalComments
