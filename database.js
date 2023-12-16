import { createPool } from 'mysql2'
const pool = createPool({
  host: 'localhost',
  // port: 3308,
  user: 'root',
  password: 'uno',
  database: 'contabilidad'
})

export default pool
