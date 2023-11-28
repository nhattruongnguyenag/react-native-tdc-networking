import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PostRejectedLog } from '../components/postApproval/PostApprovalItem'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Conversation } from '../types/Conversation'
import { Data } from '../types/Data'
import { DeviceToken } from '../types/DeviceToken'
import { FCMNotificationRequest } from '../types/request/FCMNotificationRequest'
import { JobApplyRequest } from '../types/request/JobApplyRequest'
import { PostSearchRequest } from '../types/request/PostSearchRequest'
import { RecruitmentPost } from '../types/RecruitmentPost'
import { SurveyConductRequest } from '../types/request/SurveyConductRequest'
import { MessageResponseData } from '../types/response/MessageResponseData'
import { PostResponseModal } from '../types/response/PostResponseModal'
import { SurveyResponse } from '../types/response/QuestionResponse'
import { SurveyItemResult } from '../types/response/SurveyResult'
import { SurveyPostRequest } from '../types/SurveyPost'
import { buildPostSearchRequest } from '../utils/PostHelper'

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ADDRESS, timeout: 10000 }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
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
    addRecruitmentPost: builder.mutation<MessageResponseData, RecruitmentPost>({
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
    sendEmail: builder.mutation<MessageResponseData, string>({
      query: (data) => ({
        url: 'api/users/get/email/reset',
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
    }),
    getPosts: builder.query<Data<PostResponseModal[]>, PostSearchRequest>({
      query: (data) => (
        {
          url: `api/posts/search?${buildPostSearchRequest(data)}`
        }),
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({ type: 'Posts' as const, id: id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
        }

        return [{ type: 'Posts' as const, id: 'LIST' }]
      }
    }),
    rejectPost: builder.mutation<MessageResponseData, PostRejectedLog>({
      query: (data) => ({
        url: 'api/approval/post/log',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: 'LIST' }])
    }),
    acceptPost: builder.mutation<MessageResponseData, { postId: number }>({
      query: (data) => ({
        url: 'api/posts/acceptance',
        method: 'POST',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: 'LIST' }])
    }),
    getPostRejectLog: builder.query<Data<PostRejectedLog>, { postId: number }>({
      query: (data) => (
        {
          url: `api/approval/log/post/${data.postId}`
        })
    }),
    deletePost: builder.mutation<MessageResponseData, { postId: number }>({
      query: (data) => ({
        url: `api/posts/${data.postId}`,
        method: 'DELETE',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: 'LIST' }])
    }),
    getRecruitmentPostUpdate: builder.query<RecruitmentPost, { postId: number }>({
      query: (data) => (
        {
          url: `api/posts/recruitment/${data.postId}/update`
        })
    }),
    updateRecruitmentPost: builder.mutation<MessageResponseData, RecruitmentPost>({
      query: (data) => ({
        url: 'api/posts/recruitment',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: data.id }])
    }),
    getSurveyPostUpdate: builder.query<Data<SurveyPostRequest>, { postId: number }>({
      query: (data) => (
        {
          url: `api/posts/survey/${data.postId}/update`
        })
    }),
    updateSurveyPost: builder.mutation<MessageResponseData, SurveyPostRequest>({
      query: (data) => ({
        url: 'api/posts/survey',
        method: 'PUT',
        body: data,
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: data.id }])
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostRejectLogQuery,
  useGetPostsQuery,
  useGetSurveyResultQuery,
  useGetQuestionsFromSurveyPostQuery,
  useGetConversationsByUserIdQuery,
  useAddSurveyPostMutation,
  useSaveDeviceTokenMutation,
  useSendFCMNotificationMutation,
  useAddRecruitmentPostMutation,
  useAddSurveyConductAnswerMutation,
  useJobApplyMutation,
  useSendEmailMutation,
  useRejectPostMutation,
  useAcceptPostMutation,
  useDeletePostMutation,
  useGetRecruitmentPostUpdateQuery,
  useUpdateRecruitmentPostMutation,
  useGetSurveyPostUpdateQuery,
  useUpdateSurveyPostMutation
} = TDCSocialNetworkAPI
