import { PostSearchRequest } from "../types/request/PostSearchRequest";
import { RecruitmentPostResponseModel } from "../types/response/RecruitmentPostResponseModel";
import { SurveyPostResponseModel } from "../types/response/SurveyResponsePostModal";
import { TextImagePostResponseModel } from "../types/response/TextImagePostResponseModel";

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

export function isRecruitmentPost(post?: any): post is RecruitmentPostResponseModel {
    return post !== undefined && post instanceof Object && post !== null && 'salary' in post
}

export function isSurveyPost(post?: any): post is SurveyPostResponseModel {
    return post !== undefined && post instanceof Object && post !== null && 'questions' in post
}

export function isTextImagePost(post?: any): post is TextImagePostResponseModel {
    return post !== undefined && post instanceof Object && post !== null && 'content' in post
}
