import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLOR_WHITE } from '../../constants/Color'

export interface CustomizeModalLoadingType {
    visible: boolean
}

export default function CustomizeModalLoading(props: CustomizeModalLoadingType) {
    return (
        <Modal
            visible={props.visible}
            transparent
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <ActivityIndicator
                    size={50}
                    color={COLOR_WHITE}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'rgba(0.5,0.5,0.5,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})