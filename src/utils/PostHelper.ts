import { PostSearchRequest } from "../types/request/PostSearchRequest";
import { RecruitmentResponsePostModal } from "../types/response/RecruitmentResponsePostModal";
import { SurveyResponsePostModal } from "../types/response/SurveyResponsePostModal";
import { TextImagePostResponseModal } from "../types/response/TextImagePostResponseModal";

export function buildPostSearchRequest(postSearchRequest: PostSearchRequest) {
    let key: keyof PostSearchRequest
    let params: String[] = []
    for (key in postSearchRequest) {
        if (postSearchRequest[key]) {
            params.push(`${key}=${postSearchRequest[key]}`)
        }
    }

    console.log(params.join('&'))
    return params.join('&')
}

export function isRecruitmentPost(post?: any): post is RecruitmentResponsePostModal {
    return post !== undefined && post instanceof Object && post !== null && 'salary' in post
}

export function isSurveyPost(post?: any): post is SurveyResponsePostModal {
    return post !== undefined && post instanceof Object && post !== null && 'questions' in post
}

export function isTextImagePost(post?: any): post is TextImagePostResponseModal {
    return post !== undefined && post instanceof Object && post !== null && 'content' in post
}
