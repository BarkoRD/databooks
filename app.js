/* eslint-disable no-unused-vars */
import express from 'express'
import http from 'http'
import pool from './database.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import isLogged from './authMiddleware.js'

const app = express()
const server = http.createServer(app)
const sessionMiddleware = session({
  secret: 'capwise',
  resave: true,
  saveUninitialized: true
})

app.set('view engine', 'ejs')
app.use(cookieParser('elpepe'))
app.use(sessionMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// MANEJO DE SOLICITUDES GET

// regex para index, crearClientes y crearProveedores
app.get('/index', (req, res) => {
  res.redirect('clientes')
})

app.get(/^\/(crearClientes|crearProveedores)?$/, (req, res) => {
  res.render(req.url.slice(1))
})

app.get('/crearProductos', async (req, res) => {
  const id = 1
  const suppliers = await pool
    .promise()
    .query('SELECT * FROM proveedores where user_id = ?', id)
  res.render('crearProductos', { suppliers: suppliers[0], error: '' })
})

// Clientes, Proveedores GET
// /(\/clientes|\/proveedores|\/productos)$/
app.get(/^(\/clientes|\/proveedores|\/ingresos|\/productos)$/, async (req, res) => {
    const select = req.url.slice(1)
    const id = 1
    const [tableitems] = await pool
      .promise()
      .query(`SELECT * FROM ${select} WHERE user_id = ?`, id)
    res.render(`${select}`, { tableitems })
  }
)

// GET LOGIN

// app.get(['/login', '/register'], (req, res) => {
//   req.session.loggedin
//     ? res.redirect('clientes')
//     : res.render(req.url.slice(1), { error: '' })
// })

app.get('/logout', (req, res) => {

    res.redirect('index')
  
})

// // MANEJO DE SOLICITUDES POST

// app.post('/register', async (req, res) => {
//   const newData = req.body
//   const [data] = await pool
//     .promise()
//     .query('SELECT * FROM usuarios WHERE email = ?', [newData.email])
//   if (data.length > 0) {
//     const error = 'Este correo ya esta registrado'
//     res.render('register', { error })
//   } else {
//     await pool.promise().query('INSERT INTO usuarios SET ?', newData)
//     res.redirect('/login')
//   }
// })

// app.post('/login', async (req, res) => {
//   const newData = req.body
//   const [data] = await pool
//     .promise()
//     .query('SELECT * FROM usuarios WHERE email = ? AND user_pass = ?', [
//       newData.email,
//       newData.user_pass
//     ])
//   if (data.length > 0) {
//     req.session.loggedin = true
//     req.session.user_id = 1
//     res.redirect('clientes')
//   } else {
//     const error = 'Correo o contraseña incorrectos'
//     res.render('login', { error })
//   }
// })

// POST clientes y proveedores 


// /^\/(crearClientes|crearProveedores)/
app.post(/^\/(crearClientes|crearProveedores)/, async (req, res) => {
  const action = req.body.action
  const newData = req.body
  delete newData.action
  const id = 1
  newData.user_id = id
  const select = req.url.replace('/crear', '').toLocaleLowerCase()
  const [data] = await pool
    .promise()
    .query(`SELECT * FROM ${select} WHERE rnc = ? OR email = ?`, [
      newData.rnc,
      newData.email
    ])
  if (data.length > 0) {
    res.render(req.url.slice(1))
  } else {
    await pool.promise().query(`INSERT INTO ${select} SET ?`, newData)
    res.redirect(`${select}`)
  }
})

// POST PRODUCTOS

app.post('/crearProductos', async (req, res) => {
  const action = req.body.action
  const newData = req.body
  delete newData.action
  const id = 1

  newData.user_id = id

  const [data] = await pool
    .promise()
    .query(
      'SELECT * FROM productos WHERE supplier_rnc = ? AND product_name = ?',
      [newData.supplier_rnc, newData.product_name]
    )

  if (data.length > 0) {
    const suppliers = await pool
      .promise()
      .query('SELECT * FROM proveedores where user_id = ?', id)
    res.render(req.url.slice(1), { suppliers: suppliers[0], error: 'Este producto ya existe' })
  } else {
    await pool.promise().query('INSERT INTO productos SET ?', newData)
    action === 'Agregar'
      ? res.redirect('productos')
      : res.redirect('crearProductos')
  }
})

app.get('/libro-diario', async (req, res) => {
  const id = 1
  const [tableitems] = await pool
    .promise()
    .query('SELECT * FROM facturas WHERE user_id = ?', id)
  res.render('libro-diario', { tableitems })
})
//brega ahi don no peta solo es al dar click si tu das click tm

app.get('/crearFactura', async (req, res) => {
  const id = 1
  const [clientes] = await pool
    .promise()
    .query('SELECT * FROM clientes WHERE user_id = ?', id)
  res.render('crearFactura', { clientes })
})

app.post('/crearFactura', async (req, res) => {
  const newData = req.body
  const id = 1
  newData.user_id = id
  delete newData.action
  if (newData.fecha === '') delete newData.fecha
  await pool.promise().query('INSERT INTO facturas SET ?', newData)
  res.redirect('libro-diario')
})

server.listen(process.env.PORT || 3000, () => {
  console.log('dale ahi manito --> http://localhost:3000')
})
