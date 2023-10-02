export interface FacultyPost {
  name: string
  avatar: string
  timeCreatePost: string
  content: string
  images: [] | null
  likes: number
  isLike: boolean
  comments: number
  isComment: boolean
  allComments: [] | null
  allLikes: [] | null
}
