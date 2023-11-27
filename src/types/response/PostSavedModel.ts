import { Comment } from "../Comment"
import { Like } from "../Like"
import { User } from "../User"

export interface PostSavedModel {
  id: number
  status: 0
  active: number
  type: string
  user: User
  group: string
  likes: Like[]
  comments: Comment[]
  commentQty: number
  isSave: number
  content: string
  title: string | null
}