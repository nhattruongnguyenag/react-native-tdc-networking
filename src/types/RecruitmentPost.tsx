export interface RecruitmentPost {
    id?: number
    userId?: number
    type?: string
    title: string
    salary: number
    benefit: string
    description: string
    employmentType: string
    location: string
    requirement: string
    expiration: string
    groupId?: number
}