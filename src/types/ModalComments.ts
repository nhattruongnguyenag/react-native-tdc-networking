export interface ModalComments {
  id: number
  userCreatedPostId: number
  group: string
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
