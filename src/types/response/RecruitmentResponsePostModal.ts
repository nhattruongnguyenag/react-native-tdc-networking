import { PostResponseModal } from './PostResponseModal'

export interface RecruitmentResponsePostModal extends PostResponseModal {
  title: string
  salary: number
  benefit: string
  description: string
  employmentType: string
  expiration: string
  location: string
  requirement: string
  timeCreatePost: string
}
