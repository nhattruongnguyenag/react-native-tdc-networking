import { Base } from "../Base"
import { Comment } from "../Comment"
import { Group } from "../Group"
import { Like } from "../Like"
import { User } from "../User"

export interface PostResponseModel extends Base {
  user: User
  status: number
  active: number
  type: string
  likes: Like[]
  comment: Comment[]
  group: Group
  commentQuantity: number
}