import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'

interface ConfirmModalProps {
  visible: boolean
  title: string
  message: string
  onBtnDeletePress?: () => void
  onBtnOkPress?: () => void
}

const ConfirmModal = ({ visible, title, message, onBtnDeletePress, onBtnOkPress }: ConfirmModalProps) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modal_wrapper}>
        <View style={styles.modal}>
          <View style={styles.modal_header}>
            <Text style={[styles.title]}>{title}</Text>
          </View>
          <View style={styles.modal_body}>
            <Text style={[GlobalStyles.normalText]}>{message}</Text>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={onBtnDeletePress} style={[styles.btnModal, styles.warning]}>
              <Text style={[GlobalStyles.normalText, GlobalStyles.textWhite, { fontWeight: 'bold' }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onBtnOkPress} style={[styles.btnModal, styles.success]}>
              <Text style={[GlobalStyles.normalText, { fontWeight: 'bold' }]}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 18
  },
  modal_wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    width: '90%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  modal_header: {
    height: 40,
    backgroundColor: 'yellow',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal_body: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal_footer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnModal: {
    width: 90,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10
  },
  success: {
    backgroundColor: 'lightgreen'
  },
  warning: {
    backgroundColor: 'orange'
  }
})

export default ConfirmModal
