export interface Task {
  _id: number | null
  title: string
  desc: string
  image: string
  status: boolean | null
  createAt: Date | null
  updatedAt: Date | null
}
