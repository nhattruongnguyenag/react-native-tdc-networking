import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Faculity } from '../components/CustomizeFacultyPost'
import { Student } from '../types/Student'
import { Business } from '../types/Business'

export interface TDCSocialNetworkState {
  userLogin: Student | Faculity | Business | null
}

const initialState: TDCSocialNetworkState = {
  userLogin: null,
}

export const TDCSocialNetworkSlice = createSlice({
  name: 'TDCSocialNetwork',
  initialState,
  reducers: {
    setUserLogin: (state, action:PayloadAction<Student | Faculity | Business>) => {
      state.userLogin = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserLogin } = TDCSocialNetworkSlice.actions

export default TDCSocialNetworkSlice.reducer
