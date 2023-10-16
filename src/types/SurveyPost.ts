import { Question } from './Question'

export interface SurveyPostRequest {
  type: string
  title: string
  description: string
  images: string[]
  userId: number
  questions: Question[]
}
