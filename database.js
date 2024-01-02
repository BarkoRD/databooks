import mysql from 'mysql2/promise'

const defalutConfig = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'dataBook2'
}
const pool = await mysql.createConnection(defalutConfig)

export default pool
