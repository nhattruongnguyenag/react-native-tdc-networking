import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TDCSocialNetworkState {
  editingPostId: string
}

const initialState: TDCSocialNetworkState = {
  editingPostId: ''
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
    }
  }
})

// Action creators are generated for each case reducer function
export const { startEditPost, cancelEditPost } = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
