import { User } from './User'

export interface Student extends User {
    password: string
    facultyName: string
    major: string
    studentCode: string
    confimPassword: string
}
