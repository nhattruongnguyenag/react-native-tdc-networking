import { Task } from 'react-native'
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'

export const TASK_TABLE_NAME = 'tasks'

enablePromise(true)

initDB()

/**
 * Initializes the SQLite database by establishing a connection and creating necessary tables.
 *
 * This asynchronous function initializes the SQLite database by first establishing a connection using
 * the getDBConnection() function. It then proceeds to create a table for tasks using the createTable()
 * function with the provided TASK_TABLE_NAME and TASK_TABLE_COLUMNS.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the database initialization is completed.
 * @throws {Error} Throws an error if there's an issue with database connection or table creation.
 */
export async function initDB() {
  try {
    const db = await getDBConnection()

    // Create task's table
    const columns = {
      _id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
      title: 'TEXT',
      desc: 'TEXT',
      image: 'TEXT',
      status: 'TINYINT DEFAULT 1',
      created_at: "DATETIME DEFAULT (datetime('now','localtime'))",
      updated_at: 'DATETIME'
    }

    await createTable(db, TASK_TABLE_NAME, columns)

    console.log('Created tasks table')
  } catch (error: any) {
    console.error('Error while initializing database: ' + error.message)
  }
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
export const createTable = async (db: SQLiteDatabase, tableName: string, columns: Object) => {
  let sql = createTableStatement(tableName, columns)
  await db.executeSql(sql)
}

function createTableStatement(tableName: string, columns: Object): string {
  let sql = `CREATE TABLE IF NOT EXISTS ${tableName}\n(`

  let index = 0
  for (const [key, value] of Object.entries(columns)) {
    if (index !== 0) {
      sql += ', '
    }

    sql += '\n' + key + ' ' + value
    index++
  }

  sql += ')'

  console.log(sql)
  return sql
}
