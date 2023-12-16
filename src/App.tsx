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
import React, { useEffect, useState, useTransition } from 'react'
import { StatusBar, StyleSheet, Text } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { MenuProvider } from 'react-native-popup-menu'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { Provider } from 'react-redux'
import DrawerContent from './components/drawer/DrawerContent'
import MessengerToolbar from './components/toolbars/MessengerToolbar'
import ToolBar from './components/toolbars/ToolBar'
import ToolbarWithBackPress from './components/toolbars/ToolbarWithBackPress'
import ToolbarWithSearchIcon from './components/toolbars/ToolbarWithSearchIcon'

import { setDefaultLanguage, setTranslations, useTranslation } from 'react-multi-lang'
import en from './translates/en.json'
import ja from './translates/jp.json'
import vi from './translates/vi.json'

setTranslations({ vi, en, ja })
setDefaultLanguage('vi')

const locale = new Map<string, any>()
locale.set('vi', require('moment/locale/vi'))
locale.set('en', require('moment/locale/es'))
locale.set('ja', require('moment/locale/ja'))

import moment from 'moment'
import ApprovalPostScreen from './ApprovalPostScreen'
import {
  ACCEPT_SCREEN, ADD_QUESTION_SCREEN, APPLICATION_OPTION_SCREEN,
  APPROVAL_POST_SCREEN, BUSINESS_DASHBOARD_SCREEN,
  BUSINESS_REGISTER_SCREEN,
  CONVERSATION_SCREEN,
  CREATE_NORMAL_POST_SCREEN,
  CREATE_RECRUITMENT_SCREEN,
  CREATE_SURVEY_SCREEN, DETAIL_JOB_APPLY, DRAWER_TAB_NAVIGATOR,
  FACULTY_DASHBOARD_SCREEN,
  FOLLOWING_SCREEN, FORGOTTEN_PASSWORD_SCREEN, IMAGE_VIEW_SCREEN,
  INTERMEDIATIOO_SCREEN, JOB_APPLY_SCREEN, LIST_FOLLOW_SCREEN, LIST_JOB_APPLY_SCREEN,
  LIST_POST_SAVED_SCREEN,
  LOGIN_SCREEN,
  MANAGEMENT_JOB_APPLY_SCREEN,
  MESSENGER_SCREEN,
  NOTIFICATION_SCREEN, OPTION_SCREEN, PEDDING_POST_SCREEN, PROFILE_SCREEN, RECRUITMENT_DETAIL_SCREEN,
  REVIEW_SURVEY_POST_SCREEN,
  SEACRH_SCREEN,
  SPLASH_SCREEN,
  STUDENT_DISCUSSION_DASHBOARD_SCREEN,
  STUDENT_REGISTER_SCREEN,
  UPDATE_PROFILE, SURVEY_CONDUCT_SCREEN, SURVEY_RESULT_SCREEN, TOP_TAB_NAVIGATOR,
  DETAIL_SURVEY_SCREEN,
  STUDENT_AND_FACULTY_GROUP,
  DETAIL_POST_SCREEN
} from './constants/Screen'
import { INITIAL_SCREEN, SERVER_ADDRESS } from './constants/SystemConstant'
import { store } from './redux/Store'
import AcceptScreen from './screens/AcceptScreen'
import AddQuestionScreen from './screens/AddQuestionScreen'
import ApplicationOptionScreen from './screens/ApplicationOptionScreen'
import BusinessDashboardScreen from './screens/BusinessDashboardScreen'
import BusinessRegistrationScreen from './screens/BusinessRegistrationScreen'
import ConversationScreen from './screens/ConversationScreen'
import CreateNormalPostScreen from './screens/CreateNormalPostScreen'
import CreateRecruitmentScreen from './screens/CreateRecruitmentScreen'
import CreateSurveyPostScreen from './screens/CreateSurveyPostScreen'
import DetailJobApplyScreen from './screens/DetailJobApplyScreen'
import FacultyDashboardScreen from './screens/FacultyDashboardScreen'
import MyProfileScreen from './screens/MyProfileScreen'
import ForgottenPasswordScreen from './screens/ForgottenPasswordScreen'
import IntermediationScreen from './screens/IntermediationScreen'
import JobApplyScreen from './screens/JobApplyScreen'
import ListFollowScreen from './screens/ListFollowScreen'
import ListJobApplyScreen from './screens/ListJobApplyScreen'
import ListPostSavedScreen from './screens/ListPostSavedScreen'
import LoginScreen from './screens/LoginScreen'
import MessengerScreen from './screens/MessageScreen'
import NotificationScreen from './screens/NotificationScreen'
import OptionScreen from './screens/OptionScreen'
import ProfileScreen from './screens/ProfileScreen'
import RecruitmentDetailScreen from './screens/RecruitmentDetailScreen'
import ReviewSurveyPostScreen from './screens/ReviewSurveyPostScreen'
import SearchScreen from './screens/SearchScreen'
import SplashScreen from './screens/SplashScreen'
import StudentDiscussionDashboardScreen from './screens/StudentDiscussionDashboardScreen'
import StudentRegistrationScreen from './screens/StudentRegistrationScreen'
import SurveyConductScreen from './screens/SurveyConductScreen'
import { useAppSelector } from './redux/Hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_LANGUAGE } from './constants/KeyValue';

const vie = require('moment/locale/vi')
moment.locale('vi', vie)
import SurveyResultScreen from './screens/SurveyResultScreen'
import { Conversation } from './types/Conversation'
import { Student } from './types/Student'
import { Faculty } from './types/Faculty'
import { Business } from './types/Business'
import { NormalPost } from './types/NormalPost'
import { UpdateNormalPost } from './types/UpdateNormalPost'
import CustomizeModalImage from './components/modal/CustomizeModalImage'
import CustomizeModalUserReacted from './components/modal/CustomizeModalUserReacted'
import CustomizeModalComments from './components/modal/CustomizeModalComments'
import ManagementJobApplyScreen from './screens/ManagementJobApplyScreen'
import PenddingPostScreen from './screens/PenddingPostScreen'
import DetailSurveyPost from './screens/DetailSurveyPostScreen'
import DetailSurveyPostScreen from './screens/DetailSurveyPostScreen'
import StudentAndFacultyGroup from './screens/StudentAndFacultyGroup'
import UpdateProfile from './screens/UpdateProfile'
import DetailPost from './screens/DetailPost'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import axios from 'axios'

export type RootStackParamList = {
  ACCEPT_SCREEN: { email: string, subject: string, title: string, url: string } | undefined
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
  CREATE_RECRUITMENT_SCREEN: { recruitmentPostId?: number, groupId?: number } | undefined
  CREATE_SURVEY_SCREEN: { surveyPostId?: number, groupId?: number } | undefined
  SPLASH_SCREEN: undefined
  IMAGE_VIEW_SCREEN: undefined
  INTERMEDIATIOO_SCREEN: undefined
  LIST_FOLLOW_SCREEN: undefined
  ADD_QUESTION_SCREEN: undefined
  REVIEW_SURVEY_POST_SCREEN: undefined
  CREATE_NORMAL_POST_SCREEN: { group: number } | { updateNormalPost: UpdateNormalPost }
  SURVEY_CONDUCT_SCREEN: { surveyPostId: number } | undefined
  RECRUITMENT_DETAIL_SCREEN: { postId: number } | undefined
  JOB_APPLY_SCREEN: { recruitmentPostId?: number, profileId?: number, cvUrl?: string } | undefined
  LIST_JOB_APPLY_SCREEN: { postId: number } | undefined
  DETAIL_JOB_APPLY: { cvId: number } | undefined
  PROFILE_SCREEN: { userId: number, group: string } | undefined
  LIST_POST_SAVED_SCREEN: undefined
  OPTION_SCREEN: { userData: Student | Faculty | Business | null }
  SURVEY_RESULT_SCREEN: { surveyPostId: number } | undefined
  APPLICATION_OPTION_SCREEN: undefined
  MANAGEMENT_JOB_APPLY_SCREEN: undefined
  WAITTING_POST_SCREEN: undefined
  APPROVAL_POST_SCREEN: undefined
  UPDATE_PROFILE: { userData: Student | Faculty | Business | null }
  CHANGE_STATUS_JOB_APPLY_SCREEN: { profileId?: number, status?: string } | undefined
  PEDDING_POST_SCREEN: undefined
  DETAIL_SURVEY_SCREEN: { surveyPostId: number } | undefined
  STUDENT_AND_FACULTY_GROUP: undefined
  DETAIL_POST_SCREEN: { post: any, notificationType: string } | undefined
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
  const { defaultLanguage } = useAppSelector((state) => state.TDCSocialNetworkReducer)

  useEffect(() => {
    AsyncStorage.getItem(DEFAULT_LANGUAGE)
      .then((json) => {
        console.log(json);
        if (json) {
          const defaultLanguage = JSON.parse(json)
          if (defaultLanguage) {
            moment.locale(defaultLanguage, locale.get(defaultLanguage))
            setDefaultLanguage(defaultLanguage)
          }
        }
      })
  }, [])

  useEffect(() => {
    setDefaultLanguage(defaultLanguage)
    moment.locale(defaultLanguage, locale.get(defaultLanguage))
  }, [defaultLanguage])

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
  const t = useTranslation()

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
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.recruitmentDetailScreen')} /> }}
        component={RecruitmentDetailScreen}
      />

      <RootStack.Screen
        name={TOP_TAB_NAVIGATOR}
        options={{
          title: t('ToolbarTitle.topTabNavigator'),
          header: () => <ToolBar />
        }}
        component={TopTabNavigator}
      />
      <RootStack.Screen
        name={DRAWER_TAB_NAVIGATOR}
        options={{ title: t('ToolbarTitle.drawerTabNavigator'), header: () => null }}
        component={DrawerNavigator}
      />

      <RootStack.Screen
        name={FORGOTTEN_PASSWORD_SCREEN}
        options={{ title: t('ToolbarTitle.forgottenPasswordScreen'), header: () => null }}
        component={ForgottenPasswordScreen}
      />

      <RootStack.Screen
        name={ACCEPT_SCREEN}
        options={{ title: t('ToolbarTitle.acceptForgottenPasswordScreen'), header: () => null }}
        component={AcceptScreen}
      />

      <RootStack.Screen
        name={SEACRH_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.searchScreen')} /> }}
        component={SearchScreen}
      />

      <RootStack.Screen
        name={CONVERSATION_SCREEN}
        options={{ header: () => <ToolbarWithSearchIcon title={t('ToolbarTitle.conversationScreen')} /> }}
        component={ConversationScreen}
      />

      <RootStack.Screen
        name={MESSENGER_SCREEN}
        options={{ header: () => <MessengerToolbar /> }}
        component={MessengerScreen}
      />

      <RootStack.Screen
        name={LOGIN_SCREEN}
        options={{ header: () => null }}
        component={LoginScreen}
      />

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
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.createRecruitmentScreen')} /> }}
        component={CreateRecruitmentScreen}
      />

      <RootStack.Screen
        name={CREATE_SURVEY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.createSurveyScreen')} /> }}
        component={CreateSurveyPostScreen}
      />

      <RootStack.Screen
        name={ADD_QUESTION_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.addQuestionScreen')} /> }}
        component={AddQuestionScreen}
      />

      <RootStack.Screen
        name={REVIEW_SURVEY_POST_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.reviewSurveyPostScreen')} /> }}
        component={ReviewSurveyPostScreen}
      />

      <RootStack.Screen
        name={SURVEY_CONDUCT_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.surveyConductScreen')} /> }}
        component={SurveyConductScreen}
      />

      <RootStack.Screen
        name={DETAIL_POST_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.detailPost')} /> }}
        component={DetailPost}
      />

      <RootStack.Screen
        name={JOB_APPLY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.jobApplyScreen')} /> }}
        component={JobApplyScreen}
      />
      <RootStack.Screen
        name={LIST_POST_SAVED_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.listPostSavedScreen')} /> }}
        component={ListPostSavedScreen}
      />

      <RootStack.Screen
        name={CREATE_NORMAL_POST_SCREEN}
        options={{ header: () => null }}
        component={CreateNormalPostScreen}
      />

      <RootStack.Screen
        name={LIST_JOB_APPLY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.listJobApplyScreen')} /> }}
        component={ListJobApplyScreen}
      />

      <RootStack.Screen
        name={LIST_FOLLOW_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.listFollowScreen')} /> }}
        component={ListFollowScreen}
      />

      <RootStack.Screen
        name={PROFILE_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.profileScreen')} /> }}
        component={ProfileScreen}
      />

      <RootStack.Screen
        name={DETAIL_JOB_APPLY}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.detailJobApply')} /> }}
        component={DetailJobApplyScreen}
      />

      <RootStack.Screen
        name={OPTION_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.optionScreen')} /> }}
        component={OptionScreen}
      />

      <RootStack.Screen
        name={SPLASH_SCREEN}
        options={{ header: () => null }}
        component={SplashScreen}
      />

      <RootStack.Screen
        name={SURVEY_RESULT_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.surveyResultScreen')} /> }}
        component={SurveyResultScreen}
      />

      <RootStack.Screen
        name={UPDATE_PROFILE}
        options={{ header: () => <ToolbarWithBackPress title={t("ToolbarTitle.createUpdateProfile")} /> }}
        component={UpdateProfile}
      />
      <RootStack.Screen
        name={APPLICATION_OPTION_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.applicationOptionScreen')} /> }}
        component={ApplicationOptionScreen}
      />

      <RootStack.Screen
        name={MANAGEMENT_JOB_APPLY_SCREEN}
        options={{ header: () => <ToolbarWithBackPress title={t('ToolbarTitle.manageJobApply')} /> }}
        component={ManagementJobApplyScreen}
      />

      <RootStack.Screen
        name={APPROVAL_POST_SCREEN}
        options={{
          header: () => <ToolbarWithBackPress
            title={t('ToolbarTitle.approvalPostScreen')} />
        }}
        component={ApprovalPostScreen} />

      <RootStack.Screen
        name={PEDDING_POST_SCREEN}
        options={{
          header: () => <ToolbarWithBackPress
            title={t('ToolbarTitle.pendingPostScreen')} />
        }}
        component={PenddingPostScreen}
      />

      <RootStack.Screen
        name={DETAIL_SURVEY_SCREEN}
        options={{
          header: () => <ToolbarWithBackPress
            title={t('ToolbarTitle.detailSurveyScreen')} />
        }}
        component={DetailSurveyPostScreen}
      />

      <RootStack.Screen
        name={STUDENT_AND_FACULTY_GROUP}
        options={{
          header: () => <ToolbarWithBackPress
            title={t('ToolbarTitle.studentAndFacultyScreen')} />
        }}
        component={StudentAndFacultyGroup}
      />

    </RootStack.Navigator>
  )
}
// DETAIL_JOB_APPLY
function TopTabNavigator(): JSX.Element {
  const [qty, setQty] = useState(0)
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
  setTimeout(() => {
    axios.post(`${SERVER_ADDRESS}api/notifications/user/count`, {
      id: userLogin?.id
    }).then((response) => {
      setQty(response.data.data)
    })
  }, 1000)

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

          return <>
            <Icon name={iconName} size={size} color={color} solid={focused} />
            {
              iconName == 'bell' ? <Text style={styles.border}><Text style={styles.qty}>{qty}</Text></Text> : ''
            }

          </>
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
      <TopTab.Screen name={FOLLOWING_SCREEN} component={MyProfileScreen} />
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

const styles = StyleSheet.create({
  qty: {
    color: 'white',
    fontWeight: 'bold',
  },
  border: {
    position: 'absolute',
    top: -10,
    right: -8,
    borderRadius: 100,
    backgroundColor: 'red'
  }
})
export default App
