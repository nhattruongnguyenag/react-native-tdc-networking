import { Message } from './Messages'
import { User } from './User'

export interface MessageSection {
  title: string
  data: MessageSectionByTime[]
}

export interface MessageSectionByTime {
  type: string
  sender: User
  messages: Message[]
  time: string
}