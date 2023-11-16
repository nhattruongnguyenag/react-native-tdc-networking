import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ACTIVE_CONVERSATION_TAB, ALL_CONVERSATION_TAB } from '../constants/Screen'
import AllConversationGroupTab from '../components/conversation/AllConversationGroupTab'
import ActiveConversationGroupTab from '../components/conversation/ActiveConversationGroupTab'
import { ALL_ACTIVE_CONVERSATION_TAB_TITLE, ALL_CONVERSATION_TAB_TITLE } from '../constants/StringVietnamese'

const TopTab = createMaterialTopTabNavigator()

function TopTabNavigator(): JSX.Element {
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
        name={ALL_CONVERSATION_TAB}
        options={{ title: ALL_CONVERSATION_TAB_TITLE }}
        component={AllConversationGroupTab}
      />
      <TopTab.Screen
        name={ACTIVE_CONVERSATION_TAB}
        options={{ title: ALL_ACTIVE_CONVERSATION_TAB_TITLE }}
        component={ActiveConversationGroupTab}
      />
    </TopTab.Navigator>
  )
}

// man hinh hien thi danh sach hoi thoai
export default function ConversationScreen() {
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
