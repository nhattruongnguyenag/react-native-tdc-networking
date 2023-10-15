import { Images } from './Images'

export interface ModalImage {
  name: string
  userId: number
  avatar: string
  imageName: string
  images: Images['images']
  listImageError: string[]
}
