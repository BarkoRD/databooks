import { createPool } from 'mysql2'
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'contabilidad'
})

export default pool
