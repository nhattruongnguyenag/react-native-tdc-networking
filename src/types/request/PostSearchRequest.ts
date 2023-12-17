export interface PostSearchRequest {
    active?: number
    group?: string
    ownerFaculty?: string
    status?: number
    userId?: number
    postId?: number
    type?: string
    limit?: number
    offset?: number
}