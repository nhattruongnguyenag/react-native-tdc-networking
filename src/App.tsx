/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useMemo, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from './redux/store'
import DoneScreen from './screens/DoneScreen'
import TodoScreen from './screens/TodoScreen'
import TaskScreen from './screens/TaskScreen'
import CameraScreen from './screens/CameraScreen'

const BottomTab = createMaterialBottomTabNavigator()
const RootStack = createNativeStackNavigator()

function HomeTabs() {
  const { taskList } = useSelector((state: RootState) => state.taskReducer)

  let numOfTaskActive = useMemo(() => {
    return taskList.filter((task) => task.status).length
  }, [taskList])

  let numOfTaskDone = useMemo(() => {
    return taskList.filter((task) => !task.status).length
  }, [taskList])

  return (
    <BottomTab.Navigator
      shifting={true}
      activeColor={'#0080ff'}
      inactiveColor={'#777'}
      barStyle={{ backgroundColor: '#fff', height: 70 }}
      screenOptions={({ route }) => ({
        header: () => null,
        tabBarIcon: ({ focused, color }) => {
          let iconName = ''
          let size = 20
          if (route.name === 'To-Do') {
            iconName = 'clipboard-list'
            size = focused ? 22 : 20
          } else if (route.name == 'Done') {
            iconName = 'clipboard-check'
            size = focused ? 22 : 20
          }

          return <Icon name={iconName} size={size} color={color} />
        }
      })}
    >
      <BottomTab.Screen
        name={'To-Do'}
        options={{
          title: 'Todo',
          tabBarBadge: numOfTaskActive
        }}
        component={TodoScreen}
      />
      <BottomTab.Screen
        name={'Done'}
        options={{
          title: 'Done',
          tabBarBadge: numOfTaskDone
        }}
        component={DoneScreen}
      />
    </BottomTab.Navigator>
  )
}

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold'
            },
            headerStyle: {
              backgroundColor: '#0088ff'
            }
          }}
        >
          <RootStack.Screen name='Home' component={HomeTabs} />
          <RootStack.Screen name='Task' component={TaskScreen} />
          <RootStack.Screen name='Camera' component={CameraScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
