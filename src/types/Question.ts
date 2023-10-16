export interface Question {
  type: string
  title: string
  choices: string[]
}

export interface QuestionProps {
  data: Question
  index: number
}

export interface ChoiceProps {
  index: number
  data: string
}

export type MultiChoiceQuestion = Question
export type OneChoiceQuestion = Question
export type ShortAnswerQuestion = Omit<Question, 'choices'>
