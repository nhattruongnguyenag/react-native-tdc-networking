import { Base } from "../Base"

export interface QuestionResponse extends Base {
  type: string
  title: string
  choices: string[]
}