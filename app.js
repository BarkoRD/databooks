import express from "express"
import http from "http"
import pool from "./database.js"
import cookieParser from "cookie-parser"
import session from "express-session"

const app = express()
const server = http.createServer(app)
const sessionMiddleware = session({
  secret: "capwise",
  resave: true,
  saveUninitialized: true,
})

app.set("view engine", "ejs")
app.use(cookieParser("elpepe"))
app.use(sessionMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())

const getBalance = async () => {
  const balance = []
  const [balancetotal1] = await pool.query(
    "SELECT fecha,credito  FROM ingresos"
  )
  const [balancetotal2] = await pool.query("SELECT fecha,debito  FROM gastos")
  const [deudatotal] = await pool.query(
    "SELECT fecha,credito AS deuda FROM propias"
  )
  const [ingresospendientes] = await pool.query(
    "SELECT fecha,credito AS ingresospendientes FROM extenos"
  )

  balance.push(balancetotal1)
  balance.push(balancetotal2)
  balance.push(
    deudatotal.length ? deudatotal : [{ fecha: "no hay deudas", deuda: 0 }]
  )
  balance.push(
    ingresospendientes.length
      ? ingresospendientes
      : [{ fecha: "no hay ingresos pendientes", ingresospendientes: 0 }]
  )
  return balance
}


const lastID = async () => {
  const [[{ lastID }]] = await pool.query(
    "SELECT MAX(id) AS lastID FROM etiquetas"
  )
  return lastID
}
// hacer que getBalance se ejecute en cada solicitud get

// app.use((_, __, next) => {

//   getBalance().then((result) => {
//     balance = result
//     next()
//   })
// })

app.get(/^\/(index)?$/, (_, res) => {
  res.redirect("visualizar")
})

app.get("/crearIngresos", async (_, res) => {
  const [etiquetas] = await pool.query(
    'SELECT * FROM etiquetas WHERE tipo = "ingreso"'
  )
  res.render("crearIngresos", {
    etiquetas,
    error: "",
    lastID: (await lastID()) + 1,
  })
})

app.get("/ingresos", async (_, res) => {
  let balance = await getBalance()
  const query = `SELECT * FROM ingresos INNER JOIN etiquetas ON ingresos.etiqueta_id = etiquetas.id ORDER BY ingresos.id DESC`
  const [result] = await pool.query(query)
  res.render("ingresos", {
    result,
    credito: balance[0],
    debito: balance[1],
    deuda: balance[2],
    ingresospendientes: balance[3],
  })
})

app.get("/gastos", async (_, res) => {
  let balance = await getBalance()

  res.render("gastos", {
    credito: balance[0],
    debito: balance[1],
    deuda: balance[2],
    ingresospendientes: balance[3],
  })
})

app.get(/^\/tabla(1|2|3|4)$/, async (req, res) => {
  if (req.params[0] === "1") {
    const query = `SELECT * FROM ingresos INNER JOIN etiquetas ON ingresos.etiqueta_id = etiquetas.id`
    const [result] = await pool.query(query)
    res.json(result)
  } else if (req.params[0] === "2") {
    const query = `SELECT gastos.*, etiquetas.nombre FROM gastos INNER JOIN etiquetas ON gastos.etiqueta_id = etiquetas.id ORDER BY gastos.id DESC`
    const [result] = await pool.query(query)
    res.json(result)
  } else if (req.params[0] === "3") {
    const query = `SELECT propias.*, etiquetas.nombre FROM propias INNER JOIN etiquetas ON propias.etiqueta_id = etiquetas.id ORDER BY propias.id DESC`
    const [result] = await pool.query(query)
    res.json(result)
  } else if (req.params[0] === "4") {
    const query = `SELECT extenos.*, etiquetas.nombre FROM extenos INNER JOIN etiquetas ON extenos.etiqueta_id = etiquetas.id ORDER BY extenos.id DESC`
    const [result] = await pool.query(query)
    console.log(result)
    res.json(result)
  }
})
app.get("/propios", async (_, res) => {
  let balance = await getBalance()

  const [tableitems] =
    await pool.query(`SELECT propias.*, etiquetas.nombre FROM propias 
  INNER JOIN etiquetas
  ON propias.etiqueta_id = etiquetas.id`)
  console.log(tableitems)
  res.render("propios", {
    tableitems,
    credito: balance[0],
    debito: balance[1],
    deuda: balance[2],
    ingresospendientes: balance[3],
  })
})

app.get("/externos", async (_, res) => {
  let balance = await getBalance()

  const [tableitems] = await pool.query(
    `SELECT * FROM extenos INNER JOIN etiquetas ON extenos.etiqueta_id = etiquetas.id`
  )
  res.render("externos", {
    tableitems,
    credito: balance[0],
    debito: balance[1],
    deuda: balance[2],
    ingresospendientes: balance[3],
  })
})

app.get("/notificaciones", async (_, res) => {
  let balance = await getBalance()

  const notificaciones = [{ hola: "hola" }]
  res.render("notificaciones", {
    notificaciones,
    credito: balance[0],
    debito: balance[1],
    deuda: balance[2],
    ingresospendientes: balance[3],
  })
})

app.get("/crearGastos", async (_, res) => {
  const [etiquetas] = await pool.query(
    'SELECT * FROM etiquetas WHERE tipo = "gasto"'
  )
  res.render("crearGastos", {
    etiquetas,
    error: "",
    lastID: (await lastID()) + 1,
  })
})

app.get("/creardeuda", async (_, res) => {
  const [etiquetas] = await pool.query(
    'SELECT * FROM etiquetas WHERE tipo = "deuda"'
  )
  res.render("creadeuda", {
    etiquetas,
    error: "",
    lastID: (await lastID()) + 1,
  })
})

app.post("/creardeuda", async (req, res) => {
  const data = req.body
  delete data.action
  data.fecha ? "" : delete data.fecha
  await pool.query(`INSERT INTO propias SET ?`, data)
  res.redirect(`propios`)
})

app.get("/creardeudaexterna", async (_, res) => {
  const [etiquetas] = await pool.query(
    'SELECT * FROM etiquetas WHERE tipo = "deuda"'
  )
  res.render("creadeudaexterna", {
    etiquetas,
    error: "",
    lastID: (await lastID()) + 1,
  })
})

app.post("/creardeudaexterna", async (req, res) => {
  const data = req.body
  delete data.action
  data.fecha ? "" : delete data.fecha
  await pool.query(`INSERT INTO extenos SET ?`, data)
  res.redirect(`externos`)
})

app.post("/marcarPagadopropia/:id", async (req, _) => {
  const deudaId = req.params.id
  let result = await pool.query("DELETE FROM propias WHERE id = ?", [deudaId])
  console.log(result)
})

app.post("/marcarPagadoexteno/:id", async (req, _) => {
  const deudaId = req.params.id
  let result = await pool.query("DELETE FROM extenos WHERE id = ?", [deudaId])
  console.log(result)
})

app.post("/nuevaetiqueta", async (req, res) => {
  const etiqueta = req.body
  try {
    await pool.query(`INSERT INTO etiquetas SET ?`, etiqueta)
  } catch (error) {
    res.json({ error: "La etiqueta ya existe" })
  }
})

app.get("/crearFactura", async (req, res) => {
  const [clientes] = await pool.query("SELECT * FROM clientes")
  res.render("crearFactura", { clientes })
})

app.get("/visualizar", async (req, res) => {
  // const [[{ balancetotal1 }]] = await pool.query('SELECT SUM(credito) AS balancetotal1 FROM ingresos')
  // const [[{ balancetotal2 }]] = await pool.query('SELECT SUM(debito) AS balancetotal2 FROM gastos')
  // balance.balance = balancetotal1 - balancetotal2;

  // const [[{ deudatotal }]] = await pool.query('SELECT SUM(credito) AS deudatotal FROM propias')
  // balance.deudatotal = deudatotal ? deudatotal : 0;

  // const [[{ ingresospendientes }]] = await pool.query('SELECT SUM(credito) AS ingresospendientes FROM extenos')
  // balance.ingresospendientes = ingresospendientes ? ingresospendientes : 0;
  // console.log(balance.ingresospendientes)
  let balance = await getBalance()

  res.render("visualizar", {
    credito: balance[0],
    debito: balance[1],
    deuda: balance[2],
    ingresospendientes: balance[3],
  })
})

app.post("/crearGastos", async (req, res) => {
  let etiqueta_id = 1
  const data = req.body
  data.fecha ? "" : delete data.fecha
  delete data.action
  data.etiqueta_id = etiqueta_id
  console.log(data)
  await pool.query("INSERT INTO gastos SET ?", data)
  res.redirect("gastos")
})

app.post("/crearGastosV", async (req, res) => {
  let etiqueta_id = 1;
  const data = req.body;
  data.fecha ? "" : delete data.fecha;
  delete data.action;
  data.etiqueta_id = etiqueta_id;
  console.log(data);

  await pool.query("INSERT INTO gastos SET ?", data);
  res.json({ success: true, mensaje: data.debito });
});

app.post("/crearingresosI", async (req, res) => {
  let etiqueta_id = 1;
  const data = req.body;
  data.fecha ? "" : delete data.fecha;
  delete data.action;
  data.etiqueta_id = etiqueta_id;
  console.log(data);

  await pool.query("INSERT INTO ingresos SET ?", data);
  res.json({ success: true, mensaje: data.credito });
});

app.post("/creardeudaexternad", async (req, res) => {
  let etiqueta_id = 1;
  const data = req.body;
  data.fecha ? "" : delete data.fecha;
  delete data.action;
  data.etiqueta_id = etiqueta_id;
  console.log(data);

  await pool.query("INSERT INTO extenos SET ?", data);
  res.json({ success: true, mensaje: data.credito });
});



app.post("/crearingresos", async (req, res) => {
  const data = req.body
  data.fecha ? "" : delete data.fecha
  delete data.action
  await pool.query("INSERT INTO ingresos SET ?", data)
  if (req.body.action === "Guardar y continuar") {
    res.redirect(`crearingresos`)
  } else {
    res.redirect(`ingresos`)
  }
})

server.listen(process.env.PORT || 3000, () => {
  console.log("dale ahi manito --> http://localhost:3000")
})
