import { Task } from '../types/Task'
import { TaskSection } from '../types/TaskSection'

export function getTaskBySections(tasks: Task[]): TaskSection[] {
  let index = -1
  let taskSections: TaskSection[] = []
  tasks.sort((task1, task2) => task2.createAt - task1.createAt)
  tasks.forEach((value) => {
    if (
      taskSections.length > 0 &&
      new Date(value.createAt).getDate() === new Date(taskSections[index].title).getDate()
    ) {
      taskSections[index].data.push(value)
    } else {
      taskSections.push({
        title: value.createAt,
        data: []
      })
      index++
      taskSections[index].data.push(value)
    }
  })

  return taskSections
}
