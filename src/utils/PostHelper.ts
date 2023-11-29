import { PostSearchRequest } from "../types/request/PostSearchRequest";

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