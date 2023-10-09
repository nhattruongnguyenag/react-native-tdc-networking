import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Faculity } from '../components/CustomizeFacultyPost'
import { Student } from '../types/Student'
import { Business } from '../types/Business'
import { ModalImage } from '../types/ModalImage'
import { ModalComments } from '../types/ModalComments'
import { ModalUserReaction } from '../types/ModalUserReaction'
import { Conversation } from '../types/Conversation'

export interface TDCSocialNetworkState {
  conversations: Conversation[]
  selectConversation: Conversation | null
  userLogin: Student | Faculity | Business | null
  deviceToken: string | null
  isOpenModalImage: boolean
  isOpenModalComments: boolean
  isOpenModalUserReaction: boolean
  modalImageData: ModalImage | null
  modalCommentData: ModalComments | null
  modalUserReactionData: ModalUserReaction | null
}

const initialState: TDCSocialNetworkState = {
  conversations: [],
  deviceToken: null,
  selectConversation: null,
  userLogin: null,
  isOpenModalImage: false,
  isOpenModalComments: false,
  isOpenModalUserReaction: false,
  modalImageData: null,
  modalCommentData: null,
  modalUserReactionData: null
}

export const TDCSocialNetworkSlice = createSlice({
  name: 'TDCSocialNetwork',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<Student | Faculity | Business>) => {
      state.userLogin = action.payload
    },
    setDeviceToken: (state, action: PayloadAction<string>) => {
      state.deviceToken = action.payload
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
    setSelectConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.selectConversation = action.payload
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
    listenConversationsSoket: (state, action: PayloadAction<void>) => {
      state.isOpenModalUserReaction = false
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setUserLogin,
  setConversations,
  setDeviceToken,
  openModalImage,
  closeModalImage,
  openModalComments,
  closeModalComments,
  openModalUserReaction,
  closeModalUserReaction,
  setSelectConversation
} = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
