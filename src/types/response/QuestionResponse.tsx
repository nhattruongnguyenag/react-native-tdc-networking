import { Base } from '../Base'

export interface SurveyResponse extends Base {
  isConduct: number
  questions: QuestionResponse[]
}

export interface QuestionResponse extends Base {
  type: string
  title: string
  choices: Choice[]
  required: number
}

interface Choice {
  voteQuestionId: number
  content: string
}
