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

// permite usar cookies en tu pagina
// aunque no se estan usando >:(
app.use(cookieParser('elpepe'))

const sessionMiddleware = session({
  secret: 'capwise',
  resave: true,
  saveUninitialized: true
})
app.use(sessionMiddleware)

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

// una sesion es el tiempo de una persona en tu pagina
// persona entra == crea una sesion

// MANEJO DE SOLICITUDES GET
app.get('/', (req, res) => {
  req.session.loggedin ? res.redirect('index') : res.redirect('login')
})

app.get('/index', (req, res) => {
  req.session.loggedin ? res.render('index') : res.redirect('login')
})

let id = 0

app.get('/clientes', async (req, res) => {
  console.log(id)
  const [clientes] = await pool.promise().query('SELECT * FROM clients WHERE user_id = ?', id)
  console.log({ clientes })
  req.session.loggedin ? res.render('clientes', { clientes }) : res.redirect('login')
})

app.get('/crearClientes', (req, res) => {
  req.session.loggedin ? res.render('crearClientes') : res.redirect('login')
})

app.get('/login', (req, res) => {
  req.session.loggedin ? res.redirect('index') : res.render('login', { error: '' })
})

app.get('/register', (req, res) => {
  req.session.loggedin ? res.redirect('index') : res.render('register', { error: '' })
})

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('login')
  })
})

// MANEJO DE SOLICITUDES POST

app.post('/register', async (req, res) => {
  const newData = req.body
  const [data] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [newData.email])
  if (data.length > 0) {
    const error = 'Este correo ya esta registrado'
    res.render('register', { error })
  } else {
    await pool.promise().query('INSERT INTO users SET ?', newData)
    res.redirect('/login')
  }
})

app.post('/login', async (req, res) => {
  const newData = req.body
  const [data] = await pool.promise().query('SELECT * FROM users WHERE email = ? AND user_pass = ?', [newData.email, newData.user_pass])
  if (data.length > 0) {
    req.session.loggedin = true
    req.session.user_id = data[0].user_id
    id = data[0].user_id
    res.redirect('index')
  } else {
    const error = 'Correo o contraseña incorrectos'
    res.render('login', { error })
  }
})

app.post('/crearClientes', async (req, res) => {
  const newData = req.body
  newData.user_id = id
  const [data] = await pool.promise().query('SELECT * FROM clients WHERE client_rnc = ? OR client_email = ?', [newData.rnc, newData.correo])
  console.log(data)
  if (data.length > 0) {
    console.log('ya existe')
    res.render('crearClientes')
  } else {
    const pepe = await pool.promise().query('INSERT INTO clients SET ?', newData)
    res.redirect('clientes')
  }
})

server.listen(process.env.PORT || 3000, () => {
  console.log('dale ahi manito --> http://localhost:3000')
})
