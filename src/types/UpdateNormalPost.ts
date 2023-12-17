import { Images } from "./Images"

export interface UpdateNormalPost {
  postId: number
  content: string
  images: Images[]
}
