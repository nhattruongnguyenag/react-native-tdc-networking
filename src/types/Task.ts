export interface Task {
  _id: number | null
  title: string
  desc: string
  color: string
  image: string | null
  isDone: boolean
  createAt: number
  updatedAt: number
}
