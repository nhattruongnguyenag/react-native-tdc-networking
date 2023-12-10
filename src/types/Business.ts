import { User } from './User'

export interface Business extends User {
  password: string
  representor: string
  taxCode: string
  address: string
  activeTime: string
  confimPassword: string
  phone: string
  subject: string
  content: string
}
