import { PostResponseModel } from "./PostResponseModel";

export interface RecruitmentPostResponseModel extends PostResponseModel {
    title: string
    salary: number
    benefit: string
    description: string
    employmentType: string
    expiration: string
    location: string
    requirement: string
}