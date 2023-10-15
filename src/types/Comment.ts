export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  content: string
  user: {
    name: string
    image: string
  }
  postId: number
  parentId: number | null
  childrens: Comment[]
}
