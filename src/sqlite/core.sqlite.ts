import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
import { Task } from '../types/Task'

export const TASK_TABLE_NAME = 'tasks'

export const TASK_TRASH_TABLE_NAME = 'tasks_trashs'

enablePromise(true)

export async function initDB() {
  const db = await getDBConnection()

  // Create task's table
  const taskTableColumns = {
    _id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    title: 'TEXT',
    desc: 'TEXT',
    image: 'TEXT',
    color: 'TEXT',
    active: 'TINYINT DEFAULT 1',
    status: 'TINYINT DEFAULT 0',
    created_at: "DATETIME DEFAULT (datetime('now','localtime'))",
    updated_at: "DATETIME DEFAULT (datetime('now','localtime'))"
  }

  await createTable(db, TASK_TABLE_NAME, taskTableColumns)

  console.log('Tasks table created')

  // Create trash's task table
  const trashTaskTableColumns = {
    _id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    task_id: 'INTEGER',
    created_at: "DATETIME DEFAULT (datetime('now','localtime'))"
  }

  const transhTaskTableConstrains = ['FOREIGN KEY(task_id) REFERENCES tasks(_id)']
  await createTable(db, TASK_TRASH_TABLE_NAME, trashTaskTableColumns, transhTaskTableConstrains)

  console.log("Trash's task table created")
}

/**
 * Establishes a connection to the SQLite database for TODO data.
 *
 * This function asynchronously opens a connection to an SQLite database named 'todo-data.db'
 * using the default location.
 *
 * @async
 * @function
 * @returns {Promise<SQLiteObject>} A promise that resolves to the SQLite database object.
 * @throws {Error} Throws an error if there's an issue establishing the database connection.
 */
export async function getDBConnection() {
  return openDatabase({ name: 'todo-data.db', location: 'default' })
}

/**
 * Creates a new table in the provided SQLite database.
 *
 * This function asynchronously executes an SQL statement to create a new table with the specified name
 * and columns in the given SQLite database.
 *
 * @async
 * @function
 * @param {SQLiteDatabase} db - The SQLite database instance where the table will be created.
 * @param {string} tableName - The name of the table to be created.
 * @param {Object} columns - An object defining the columns of the table along with their data types and constraints.
 * @returns {Promise<void>} A promise that resolves when the table is successfully created.
 * @throws {Error} Throws an error if there's an issue executing the SQL statement.
 */
export const createTable = async (db: SQLiteDatabase, tableName: string, columns: Object, constrains?: string[]) => {
  let sql = createTableStatement(tableName, columns, constrains)
  await db.executeSql(sql)
}

function createTableStatement(tableName: string, columns: Object, constrains?: string[]): string {
  let sql = `CREATE TABLE IF NOT EXISTS ${tableName}\n(`

  let index = 0
  for (const [key, value] of Object.entries(columns)) {
    if (index !== 0) {
      sql += ', '
    }

    sql += '\n' + key + ' ' + value
    index++
  }

  if (constrains) {
    sql += ', ' + constrains.join(', ')
  }

  sql += ')'

  console.log(sql)
  return sql
}
