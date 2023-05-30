import mysql from 'mysql'

const database = mysql.createPool({
  host: 'localhost',
  port:3306,
  user: 'root',
  password: 'admin123',
  database: 'nodejs',
})

process.on('exit', async () => {
  try {
    database.end()
  } catch (error) {
    console.error(error)
  }
})

export default database
