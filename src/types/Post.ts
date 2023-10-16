import { Comment } from './Comment'
import { Images } from './Images'
import { Like } from './Like'

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
  images: Images['images']
  role: number
}
