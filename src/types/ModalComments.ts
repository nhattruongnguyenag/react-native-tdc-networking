export interface ModalComments {
  id: number
  commentFather: {
    id: number
    name: string
    avatar: string
    content: string
    timeCreated: string
    commentChildren: {
      id: number
      name: string
      avatar: string
      content: string
      timeCreated: string
    }[]
  }[]
}
