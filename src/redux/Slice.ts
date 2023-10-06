import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Faculity } from '../components/CustomizeFacultyPost'
import { Student } from '../types/Student'
import { Business } from '../types/Business'
import { ModalImage } from '../types/ModalImage'
import { ModalComments } from '../types/ModalComments'
import { ModalUserReaction } from '../types/ModalUserReaction'

export interface TDCSocialNetworkState {
  userLogin: Student | Faculity | Business | null
  isOpenModalImage: boolean
  isOpenModalComments: boolean
  isOpenModalUserReaction: boolean
  modalImageData: ModalImage | null
  modalCommentData: ModalComments | null
  modalUserReactionData: ModalUserReaction | null
}

const initialState: TDCSocialNetworkState = {
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
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserLogin } = TDCSocialNetworkSlice.actions
export const {
  openModalImage,
  closeModalImage,
  openModalComments,
  closeModalComments,
  openModalUserReaction,
  closeModalUserReaction
} = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
