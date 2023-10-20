export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  content: string
  user: {
    id: number
    name: string
    image: string
  }
  postId: number
  parent: {
    parentId: number
    name: string
  } | null
  childrens: Comment[]
}
