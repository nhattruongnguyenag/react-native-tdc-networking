import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'
import ButtonFullWith from '../buttons/ButtonFullWith'
import { TEXT_BUTTON_GO_BACK, TEXT_BUTTON_GO_NEXT } from '../../constants/StringVietnamese'

export default function ModalPostRejectReason() {
    const [visible, setVisible] = React.useState(false)
    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false)

    return (
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
            <TextInput
                multiline
                numberOfLines={10}
                textAlign={'left'}
                style={styles.textInput}
                placeholder={'Ghi chú...'} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ButtonFullWith
                    textColor='#000'
                    btnStyle={{ marginRight: 10, width: 140, backgroundColor: '#eee' }}
                    title={"Hủy"}
                />

                <ButtonFullWith
                    btnStyle={{ marginLeft: 10, width: 140 }}
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    title={"Hoàn tất"}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        borderRadius: 4,
        margin: 10
    },
    textInput: {
        textAlignVertical: 'top',
        marginHorizontal: 10,
        marginTop: 20,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5
    }
})