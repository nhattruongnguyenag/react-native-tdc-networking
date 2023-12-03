import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR_GREY, COLOR_WHITE } from '../../constants/Color'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/SystemDimensions'
import { SERVER_ADDRESS } from '../../constants/SystemConstant'
import { useTranslation } from 'react-multi-lang'

interface ModalBigImageShowType {
    t: ReturnType<typeof useTranslation>
    image: string,
    handleShowImageBackgroundUpdate: (flag: boolean) => void
}

const CustomizeModalShowBackgroundUpdate = (props: Readonly<ModalBigImageShowType>) => {
    return (
        <Modal statusBarTranslucent={true} visible={true} transparent={true}>
            <View style={styles.container}>
                <View style={styles.wrapperImage}>
                    <Image
                        style={styles.image}
                        source={{ uri: SERVER_ADDRESS + `api/images/${props.image}` }} />
                    <View style={styles.wrapperButton}>
                        <TouchableOpacity
                            onPress={() => props.handleShowImageBackgroundUpdate(false)}
                            style={[styles.button, styles.buttonLeft]}>
                            <Text>{props.t("ModalReviewBackground.modalReviewBackgroundTextCancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.handleShowImageBackgroundUpdate(true)}
                            style={[styles.button, styles.buttonRight]}>
                            <Text>{props.t("ModalReviewBackground.modalReviewBackgroundTextSave")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0.5, 0.5, 0.5, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperImage: {
        width: SCREEN_WIDTH * 0.85,
        height: SCREEN_HEIGHT * 0.7,
        borderColor: COLOR_WHITE,
        objectFit: 'cover',
    },
    image: {
        objectFit: 'cover',
        borderRadius: 15,
        borderWidth: 5,
        borderColor: COLOR_WHITE,
        width: '100%',
        height: '100%'
    },
    wrapperButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        position: 'absolute',
        bottom: -50,
        width: '100%',
    },
    button: {
        color: COLOR_GREY,
        backgroundColor: COLOR_WHITE,
        paddingVertical: 10,
        paddingHorizontal: 50,
    },
    buttonRight: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderLeftWidth: 0.25,
    },
    buttonLeft: {
        borderRightWidth: 0.25,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    }
})
export default memo(CustomizeModalShowBackgroundUpdate)