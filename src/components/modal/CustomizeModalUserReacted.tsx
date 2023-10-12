import { View, Text, Modal, StyleSheet, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { COLOR_BLACK, COLOR_GREY, COLOR_MODAL, COLOR_WHITE } from '../../constants/Color'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from '../../redux/Hook'
import { closeModalUserReaction } from '../../redux/Slice'
import CustomizeUserReaction from '../CustomizeUserReaction'

const CustomizeModalUserReacted = () => {
  const dispatch = useAppDispatch()
  const handleClickIntoBtnIconClose = () => {
    dispatch(closeModalUserReaction())
  }
  const { modalUserReactionData } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  return (
    <Modal transparent statusBarTranslucent={true}>
      <TouchableOpacity onPress={() => handleClickIntoBtnIconClose()} style={styles.container}>
        <Pressable style={styles.wrapLayout}>
          <View style={styles.header}>
            <Text style={styles.txtTitle}>Lượt thích</Text>
            <TouchableOpacity onPress={() => handleClickIntoBtnIconClose()} style={styles.btnIconClose}>
              <IconAntDesign name='close' size={20} color={COLOR_BLACK} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapListUserReaction}>
            {modalUserReactionData?.likes.map((item, index) => (
              <CustomizeUserReaction id={item.id} name={item.name} avatar={item.avatar} />
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
export default CustomizeModalUserReacted