import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rtkQueryErrorLogger } from './Middleware'
import { TDCSocialNetworkAPI } from './Service'
import TaskReducer, { TDCSocialNetworkSlice } from './Slice'

export const store = configureStore({
  reducer: {
    TDCSocialNetworkReducer: TDCSocialNetworkSlice.reducer,
    [TDCSocialNetworkAPI.reducerPath]: TDCSocialNetworkAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TDCSocialNetworkAPI.middleware, rtkQueryErrorLogger)
})

// optional, but req middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorLogger)uired for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
