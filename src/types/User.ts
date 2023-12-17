export interface User {
  id: number
  email: string
  name: string
  image: string
  status?: number
  createdAt?: string
  isTyping?: number
  isMessageConnect?: number
  updatedAt?: string
  lastActive?: string
  roleCodes?: string
  code: string
  background?:string
}
