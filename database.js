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


// const {createPool} = require('mysql2/promise');

// const pool = createPool({
//     host: 'localhost',
//     user: 'daranhu1_mother',
//     password: '8496509366Aa',
//     database: 'daranhu1_app'
// })

// // const pool = createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     password: 'password',
// //     database: 'users'
// // })


// module.exports = pool