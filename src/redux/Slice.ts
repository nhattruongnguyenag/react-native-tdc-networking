import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Faculty } from '../types/Faculty'
import { Business } from '../types/Business'
import { Conversation, SelectedConversation } from '../types/Conversation'
import { ModalComments } from '../types/ModalComments'
import { ModalImage } from '../types/ModalImage'
import { ModalUserReaction } from '../types/ModalUserReaction'
import { Choice, ChoiceProps, Question } from '../types/Question'
import { Student } from '../types/Student'
import { SurveyPostRequest } from '../types/SurveyPost'
import { Message } from '../types/Message'
import { PostRejectedLog } from '../components/postApproval/PostApprovalItem'
import { User } from '../types/User'
import { SHORT_ANSWER } from '../components/survey/AddQuestionModal'

export interface TDCSocialNetworkState {
  postRejectLog: PostRejectedLog | null
  surveyPostRequest: SurveyPostRequest | null
  questions: Question[]
  imagesUpload: string[] | null
  conversations: Conversation[]
  conversationMessages: Message[]
  selectConversation: SelectedConversation | null
  userLogin: User | null
  deviceToken: string | null
  isOpenModalImage: boolean
  isOpenModalComments: boolean
  isOpenModalUserReaction: boolean
  modalImageData: ModalImage | null
  modalCommentData: ModalComments | null
  modalUserReactionData: ModalUserReaction | null
  updatePost: boolean
  userIdOfProfileNow: number
  currentScreenNowIsProfileScreen: boolean
  defaultLanguage: string
  logout: boolean
}

const initialState: TDCSocialNetworkState = {
  postRejectLog: null,
  defaultLanguage: 'vi',
  conversationMessages: [],
  surveyPostRequest: null,
  questions: [],
  imagesUpload: null,
  conversations: [],
  deviceToken: null,
  selectConversation: null,
  userLogin: null,
  isOpenModalImage: false,
  isOpenModalComments: false,
  isOpenModalUserReaction: false,
  modalImageData: null,
  modalCommentData: null,
  modalUserReactionData: null,
  updatePost: false,
  userIdOfProfileNow: 0,
  currentScreenNowIsProfileScreen: false,
  logout: false
}

export const TDCSocialNetworkSlice = createSlice({
  name: 'TDCSocialNetwork',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<Student | Faculty | Business>) => {
      state.userLogin = action.payload
    },
    setDeviceToken: (state, action: PayloadAction<string>) => {
      state.deviceToken = action.payload
    },
    setImagesUpload: (state, action: PayloadAction<string[]>) => {
      state.imagesUpload = action.payload
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
    setSelectConversation: (state, action: PayloadAction<SelectedConversation | null>) => {
      state.selectConversation = action.payload
    },
    setConversationMessages: (state, action: PayloadAction<Message[]>) => {
      state.conversationMessages = action.payload
    },
    setSurveyPostRequest: (state, action: PayloadAction<SurveyPostRequest | null>) => {
      state.surveyPostRequest = action.payload
    },
    updateSurveyTitle: (state, action: PayloadAction<string>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.title = action.payload
      }
    },
    updateSurveyDescription: (state, action: PayloadAction<string>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.description = action.payload
      }
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions = [...state.surveyPostRequest.questions, action.payload]
      }
    },
    updateQuestion: (state, action: PayloadAction<{ index: number; question: Question }>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions[action.payload.index] = action.payload.question
      }
    },
    deleteQuestion: (state, action: PayloadAction<number | undefined>) => {
      if (state.surveyPostRequest && action.payload !== undefined) {
        state.surveyPostRequest.questions.splice(action.payload, 1)
      }
    },
    addChoice: (state, action: PayloadAction<{ questionIndex: number; choice: Choice }>) => {
      const data = action.payload
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions[data.questionIndex].choices?.push(data.choice)
      }
    },
    updateChoice: (state, action: PayloadAction<{ questionIndex: number; choiceIndex: number; content: string }>) => {
      const data = action.payload
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions[data.questionIndex].choices[data.choiceIndex].content = data.content
      }
    },
    deleteChoice: (state, action: PayloadAction<{ questionIndex: number; choiceIndex: number }>) => {
      const data = action.payload
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions[data.questionIndex].choices.splice(data.choiceIndex, 1)
      }
    },
    openModalImage: (state, action: PayloadAction<ModalImage>) => {
      state.modalImageData = action.payload
      state.isOpenModalImage = true
    },
    closeModalImage: (state, action: PayloadAction<void>) => {
      state.isOpenModalImage = false
    },
    openModalComments: (state, action: PayloadAction<ModalComments>) => {
      state.modalCommentData = action.payload
      state.isOpenModalComments = true
    },
    closeModalComments: (state, action: PayloadAction<void>) => {
      state.isOpenModalComments = false
    },
    openModalUserReaction: (state, action: PayloadAction<ModalUserReaction>) => {
      state.modalUserReactionData = action.payload
      state.isOpenModalUserReaction = true
    },
    closeModalUserReaction: (state, action: PayloadAction<void>) => {
      state.isOpenModalUserReaction = false
    },
    goToProfileScreen: (state, action: PayloadAction<number>) => {
      state.userIdOfProfileNow = action.payload
    },
    setCurrentScreenNowIsProfileScreen: (state, action: PayloadAction<boolean>) => {
      state.currentScreenNowIsProfileScreen = action.payload
    },
    updatePostWhenHaveChangeComment: (state, action: PayloadAction<boolean>) => {
      state.updatePost = action.payload
    },
    listenConversationsSoket: (state, action: PayloadAction<void>) => {
      state.isOpenModalUserReaction = false
    },
    setDefaultLanguage: (state, action: PayloadAction<string>) => {
      state.defaultLanguage = action.payload
    },
    setPostRejectLog: (state, action: PayloadAction<PostRejectedLog | null>) => {
      state.postRejectLog = action.payload
    },
    setIsLogout: (state, action: PayloadAction<boolean>) => {
      state.logout = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setPostRejectLog,
  setDefaultLanguage,
  setImagesUpload,
  setUserLogin,
  setConversations,
  setConversationMessages,
  setDeviceToken,
  setSurveyPostRequest,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  addChoice,
  updateChoice,
  deleteChoice,
  updateSurveyTitle,
  updateSurveyDescription,
  openModalImage,
  closeModalImage,
  openModalComments,
  closeModalComments,
  openModalUserReaction,
  closeModalUserReaction,
  setSelectConversation,
  updatePostWhenHaveChangeComment,
  goToProfileScreen,
  setCurrentScreenNowIsProfileScreen,
  setIsLogout
} = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
