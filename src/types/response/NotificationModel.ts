import { User } from '../User'

export interface NotificationModel {
  id: number
  createdAt: string
  content: string
  status: string
  user: User
}
