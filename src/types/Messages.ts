import { Base } from './Base'
import { User } from './User'

export interface Message extends Base {
  sender: User
  receiver: User
  content: string
  status: 0
}
