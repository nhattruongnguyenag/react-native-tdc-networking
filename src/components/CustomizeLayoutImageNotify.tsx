import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

//  Constant
const TEXT_IMAGE_ERROR = `Count't Load Activity`
const CustomizeLayoutImageNotify = () => {
    return (
        <>
            <View
                style={styles.container}
            >
                <Ionicons name='refresh-outline' size={30} color={'black'} />
                <Text>
                    {
                        TEXT_IMAGE_ERROR
                    }
                </Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(239 239 239)'
    }
})
export default CustomizeLayoutImageNotify