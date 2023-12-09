import { PostResponseModal } from "./PostResponseModal";
import { QuestionResponse } from "./QuestionResponse";

export interface SurveyResponsePostModal extends PostResponseModal {
    title: string
    description: string
    questions: QuestionResponse[]
}