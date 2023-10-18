import { Comment } from './Comment'
import { Images } from './Images'
import { Like } from './Like'
import { LikeAction } from './LikeActions'

export interface Post {
  id: number
  userId: number
  name: string
  avatar: string
  typeAuthor: string | null
  available: boolean | null
  timeCreatePost: string
  content: string
  type: string | null
  likes: Like[]
  comments: Comment[]
  commentQty: number
  images: Images[]
  role: number
  likeAction: (data: LikeAction) => void
}
