export interface Task {
  _id: number | null
  title: string
  desc: string
  color: string
  image: string
  status: boolean | null
  createAt: number
  updatedAt: number
}
