import { Comment } from './Comment'
import { Images } from './Images'
import { Like } from './Like'
import { LikeAction } from './LikeActions'

export interface Post {
  // Normal post
  id: number
  userId: number
  name: string
  avatar: string
  typeAuthor: string | null
  available: boolean | null
  timeCreatePost: string
  content: string
  type: string
  likes: Like[]
  comments: Comment[]
  commentQty: number
  images: Images[]
  role: string
  likeAction: (data: LikeAction) => void
  // Recruitment post
  location: string | null
  title: string | null
  expiration: string | null
  salary: string | null
  employmentType: string | null
  description: string | null
}
