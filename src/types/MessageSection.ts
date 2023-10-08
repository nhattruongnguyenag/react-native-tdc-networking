import { Message } from './Messages'
import { User } from './User'

export interface MessageSection {
  title: string
  data: MessageSectionByTime[]
}

export interface MessageSectionByTime {
  sender: User
  messages: Message[]
  time: string
}
