export interface SurveyConductRequest {
  post_id: number
  user_id: number
  answers: AnswerRequest[]
}

export interface AnswerRequest {
  question_id: number
  content: string
  choices_ids: number[]
}
