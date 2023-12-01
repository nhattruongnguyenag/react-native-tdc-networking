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
import { FollowUserModel } from '../types/response/FollowUserModel'
import { buildPostSearchRequest } from '../utils/PostHelper'
import { JobApplyRespose } from '../types/response/JobApplyResponse'
import { JobApplyUpdateRequest } from '../types/request/JobApplyUpdateRequest'
import { JobUpdateStatus } from '../types/request/JobUpdateStatus'
import { PostSavedModel } from '../types/response/PostSavedModel'
import { NotificationModel } from '../types/response/NotificationModel'
import { JobApplyResponseData } from '../types/response/JobApplyResponseData'

export const TDCSocialNetworkAPI = createApi({
  reducerPath: 'TDCSocialNetworkAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ADDRESS, timeout: 10000 }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getNotificationsUser: builder.query<Data<NotificationModel[]>, { id: number }>({
      query: (data) => ({
        url: 'api/notifications/user',
        method: 'POST',
        body: data
      })
    }),
    getListPostSaved: builder.query<Data<PostSavedModel[]>, number>({
      query: (userId) => `api/posts/user/save/${userId}`
    }),
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
    jobApplyUpdate: builder.mutation<MessageResponseData, JobApplyUpdateRequest | JobUpdateStatus>({
      query: (data) => ({
        url: 'api/job/update',
        method: 'PUT',
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
    getJobProfile: builder.query<Data<JobApplyRespose[]>, number | undefined>({
      query: (userId) => (
        {
          url: `api/job/user/${userId}`
        }),
    }),
    getProfileApply: builder.query<Data<JobApplyResponseData[]>, number | undefined>({
      query: (postId) => (
        {
          url: `api/job/post/${postId}`
        }),
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
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts' as const, id: data.postId }])
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProfileApplyQuery,
  useGetJobProfileQuery,
  useGetPostRejectLogQuery,
  useGetNotificationsUserQuery,
  useGetListPostSavedQuery,
  useGetFollowingUserQuery,
  useGetFollowerUserQuery,
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
  useJobApplyUpdateMutation,
  useDeletePostMutation,
  useGetRecruitmentPostUpdateQuery,
  useUpdateRecruitmentPostMutation,
  useGetSurveyPostUpdateQuery,
  useUpdateSurveyPostMutation
} = TDCSocialNetworkAPI
