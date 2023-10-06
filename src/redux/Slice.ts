import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ModalImage } from '../types/ModalImage'
import { ModalComments } from '../types/ModalComments'
import { ModalUserReaction } from '../types/ModalUserReaction'
export interface TDCSocialNetworkState {
  editingPostId: string
  isOpenModalImage: boolean
  isOpenModalComments: boolean
  isOpenModalUserReaction: boolean
  modalImageData: ModalImage | null
  modalCommentData: ModalComments | null
  modalUserReactionData: ModalUserReaction | null
}

const initialState: TDCSocialNetworkState = {
  editingPostId: '',
  isOpenModalImage: false,
  isOpenModalComments: false,
  isOpenModalUserReaction: false,
  modalImageData: null,
  modalCommentData: null,
  modalUserReactionData: null
}

export const TDCSocialNetworkSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.editingPostId = action.payload
    },
    cancelEditPost: (state, action: PayloadAction<void>) => {
      state.editingPostId = ''
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
export const {
  startEditPost,
  cancelEditPost,
  openModalImage,
  closeModalImage,
  openModalComments,
  closeModalComments,
  openModalUserReaction,
  closeModalUserReaction
} = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
