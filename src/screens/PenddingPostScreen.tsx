import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-multi-lang'
import { PEDDING_POST_SCREEN, PEDDING_POST_TAB, REJECTED_POST_TAB } from '../constants/Screen'
import PenddingPostTab from '../components/pendingPost/PenddingPostTab'
import RejectedPostTab from '../components/pendingPost/RejectedPostTab'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const TopTab = createMaterialTopTabNavigator()

function TopTabNavigator(): JSX.Element {
    const t = useTranslation()

    return (
        <TopTab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#0065FF',
                tabBarInactiveTintColor: '#808080',
                tabBarLabelStyle: styles.tabBarLabelStyle,
                header: null
            })}
        >
            <TopTab.Screen
                name={PEDDING_POST_TAB}
                options={{ title: t('PenddingPostScreen.peddingPostTab') }}
                component={PenddingPostTab}
            />
            <TopTab.Screen
                name={REJECTED_POST_TAB}
                options={{ title: t('PenddingPostScreen.rejectedPostTab') }}
                component={RejectedPostTab}
            />
        </TopTab.Navigator>
    )
}

export default function PenddingPostScreen() {
    return (
        <SafeAreaView style={styles.body}>
            <TopTabNavigator />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tabBarLabelStyle: {
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: 16
    }
})