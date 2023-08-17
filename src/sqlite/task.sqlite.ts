import { Transaction } from 'react-native-sqlite-storage'
import { Task } from '../types/Task'
import { getDBConnection } from './core.sqlite'

export async function saveOrUpdateTask(task: Task) {
  let db = await getDBConnection()

  let sql = ''
  let params = [] as any[]
  if (task._id == null) {
    sql = 'INSERT INTO tasks (title, desc, image)'
    sql += '\nVALUES(?, ?, ?)'
    params = [task.title, task.desc, task.image]
  } else {
    sql = "UPDATE tasks set title = ?, desc = ?, image = ?, status = ?, updated_at = (datetime('now', 'localtime'))"
    sql += '\nWHERE _id = ?'
    params = [task.title, task.desc, task.image, task.status, task._id]
  }

  db.transaction(async (tx: Transaction) => {
    tx.executeSql(sql, params, (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task saved or updated successfully')
      } else {
        console.log('Failed to save or update task')
      }
    })
  })
}

export async function deleteTask(taskId: number) {
  let db = await getDBConnection()
  let sql = 'DELETE FROM tasks WHERE _id = ?'
  db.transaction((tx) => {
    tx.executeSql(sql, [taskId], (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task deleted successfully')
      } else {
        console.log('Failed to delete task')
      }
    })
  })
}

export async function getTasksFromDB() {
  let db = await getDBConnection()
  let sql = 'SELECT * FROM tasks'
  let tasks = [] as Task[]
  db.transaction((tx) => {
    tx.executeSql(sql, [], (tx, results) => {
      return results
    })
  })
}
