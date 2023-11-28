import { Question } from './Question'

export interface SurveyPostRequest {
  id?: number
  groupId?: number
  type: string
  title: string
  description: string
  userId?: number
  questions: Question[]
}
