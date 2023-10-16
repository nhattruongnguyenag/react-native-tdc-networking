import { Images } from './Images'

export interface ModalImage {
  name: string
  userId: number
  avatar: string
  imageIdClicked: number
  images: Images[]
  listImageError: number[]
}
