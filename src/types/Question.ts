import { QuestionResponse } from './response/QuestionResponse'

export interface Question {
  id?: number
  type?: string
  title: string
  choices?: Choice[]
  required: number
}

export interface Choice {
  id?: number
  content: string
}

export interface ChoiceProps {
  index: number
  choice: string
}

export interface QuestionProps {
  data?: Question
  dataResponse?: QuestionResponse
  index?: number
  isDisableDeleteBtn?: boolean
  onUpdateQuestion?: (questionIndex: number) => void
  reviewMode?: boolean
  conductMode?: boolean
  editMode?: boolean
  mode: number[]
}
