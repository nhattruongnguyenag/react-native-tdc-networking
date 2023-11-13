import { QuestionResponse } from './response/QuestionResponse'

export interface Question {
  type: string
  title: string
  choices: string[]
  required: number
}

export interface QuestionProps {
  data?: Question
  dataResponse?: QuestionResponse
  index?: number
  isDisableDeleteBtn?: boolean
  reviewMode?: boolean
  conductMode?: boolean
  editMode?: boolean
}

export interface ChoiceProps {
  index: number
  data: string
}

export type MultiChoiceQuestion = Question
export type OneChoiceQuestion = Question
export type ShortAnswerQuestion = Omit<Question, 'choices'>
