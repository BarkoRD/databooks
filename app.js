/* eslint-disable no-unused-vars */
import express from 'express'
import http from 'http'
import pool from './database.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'

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
app.use(express.json());
// MANEJO DE SOLICITUDES GET

const balance = {
  balance: 1,
  deudatotal: 2,
  ingresospendientes: 3
}

app.get(['/', '/index'], (req, res) => {
  res.redirect('visualizar')
})

app.get('/crearIngresos', async (req, res) => {
  const [etiquetas] = await pool
    .query('SELECT * FROM etiquetas WHERE tipo = "ingreso"')
  res.render('crearIngresos', { etiquetas, error: '' })
})

app.get('/ingresos', async (req, res) => {

  // const [tableitems] = await pool
  //   .query(`SELECT * FROM ingresos
  //           INNER JOIN etiquetas
  //           ON ingresos.etiqueta_id = etiquetas.id`)
  res.render('ingresos', { balance })
}
)

app.get('/gastos', async (req, res) => {

  res.render('gastos', { balance })
})


app.get(/^\/tabla(1|2|3)$/, async (req, res) => {
  if (req.params[0] === '1') {
    const query = `SELECT * FROM ingresos INNER JOIN etiquetas ON ingresos.etiqueta_id = etiquetas.id`
    const [result] = await pool.query(query)
    res.json(result);
  } else if (req.params[0] === '2') {
    const query = `SELECT * FROM gastos INNER JOIN medios_de_pago ON gastos.medio_id = medios_de_pago.id INNER JOIN etiquetas ON gastos.etiqueta_id = etiquetas.id`
    const [result] = await pool.query(query)
    res.json(result);
  } else if (req.params[0] === '3') {
    const query = `SELECT * FROM propias INNER JOIN etiquetas ON propias.etiqueta_id = etiquetas.id INNER JOIN recurrencia ON propias.recurrencia_id = recurrencia.id` 
    const [result] = await pool.query(query)
    res.json(result);
  }
});

app.get('/propios', async (req, res) => {

  const [tableitems] = await pool
    .query(`SELECT * FROM propias
            INNER JOIN etiquetas
            ON propias.etiqueta_id = etiquetas.id`)
  res.render('propios', { tableitems, balance })
}
)

app.get('/externos', async (req, res) => {

  const [tableitems] = await pool
    .query(`SELECT * FROM ingresos
            INNER JOIN etiquetas
            ON ingresos.etiqueta_id = etiquetas.id`)
  res.render('ingresos', { tableitems, balance })
}
)





app.get('/notificaciones', async (req, res) => {
  const notificaciones = [{ 'hola': 'hola' }]
  res.render('notificaciones', { notificaciones, balance })
})

app.get('/crearGastos', async (req, res) => {
  const [etiquetas] = await pool.query('SELECT * FROM etiquetas WHERE tipo = "gasto"')
  const [medios_de_pago] = await pool
    .query('SELECT * FROM medios_de_pago')
  res.render('crearGastos', { etiquetas, medios_de_pago, error: '' })

})

app.get('/creardeuda', async (req, res) => {
  const [etiquetas] = await pool.query('SELECT * FROM etiquetas WHERE tipo = "deuda"')
  const [medios_de_pago] = await pool.query('SELECT * FROM medios_de_pago')
  res.render('creadeuda', { etiquetas, medios_de_pago, error: '' })

})

app.post('/creardeuda', async (req, res) => {
  const data = req.body
  data.fecha ? '' : delete data.fecha
  await pool.query(`INSERT INTO propias SET ?`, data)
  res.redirect(`propios`)
})




app.post('/nuevaetiqueta', async (req, res) => {
  const etiqueta = req.body
  try {
    await pool.query(`INSERT INTO etiquetas SET ?`, etiqueta)
  } catch (error) {
    res.json({ error: 'La etiqueta ya existe' })

  }

})


app.get('/crearFactura', async (req, res) => {
  const [clientes] = await pool.query('SELECT * FROM clientes')
  res.render('crearFactura', { clientes })
})

app.get('/visualizar', async (req, res) => {
  // const balance = {
  //   balance: 1,
  //   deudatotal: 2, 
  //   ingresospendientes: 3
  // }

  const [[{ balancetotal1 }]] = await pool.query('SELECT SUM(credito) AS balancetotal1 FROM ingresos')
  const [[{ balancetotal2 }]] = await pool.query('SELECT SUM(debito) AS balancetotal2 FROM gastos')
  balance.balance = balancetotal1 - balancetotal2;

  res.render('visualizar', { balance })
})

app.post('/crearGastos', async (req, res) => {
  const data = req.body
  if (data.fecha === '') {
    delete data.fecha
  }
  delete data.action
  await pool.query('INSERT INTO gastos SET ?', data)
  res.redirect('gastos')
})

app.post('/crearingresos', async (req, res) => {
  const data = req.body
  if (data.fecha === '') {
    delete data.fecha

  }
  delete data.action
  await pool.query('INSERT INTO ingresos SET ?', data)
  if(req.body.action === 'Guardar y continuar') {
    res.redirect(`crearingresos`);
  } else {
    res.redirect(`ingresos`);
  }
})


server.listen(process.env.PORT || 3000, () => {
  console.log('dale ahi manito --> http://localhost:3000')
})

