import { ResultSet, ResultSetRowList, Transaction } from 'react-native-sqlite-storage'
import { Task } from '../types/Task'
import { getDBConnection } from './core.sqlite'
import { useDispatch } from 'react-redux'
import { setTasksAction } from '../redux/task.reducer'

export type TaskSave = Omit<Task, '_id' | 'createAt' | 'updatedAt' | 'isDone' | 'active'>
export type TaskUpdate = Omit<Task, 'createAt' | 'updatedAt' | 'isDone' | 'active'>

export async function saveTask(task: TaskSave, response: (taskId: number) => void) {
  const db = await getDBConnection()

  let sql = 'INSERT INTO tasks (title, desc, image, color)'
  sql += '\nVALUES(?, ?, ?, ?)'

  const params = [task.title, task.desc, task.image, task.color]

  db.transaction(async (tx: Transaction) => {
    tx.executeSql(sql, params, (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task saved to database successfully')
        response(results.insertId)
      } else {
        console.log('Failed to save task')
      }
    })
  })
}

export async function updateTask(task: TaskUpdate) {
  const db = await getDBConnection()

  let sql = "UPDATE tasks set title = ?, desc = ?, image = ?, color = ?, updated_at = (datetime('now', 'localtime'))"
  sql += '\nWHERE _id = ?'

  const params = [task.title, task.desc, task.image, task.color, task._id]

  db.transaction(async (tx: Transaction) => {
    tx.executeSql(sql, params, (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task updated successfully')
      } else {
        console.log('Failed to update task')
      }
    })
  })
}

export async function setTaskStatus(taskId: number, status: number) {
  const db = await getDBConnection()

  let sql = "UPDATE tasks set status = ?, updated_at = (datetime('now', 'localtime'))"
  sql += '\nWHERE _id = ?'

  const params = [status, taskId]

  db.transaction(async (tx: Transaction) => {
    tx.executeSql(sql, params, (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task status updated successfully')
      } else {
        console.log('Failed to update task status')
      }
    })
  })
}

export async function setTaskActive(taskId: number, active: number) {
  const db = await getDBConnection()

  let sql = "UPDATE tasks SET active = ?, updated_at = (datetime('now', 'localtime'))"
  sql += '\nWHERE _id = ?'

  const params = [active, taskId]

  db.transaction(async (tx: Transaction) => {
    tx.executeSql(sql, params, (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task status updated successfully')
      } else {
        console.log('Failed to update task status')
      }
    })
  })
}

export async function moveTaskToTrash(taskId: number) {
  setTaskActive(taskId, 0)
  const db = await getDBConnection()
  let sql = 'INSERT INTO tasks_trashs (task_id)'
  sql += '\nVALUES(?)'

  const params = [taskId]

  db.transaction(async (tx: Transaction) => {
    tx.executeSql(sql, params, (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task moved to trash successfully')
      } else {
        console.log('Failed to move task to trash')
      }
    })
  })
}

export async function restoreTaskFromTrash(taskId: number) {
  setTaskActive(taskId, 1)
  const db = await getDBConnection()
  const sql = 'DELETE FROM tasks_trashs WHERE task_id = ?'

  const params = [taskId]

  db.transaction(async (tx: Transaction) => {
    tx.executeSql(sql, params, (tx, results) => {
      if (results.rowsAffected > 0) {
        console.log('Task restored successfully')
      } else {
        console.log('Failed to restore task from trash')
      }
    })
  })
}

export async function deleteTask(taskId: number) {
  const db = await getDBConnection()
  const sql = 'DELETE FROM tasks WHERE _id = ?'
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

export async function getTasksFromDB(response: (data: Task[]) => void) {
  const db = await getDBConnection()
  const sql = 'SELECT * FROM tasks'
  const tasks = [] as Task[]
  db.transaction((tx) => {
    tx.executeSql(sql, [], (tx, results) => {
      response(getTasksFromResultSet(results))
    })
  })
}

export async function getTaskById(taskId: number, response: (data: Task) => void) {
  const db = await getDBConnection()
  const sql = 'SELECT * FROM tasks WHERE _id = ?'
  db.transaction((tx) => {
    tx.executeSql(sql, [taskId], (tx, results) => {
      response(getTasksFromResultSet(results)[0])
    })
  })
}

export function getTasksFromResultSet(results: ResultSet): Task[] {
  const tasks = [] as Task[]
  const length = results.rows.length
  const resultSet: ResultSetRowList = results.rows
  for (let i = 0; i < length; i++) {
    let task: Task = {
      _id: resultSet.item(i)._id,
      title: resultSet.item(i).title,
      desc: resultSet.item(i).desc,
      color: resultSet.item(i).color,
      image: resultSet.item(i).image,
      active: resultSet.item(i).active,
      isDone: resultSet.item(i).status,
      createAt: new Date(resultSet.item(i).created_at).getTime(),
      updatedAt: new Date(resultSet.item(i).updated_at).getTime()
    }

    tasks.push(task)
  }
  return tasks
}

export async function searchTaskByTitleOrContent(key: string, response: (result: Task[]) => void) {
  const db = await getDBConnection()
  key = '%' + key + '%'
  const sql = `SELECT * FROM tasks WHERE title LIKE '${key}' OR desc LIKE '${key}'`
  console.log(sql)
  db.transaction((tx) => {
    tx.executeSql(sql, [], (tx, results) => {
      response(getTasksFromResultSet(results))
    })
  })
}
