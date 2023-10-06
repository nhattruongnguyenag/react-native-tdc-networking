import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Divider() {
    return (
        <View style={styles.divider}>
        </View>
    )
}

const styles = StyleSheet.create({
    divider: {
        width: '99%',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    }
})