import { Base } from './Base'
import { User } from './User'

export interface Conversation extends Base {
  sender: User
  receiver: User
  countNewMessage: number
  lastMessageContent: string
  lastMessageSentAt: string
  lastMessageType: string
}
