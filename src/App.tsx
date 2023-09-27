/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { MenuProvider } from 'react-native-popup-menu'
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Provider } from 'react-redux'
import ToolBar from './components/toolbars/ToolBar'
import ToolbarWithBackPress from './components/toolbars/ToolbarWithBackPress'
import ToolbarWithSearchIcon from './components/toolbars/ToolbarWithSearchIcon'
import {
  BUSINESS_DASHBOARD_SCREEN,
  CONVERSATION_SCREEN,
  FACULTY_DASHBOARD_SCREEN,
  NOTIFICATION_SCREEN,
  SEACRH_SCREEN,
  STUDENT_DISCUSSION_DASHBOARD_SCREEN
} from './constants/Screen'
import { store } from './redux/store'
import BusinessDashboardScreen from './screens/BusinessDashboardScreen'
import ConversationScreen from './screens/conversation/ConversationScreen'
import FacultyDashboardScreen from './screens/FacultyDashboardScreen'
import NotificationScreen from './screens/NotificationScreen'
import SearchScreen from './screens/SearchScreen'
import StudentDiscussionDashboardScreen from './screens/StudentDiscussionDashboardScreen'

const TopTab = createMaterialTopTabNavigator()
const RootStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export function DrawerNavigator(): JSX.Element {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerStyle: {
          backgroundColor: '#0088ff'
        },
        header: () => null
      }}
    >
      <Drawer.Screen
        name='TodoApp'
        options={{
          title: 'Todo App',
          drawerType: 'back',
          drawerItemStyle: { display: 'none' }
        }}
        component={StackNavigator}
      />
    </Drawer.Navigator>
  )
}

export function StackNavigator(): JSX.Element {
  return (
    <RootStack.Navigator
      initialRouteName='BottomTabNavigator'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerStyle: {
          backgroundColor: '#0088ff'
        }
      }}
    >
      <RootStack.Screen
        name='BottomTabNavigator'
        options={{
          title: 'Todo App',
          header: () => <ToolBar />
        }}
        component={TopTabNavigator}
      />
      <RootStack.Screen
        name='DrawerNavigator'
        options={{ title: 'Todo App', header: () => null }}
        component={DrawerNavigator}
      />

      <RootStack.Screen
        name={SEACRH_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Tìm kiếm' /> }}
        component={SearchScreen}
      />

      <RootStack.Screen
        name={CONVERSATION_SCREEN}
        options={{ header: () => <ToolbarWithSearchIcon title='Hội thoại' /> }}
        component={ConversationScreen}
      />
    </RootStack.Navigator>
  )
}

function TopTabNavigator(): JSX.Element {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = ''
          let size = focused ? 20 : 19

          if (route.name === BUSINESS_DASHBOARD_SCREEN) {
            iconName = 'home'
          } else if (route.name === STUDENT_DISCUSSION_DASHBOARD_SCREEN) {
            iconName = 'chalkboard-teacher'
          } else if (route.name === FACULTY_DASHBOARD_SCREEN) {
            iconName = 'graduation-cap'
          } else if (route.name === NOTIFICATION_SCREEN) {
            iconName = 'bell'
          } else if (route.name === CONVERSATION_SCREEN) {
            iconName = 'user-friends'
          }

          return <Icon name={iconName} size={size} color={color} solid={focused} />
        },
        tabBarActiveTintColor: '#0065FF',
        tabBarInactiveTintColor: '#808080',
        tabBarShowLabel: false,
        header: () => <ToolBar />
      })}
    >
      <TopTab.Screen name={BUSINESS_DASHBOARD_SCREEN} component={BusinessDashboardScreen} />
      <TopTab.Screen name={FACULTY_DASHBOARD_SCREEN} component={FacultyDashboardScreen} />
      <TopTab.Screen name={STUDENT_DISCUSSION_DASHBOARD_SCREEN} component={StudentDiscussionDashboardScreen} />
      <TopTab.Screen name={NOTIFICATION_SCREEN} component={NotificationScreen} />
      <TopTab.Screen name={CONVERSATION_SCREEN} component={ConversationScreen} />
    </TopTab.Navigator>
  )
}

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <MenuProvider>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </MenuProvider>
  )
}

export default App
