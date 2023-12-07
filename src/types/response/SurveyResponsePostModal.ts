import { PostResponseModel } from "./PostResponseModel";
import { QuestionResponse } from "./QuestionResponse";

export interface SurveyPostResponseModel extends PostResponseModel {
    title: string
    description: string
    questions: QuestionResponse[]
}