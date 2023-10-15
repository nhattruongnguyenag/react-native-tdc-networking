import { Comment } from './Comment'
import { Images } from './Images'

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
  isLike: boolean
  likes: {
    id: number
    name: string
    image: string
  }[]
  comments: Comment[]
  images: Images['images']
  role: number
}
