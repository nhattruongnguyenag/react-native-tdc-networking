import { User } from './User'

export interface Student extends User {
  password: string
  facultyId: number
  majorId: number
  studentCode: string
  confimPassword: string
  facultyGroupCode?: string
  background?: string
  phone?: string
  subject: string
  content: string
}
