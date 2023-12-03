import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR_BLACK, COLOR_WHITE } from '../../constants/Color'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/SystemDimensions'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'

interface ModalBigImageShowType {
    visible: boolean,
    image: string,
    handleCloseModal: () => void
}
const CustomizeModalBigImageShow = (props: Readonly<ModalBigImageShowType>) => {
    return (
        <Modal statusBarTranslucent={true} visible={props.visible}>
            <View style={styles.container}>

                <Image
                    style={styles.image}
                    source={{ uri: SERVER_ADDRESS + `api/images/${props.image}` }} />
                <TouchableOpacity
                    onPress={() => props.handleCloseModal()}
                    style={styles.buttonClose}>
                    <IconAntDesign name='closesquare' size={30} color={COLOR_WHITE} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_BLACK,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: SCREEN_WIDTH * 1,
        height: SCREEN_HEIGHT * 0.7,
        objectFit: 'cover',
    },
    buttonClose: {
        position: 'absolute',
        right: 10,
        top: 40
    }
})

export default memo(CustomizeModalBigImageShow)