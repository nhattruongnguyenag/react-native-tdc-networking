import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { DeviceToken } from '../types/DeviceToken'
import { MessageResponseData } from '../types/MessageResponseData'

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ADDRESS }),
  tagTypes: ['UserLogin'],
  endpoints: (builder) => ({
    saveDeviceToken: builder.mutation<MessageResponseData, DeviceToken>({
      query: (data) => ({
        url: 'api/device-token',
        method: 'POST',
        body: data
      })
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSaveDeviceTokenMutation } = TDCSocialNetworkAPI
