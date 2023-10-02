import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Data } from '../types/Data'
import { Token } from '../types/Token'
import { UserLoginRequest } from '../types/UserLoginRequest'

// https://mocki.io/v1/754d6bc3-3162-4a48-8c14-6191a8895a01
export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mocki.io/v1/' }),
  tagTypes: ['UserLogin'],
  endpoints: (builder) => ({
    login: builder.query<Data<Token>, void>({
      query: () => ({
        url: '754d6bc3-3162-4a48-8c14-6191a8895a01',
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginQuery } = TDCSocialNetworkAPI
