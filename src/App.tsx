/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import Toast from 'react-native-toast-message'
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
  CREATE_NORMAL_POST_SCREEN,
  CREATE_RECRUITMENT_SCREEN,
  CREATE_SURVEY_SCREEN,
  DRAWER_TAB_NAVIGATOR,
  FACULTY_DASHBOARD_SCREEN,
  FOLLOWING_SCREEN,
  IMAGE_VIEW_SCREEN,
  INTERMEDIATIOO_SCREEN,
  LIST_FOLLOW_SCREEN,
  JOB_APPLY_SCREEN,
  LIST_JOB_APPLY_SCREEN,
  LIST_POST_SAVED_SCREEN,
  LOGIN_SCREEN,
  MESSENGER_SCREEN,
  NOTIFICATION_SCREEN,
  RECRUITMENT_DETAIL_SCREEN,
  REVIEW_SURVEY_POST_SCREEN,
  SEACRH_SCREEN,
  SPLASH_SCREEN,
  STUDENT_DISCUSSION_DASHBOARD_SCREEN,
  STUDENT_REGISTER_SCREEN,
  SURVEY_CONDUCT_SCREEN,
  TOP_TAB_NAVIGATOR,
  PROFILE_SCREEN,
  DETAIL_JOB_APPLY,
  OPTION_SCREEN,
  SURVEY_RESULT_SCREEN,
  FORGOTTEN_PASSWORD_SCREEN,
  ACCEPT_FORGOTTEN_PASSWORD_SCREEN
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
import CreateNormalPostScreen from './screens/CreateNormalPostScreen'
import ListFollowScreen from './screens/ListFollowScreen'
import SurveyConductScreen from './screens/SurveyConductScreen'
import RecruitmentDetailScreen from './screens/RecruitmentDetailScreen'
import JobApplyScreen from './screens/JobApplyScreen'
import ListJobApplyScreen from './screens/ListJobApplyScreen'
import ListPostSavedScreen from './screens/ListPostSavedScreen'
import ProfileScreen from './screens/ProfileScreen'
import DetailJobApplyScreen from './screens/DetailJobApplyScreen'
import OptionScreen from './screens/OptionScreen'
import SurveyResultScreen from './screens/SurveyResultScreen'
import { TEXT_FOLLOW, TEXT_SAVE, TEXT_SEARCH_ } from './constants/StringVietnamese'
import ForgottenPasswordScreen from './screens/ForgottenPasswordScreen'
import AcceptForgottenPasswordScreen from './screens/AcceptForgottenPasswordScreen'

const vi = require('moment/locale/vi')
moment.locale('vi', vi)

export type RootStackParamList = {
  ACCEPT_FORGOTTEN_PASSWORD_SCREEN:{ email: string } | undefined
  FORGOTTEN_PASSWORD_SCREEN: undefined
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
  LIST_FOLLOW_SCREEN: undefined
  ADD_QUESTION_SCREEN: undefined
  REVIEW_SURVEY_POST_SCREEN: undefined
  CREATE_NORMAL_POST_SCREEN: { group: number } | undefined
  SURVEY_CONDUCT_SCREEN: { surveyPostId: number } | undefined
  RECRUITMENT_DETAIL_SCREEN: { postId: number } | undefined
  JOB_APPLY_SCREEN: { recruitmentPostId: number } | undefined
  LIST_JOB_APPLY_SCREEN: { postId: number } | undefined
  DETAIL_JOB_APPLY: { cvId: number } | undefined
  PROFILE_SCREEN: { userId: number; group: string } | undefined
  LIST_POST_SAVED_SCREEN: undefined
  OPTION_SCREEN: undefined
  SURVEY_RESULT_SCREEN: { surveyPostId: number } | undefined
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
        name={RECRUITMENT_DETAIL_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Chi tiết tuyển dụng' /> }}
        component={RecruitmentDetailScreen}
      />

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
        name={FORGOTTEN_PASSWORD_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Quên mật khẩu' /> }}
        component={ForgottenPasswordScreen}
      />

      <RootStack.Screen
        name={ACCEPT_FORGOTTEN_PASSWORD_SCREEN}
        options={{ title: 'Xác nhận email', header: () => null }}
        component={AcceptForgottenPasswordScreen}
      />

      <RootStack.Screen
        name={SEACRH_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={TEXT_SEARCH_} /> }}
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

      <RootStack.Screen
        name={SURVEY_CONDUCT_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Thực hiện khảo sát' /> }}
        component={SurveyConductScreen}
      />

      <RootStack.Screen
        name={JOB_APPLY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Ứng tuyển' /> }}
        component={JobApplyScreen}
      />
      <RootStack.Screen
        name={LIST_POST_SAVED_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={TEXT_SAVE} /> }}
        component={ListPostSavedScreen}
      />

      <RootStack.Screen
        name={CREATE_NORMAL_POST_SCREEN}
        options={{ header: () => null }}
        component={CreateNormalPostScreen}
      />

      <RootStack.Screen
        name={LIST_JOB_APPLY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Danh sách hồ sơ ứng tuyển' /> }}
        component={ListJobApplyScreen}
      />

      <RootStack.Screen
        name={LIST_FOLLOW_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={TEXT_FOLLOW} /> }}
        component={ListFollowScreen}
      />

      <RootStack.Screen
        name={PROFILE_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Trang cá nhân người dùng' /> }}
        component={ProfileScreen}
      />

      <RootStack.Screen
        name={DETAIL_JOB_APPLY}
        options={{ header: () => <ToolbarWithBackPress title='Chi tiết hồ sơ ứng tuyển' /> }}
        component={DetailJobApplyScreen}
      />

      <RootStack.Screen
        name={OPTION_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='' /> }}
        component={OptionScreen}
      />

      <RootStack.Screen name={SPLASH_SCREEN} options={{ header: () => null }} component={SplashScreen} />

      <RootStack.Screen
        name={SURVEY_RESULT_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title='Kết quả khảo sát' /> }}
        component={SurveyResultScreen}
      />
    </RootStack.Navigator>
  )
}
// DETAIL_JOB_APPLY
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
    <>
      <MenuProvider>
        <Provider store={store}>
          <PaperProvider>
            <NavigationContainer>
              <DrawerNavigator />
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      </MenuProvider>
      <Toast />
    </>
  )
}

export default App
