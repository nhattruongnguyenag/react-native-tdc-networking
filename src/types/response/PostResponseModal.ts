import { Base } from "../Base"
import { Comment } from "../Comment"
import { Group } from "../Group"
import { Images } from "../Images"
import { Like } from "../Like"
import { LikeAction } from "../LikeActions"
import { User } from "../User"

export interface PostResponseModal extends Base {
    user: User
    status: number
    active: number
    type: string
    likes: Like[]
    comment: Comment[]
    group: Group
    commentQuantity: number
  }