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
import React from 'react'
import { Text } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { MenuProvider } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { Provider } from 'react-redux'
import DrawerContent from './components/drawer/DrawerContent'
import MessengerToolbar from './components/toolbars/MessengerToolbar'
import ToolBar from './components/toolbars/ToolBar'
import ToolbarWithBackPress from './components/toolbars/ToolbarWithBackPress'
import ToolbarWithSearchIcon from './components/toolbars/ToolbarWithSearchIcon'

import {
  ADD_QUESTION_SCREEN,
  BUSINESS_DASHBOARD_SCREEN,
  BUSINESS_REGISTER_SCREEN,
  CONVERSATION_SCREEN,
  CREATE_RECRUITMENT_SCREEN,
  CREATE_SURVEY_SCREEN,
  DRAWER_TAB_NAVIGATOR,
  FACULTY_DASHBOARD_SCREEN,
  FOLLOWING_SCREEN,
  IMAGE_VIEW_SCREEN,
  INTERMEDIATIOO_SCREEN,
  LOGIN_SCREEN,
  MESSENGER_SCREEN,
  NOTIFICATION_SCREEN,
  REVIEW_SURVEY_POST_SCREEN,
  SEACRH_SCREEN,
  SPLASH_SCREEN,
  STUDENT_DISCUSSION_DASHBOARD_SCREEN,
  STUDENT_REGISTER_SCREEN,
  TOP_TAB_NAVIGATOR
} from './constants/Screen'
import { INITIAL_SCREEN } from './constants/SystemConstant'
import { store } from './redux/Store'
import BusinessDashboardScreen from './screens/BusinessDashboardScreen'
import BusinessRegistrationScreen from './screens/BusinessRegistrationScreen'
import ConversationScreen from './screens/ConversationScreen'
import CreateRecruitmentScreen from './screens/CreateRecruitmentScreen'
import CreateSurveyPostScreen from './screens/CreateSurveyPostScreen'
import FacultyDashboardScreen from './screens/FacultyDashboardScreen'
import FollowingScreen from './screens/FollowingScreen'
import LoginScreen from './screens/LoginScreen'
import MessengerScreen from './screens/MessageScreen'
import NotificationScreen from './screens/NotificationScreen'
import SearchScreen from './screens/SearchScreen'
import SplashScreen from './screens/SplashScreen'
import StudentDiscussionDashboardScreen from './screens/StudentDiscussionDashboardScreen'
import StudentRegistrationScreen from './screens/StudentRegistrationScreen'
import { Conversation } from './types/Conversation'
import moment from 'moment'
import ImageViewScreen from './screens/ImageViewScreen'
import IntermediationScreen from './screens/IntermediationScreen'
import AddQuestionScreen from './screens/AddQuestionScreen'
import ReviewSurveyPostScreen from './screens/ReviewSurveyPostScreen'

const vi = require('moment/locale/vi')
moment.locale('vi', vi)

export type RootStackParamList = {
  CONVERSATION_SCREEN: undefined
  BUSINESS_DASHBOARD_SCREEN: undefined
  FACULTY_DASHBOARD_SCREEN: undefined
  STUDENT_DISCUSSION_DASHBOARD_SCREEN: undefined
  NOTIFICATION_SCREEN: undefined
  FOLLOWING_SCREEN: undefined
  MESSENGER_SCREEN: { conversation: Conversation } | undefined
  SEACRH_SCREEN: undefined
  ACTIVE_CONVERSATION_TAB: undefined
  ALL_CONVERSATION_TAB: undefined
  LOGIN_SCREEN: undefined
  STUDENT_REGISTER_SCREEN: undefined
  BUSINESS_REGISTER_SCREEN: undefined
  TOP_TAB_NAVIGATOR: undefined
  DRAWER_TAB_NAVIGATOR: undefined
  CREATE_RECRUITMENT_SCREEN: undefined
  CREATE_SURVEY_SCREEN: undefined
  SPLASH_SCREEN: undefined
  IMAGE_VIEW_SCREEN: undefined
  INTERMEDIATIOO_SCREEN: undefined

  ADD_QUESTION_SCREEN: undefined
  REVIEW_SURVEY_POST_SCREEN: undefined
}

const TopTab = createMaterialTopTabNavigator()
const RootStack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator()

interface DrawerLabel {
  color: string
  focused: boolean
  label: string
}

interface DrawerIcon {
  focused: boolean
  icon: string
}

const customDrawerLabel = (props: DrawerLabel) => (
  <Text
    style={{ fontSize: 14, color: props.focused ? '#0088ff' : '#000', fontWeight: props.focused ? 'bold' : 'normal' }}
  >
    {props.label}
  </Text>
)

const customDrawerIcon = (props: DrawerIcon) => (
  <Icon style={{ marginStart: 5 }} color={props.focused ? '#0088ff' : '#757575'} name={props.icon} size={16} />
)

export function DrawerNavigator(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
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
      initialRouteName={INITIAL_SCREEN}
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
        name={TOP_TAB_NAVIGATOR}
        options={{
          title: 'TDC Social Network',
          header: () => <ToolBar />
        }}
        component={TopTabNavigator}
      />
      <RootStack.Screen
        name={DRAWER_TAB_NAVIGATOR}
        options={{ title: 'TDC Social Network', header: () => null }}
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

      <RootStack.Screen
        name={MESSENGER_SCREEN}
        options={{ header: () => <MessengerToolbar /> }}
        component={MessengerScreen}
      />

      <RootStack.Screen name={LOGIN_SCREEN} options={{ header: () => null }} component={LoginScreen} />

      <RootStack.Screen
        name={STUDENT_REGISTER_SCREEN}
        options={{ header: () => null }}
        component={StudentRegistrationScreen}
      />

      <RootStack.Screen
        name={BUSINESS_REGISTER_SCREEN}
        options={{ header: () => null }}
        component={BusinessRegistrationScreen}
      />

      <RootStack.Screen
        name={INTERMEDIATIOO_SCREEN}
        options={{ header: () => null }}
        component={IntermediationScreen}
      />

      <RootStack.Screen
        name={CREATE_RECRUITMENT_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Thêm tin tuyển dụng' /> }}
        component={CreateRecruitmentScreen}
      />

      <RootStack.Screen
        name={CREATE_SURVEY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Thêm khảo sát' /> }}
        component={CreateSurveyPostScreen}
      />

      <RootStack.Screen name={IMAGE_VIEW_SCREEN} options={{ header: () => null }} component={ImageViewScreen} />
      <RootStack.Screen
        name={ADD_QUESTION_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Thêm câu hỏi' /> }}
        component={AddQuestionScreen}
      />

      <RootStack.Screen
        name={REVIEW_SURVEY_POST_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Xem lại bài viết' /> }}
        component={ReviewSurveyPostScreen}
      />

      <RootStack.Screen name={IMAGE_VIEW_SCREEN} options={{ header: () => null }} component={ImageViewScreen} />

      <RootStack.Screen name={SPLASH_SCREEN} options={{ header: () => null }} component={SplashScreen} />
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
            iconName = 'house'
          } else if (route.name === STUDENT_DISCUSSION_DASHBOARD_SCREEN) {
            iconName = 'chalkboard-user'
          } else if (route.name === FACULTY_DASHBOARD_SCREEN) {
            iconName = 'graduation-cap'
          } else if (route.name === NOTIFICATION_SCREEN) {
            iconName = 'bell'
          } else if (route.name === FOLLOWING_SCREEN) {
            iconName = 'rss'
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
      <TopTab.Screen name={FOLLOWING_SCREEN} component={FollowingScreen} />
    </TopTab.Navigator>
  )
}

function App(): JSX.Element {
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
