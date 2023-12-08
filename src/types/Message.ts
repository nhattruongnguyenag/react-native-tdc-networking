import { Base } from './Base'
import { User } from './User'

export interface Message extends Base {
  type: string
  sender: User
  receiver: User
  content: string
  status: number
}
