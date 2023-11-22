import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Conversation } from '../types/Conversation'
import { Data } from '../types/Data'
import { DeviceToken } from '../types/DeviceToken'
import { Question } from '../types/Question'
import { FCMNotificationRequest } from '../types/request/FCMNotificationRequest'
import { JobApplyRequest } from '../types/request/JobApplyRequest'
import { RecruitmentPostRequest } from '../types/request/RecruitmentPostRequest'
import { SurveyConductRequest } from '../types/request/SurveyConductRequest'
import { MessageResponseData } from '../types/response/MessageResponseData'
import { QuestionResponse, SurveyResponse } from '../types/response/QuestionResponse'
import { SurveyItemResult } from '../types/response/SurveyResult'
import { SurveyPostRequest } from '../types/SurveyPost'
import { FollowUserModel } from '../types/response/FollowUserModel'

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ADDRESS }),
  tagTypes: ['UserLogin'],
  endpoints: (builder) => ({
    getFollowerUser: builder.query<Data<FollowUserModel[]>, { id: number | undefined }>({
      query: (data) => ({
        url: 'api/users/follow/other',
        method: 'POST',
        body: data
      })
    }),
    getFollowingUser: builder.query<Data<FollowUserModel[]>, { id: number | undefined }>({
      query: (data) => ({
        url: 'api/users/follow/me',
        method: 'POST',
        body: data
      })
    }),
    getConversationsByUserId: builder.query<Conversation[], number>({
      query: (userId) => `api/conversations/${userId}`
    }),
    getQuestionsFromSurveyPost: builder.query<Data<SurveyResponse>, { postId: number, userLogin: number }>({
      query: ({ postId, userLogin }) => `api/posts/survey?postId=${postId}&userLogin=${userLogin}`
    }),
    saveDeviceToken: builder.mutation<MessageResponseData, DeviceToken>({
      query: (data) => ({
        url: 'api/device-token',
        method: 'POST',
        body: data
      })
    }),
    sendFCMNotification: builder.mutation<MessageResponseData, FCMNotificationRequest>({
      query: (data) => ({
        url: 'api/fcm-notification',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    addSurveyPost: builder.mutation<MessageResponseData, SurveyPostRequest>({
      query: (data) => ({
        url: 'api/posts/survey',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    addRecruitmentPost: builder.mutation<MessageResponseData, RecruitmentPostRequest>({
      query: (data) => ({
        url: 'api/posts/recruitment',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    addSurveyConductAnswer: builder.mutation<MessageResponseData, SurveyConductRequest>({
      query: (data) => ({
        url: 'api/posts/survey/conduct',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    jobApply: builder.mutation<MessageResponseData, JobApplyRequest>({
      query: (data) => ({
        url: 'api/job/apply',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
    }),
    getSurveyResult: builder.query<Data<SurveyItemResult[]>, number>({
      query: (surveyPostId) => ({
        url: `api/posts/survey/${surveyPostId}/result`
      })
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetFollowingUserQuery,
  useGetFollowerUserQuery,
  useGetSurveyResultQuery,
  useGetQuestionsFromSurveyPostQuery,
  useGetConversationsByUserIdQuery,
  useAddSurveyPostMutation,
  useSaveDeviceTokenMutation,
  useSendFCMNotificationMutation,
  useAddRecruitmentPostMutation,
  useAddSurveyConductAnswerMutation,
  useJobApplyMutation
} = TDCSocialNetworkAPI
