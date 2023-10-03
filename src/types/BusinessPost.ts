export interface BusinessPost {
  name: string
  avatar: string
  typeAuthor: string
  available: boolean
  timeCreatePost: string
  content: string
  images: [] | null
  type: string
  likes: number
  isLike: boolean
  comments: number
  isComment: boolean
  allComments: [] | null
  allLikes: [] | null
}
