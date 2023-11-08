export interface SurveyConductRequest {
  user_id: number
  answers: AnswerRequest[]
}

export interface AnswerRequest {
  question_id: number
  content: string
  choices_ids: number[]
}
