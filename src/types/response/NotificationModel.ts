import { User } from '../User'

export interface NotificationModel {
  id: number
  createdAt: string
  content: string
  type: string
  data: string
  status: string
  dataValue: any | null
  userInteracted: any | null
}
