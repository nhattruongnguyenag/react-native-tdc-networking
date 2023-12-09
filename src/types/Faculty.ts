import { User } from './User'

export interface Faculty extends User {
  facultyGroupCode: string,
  facultyGroupId:number
}
