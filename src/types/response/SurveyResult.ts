export interface SurveyItemResult {
    id: number
    type: string
    title: string
    answers: string[]
    choices: ChoiceItemResult[]
}

export interface ChoiceItemResult {
    content: string
    vote: number
}