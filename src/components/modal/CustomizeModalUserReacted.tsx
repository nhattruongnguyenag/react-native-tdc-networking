import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { memo } from 'react'
import { COLOR_BLACK, COLOR_GREY, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { closeModalUserReaction } from '../../redux/Slice'
import CustomizeUserReaction from '../post/CustomizeUserReactionPost'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { PROFILE_SCREEN } from '../../constants/Screen'
import { useTranslation } from 'react-multi-lang'
import { getFacultyTranslated } from '../../utils/getFacultyTranslated '

const CustomizeModalUserReacted = () => {
  const t = useTranslation();
  const { userIdOfProfileNow, currentScreenNowIsProfileScreen, modalUserReactionData } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useAppDispatch()

  const handleClickIntoBtnIconClose = () => {
    dispatch(closeModalUserReaction())
  }

  const handleClickIntoUserReactedEvent = (userId: number) => {
    if (userIdOfProfileNow !== userId) {
      handleClickIntoBtnIconClose()
      if (currentScreenNowIsProfileScreen) {
        navigation.replace(PROFILE_SCREEN, { userId: userId, group: modalUserReactionData?.group ?? '' })
      } else {
        navigation.navigate(PROFILE_SCREEN, { userId: userId, group: modalUserReactionData?.group ?? '' })
      }
    }
  }
  return (
    <Modal transparent statusBarTranslucent={true}>
      <TouchableOpacity onPress={() => handleClickIntoBtnIconClose()} style={styles.container}>
        <Pressable style={styles.wrapLayout}>
          <View style={styles.header}>
            <Text style={styles.txtTitle}>{t("ModalListUserLiked.modalListUserLikedTitle")}</Text>
            <TouchableOpacity onPress={() => handleClickIntoBtnIconClose()} style={styles.btnIconClose}>
              <IconAntDesign name='close' size={20} color={COLOR_BLACK} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapListUserReaction}>
            {modalUserReactionData?.likes.map((item, index) => (
              <CustomizeUserReaction
                key={item.id}
                id={item.id}
                name={getFacultyTranslated(item.name, t)}
                avatar={item.image}
                handleClickIntoUserReactedEvent={handleClickIntoUserReactedEvent}
              />
            ))}
          </ScrollView>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MODAL,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapLayout: {
    width: '80%',
    height: '70%',
    backgroundColor: COLOR_WHITE,
    borderRadius: 15
  },
  header: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: COLOR_GREY
  },
  txtTitle: {
    color: COLOR_BLACK,
    fontWeight: 'bold'
  },
  btnIconClose: {
    position: 'absolute',
    right: 10
  },
  wrapListUserReaction: {
    paddingHorizontal: 20
  }
})
export default memo(CustomizeModalUserReacted)
