export interface RecruitmentPostRequest {
    userId: number
    type: string
    images: string[]
    title: string
    salary: number
    benefit: string
    description: string
    employmentType: string
    location: string
    requirement: string
    expiration: string
}