import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-multi-lang'

export default function NoMorePost() {
    const t = useTranslation()
    return (
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 10 }}>
            <Text>{t('NoMorePost.noMorePost')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})