import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Faculty } from '../types/Faculty'
import { Business } from '../types/Business'
import { Conversation } from '../types/Conversation'
import { ModalComments } from '../types/ModalComments'
import { ModalImage } from '../types/ModalImage'
import { ModalUserReaction } from '../types/ModalUserReaction'
import { ChoiceProps, Question } from '../types/Question'
import { Student } from '../types/Student'
import { SurveyPostRequest } from '../types/SurveyPost'
import { UpdatePost } from '../types/updatePost'

export interface TDCSocialNetworkState {
  surveyPostRequest: SurveyPostRequest | null
  choices: string[]
  questions: Question[]
  imagesUpload: string[] | null
  conversations: Conversation[]
  selectConversation: Conversation | null
  userLogin: Student | Faculty | Business | null
  deviceToken: string | null
  isOpenModalImage: boolean
  isOpenModalComments: boolean
  isOpenModalUserReaction: boolean
  modalImageData: ModalImage | null
  modalCommentData: ModalComments | null
  modalUserReactionData: ModalUserReaction | null
  updatePost: boolean
}

const initialState: TDCSocialNetworkState = {
  surveyPostRequest: null,
  choices: ['', '', ''],
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
  updatePost: false
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
    setSelectConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.selectConversation = action.payload
    },
    setSurveyPostRequest: (state, action: PayloadAction<SurveyPostRequest | null>) => {
      state.surveyPostRequest = action.payload
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions = [...state.surveyPostRequest.questions, action.payload]
      }
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      if (state.surveyPostRequest) {
        state.surveyPostRequest.questions.splice(action.payload, 1)
      }
    },
    addChoice: (state, action: PayloadAction<string>) => {
      state.choices.push(action.payload)
    },
    updateChoice: (state, action: PayloadAction<ChoiceProps>) => {
      state.choices[action.payload.index] = action.payload.data
    },
    deleteChoice: (state, action: PayloadAction<number>) => {
      state.choices.splice(action.payload, 1)
    },
    resetChoices: (state, action: PayloadAction<void>) => {
      state.choices = ['', '', '']
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
    updatePostWhenHaveChangeComment: (state, action: PayloadAction<boolean>) => {
      state.updatePost = action.payload
    },
    listenConversationsSoket: (state, action: PayloadAction<void>) => {
      state.isOpenModalUserReaction = false
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setImagesUpload,
  setUserLogin,
  setConversations,
  setDeviceToken,
  setSurveyPostRequest,
  addQuestion,
  deleteQuestion,
  addChoice,
  updateChoice,
  deleteChoice,
  resetChoices,
  openModalImage,
  closeModalImage,
  openModalComments,
  closeModalComments,
  openModalUserReaction,
  closeModalUserReaction,
  setSelectConversation,
  updatePostWhenHaveChangeComment
} = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
