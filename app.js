/* eslint-disable no-unused-vars */
import express from 'express'
import http from 'http'
import pool from './database.js'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const server = http.createServer(app)

app.set('view engine', 'ejs')
app.use(cookieParser('elpepe'))

const sessionMiddleware = session({
  secret: 'capwise',
  resave: true,
  saveUninitialized: true
})
app.use(sessionMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// MANEJO DE SOLICITUDES GET

// /^\/(index|crearClientes|crearProveedores)$/  -->  regex para index, crearClientes y crearProveedores
app.get(['/', '/index', '/crearClientes', '/crearProveedores'], (req, res) => {
  req.session.loggedin ? res.render(req.url.slice(1)) : res.redirect('login')
})

// Clientes, Proveedores GET

app.get(['/clientes', '/proveedores'], async (req, res) => {
  const select = req.url === '/clientes' ? 'clientes' : 'proveedores'
  const id = req.session.user_id
  const [tableitems] = await pool.promise().query(`SELECT * FROM ${select} WHERE user_id = ?`, id)
  req.session.loggedin ? res.render(`${select}`, { tableitems }) : res.redirect('login')
  console.log(tableitems)
})

app.get(['/login', '/register'], (req, res) => {
  req.session.loggedin ? res.redirect('index') : res.render(req.url.slice(1), { error: '' })
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('login')
  })
})

// MANEJO DE SOLICITUDES POST

app.post('/register', async (req, res) => {
  const newData = req.body
  const [data] = await pool.promise().query('SELECT * FROM usuarios WHERE email = ?', [newData.email])
  if (data.length > 0) {
    const error = 'Este correo ya esta registrado'
    res.render('register', { error })
  } else {
    await pool.promise().query('INSERT INTO usuarios SET ?', newData)
    res.redirect('/login')
  }
})

app.post('/login', async (req, res) => {
  const newData = req.body
  const [data] = await pool.promise().query('SELECT * FROM usuarios WHERE email = ? AND user_pass = ?', [newData.email, newData.user_pass])
  if (data.length > 0) {
    req.session.loggedin = true
    req.session.user_id = data[0].user_id
    res.redirect('index')
  } else {
    const error = 'Correo o contraseña incorrectos'
    res.render('login', { error })
  }
})

app.post(['/crearClientes', '/crearProveedores'], async (req, res) => {
  const newData = req.body
  const id = req.session.user_id
  newData.user_id = id
  const select = req.url === '/crearClientes' ? 'clientes' : 'proveedores'
  const [data] = await pool.promise().query(`SELECT * FROM ${select} WHERE rnc = ? OR email = ?`, [newData.rnc, newData.email])
  if (data.length > 0) {
    res.render(req.url.slice(1))
  } else {
    await pool.promise().query(`INSERT INTO ${select} SET ?`, newData)
    res.redirect(`${select}`)
  }
})

server.listen(process.env.PORT || 3000, () => {
  console.log('dale ahi manito --> http://localhost:3000')
})
