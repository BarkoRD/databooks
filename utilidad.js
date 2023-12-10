// app.get('/', (req, res) => {
//   req.session.loggedin ? res.redirect('index') : res.redirect('login')
// })

// app.get('/login', (req, res) => {
//   req.session.loggedin ? res.redirect('index') : res.render('login', { error: '' })
// })

// app.get('/register', (req, res) => {
//   req.session.loggedin ? res.redirect('index') : res.render('register', { error: '' })
// })

// app.get('/clientes', async (req, res) => {
//   const id = req.session.user_id
//   const [clientes] = await pool.promise().query('SELECT * FROM clientes WHERE user_id = ?', id)
//   req.session.loggedin ? res.render('clientes', { clientes }) : res.redirect('login')
// })

// app.get('/crearClientes', (req, res) => {
//   req.session.loggedin ? res.render('crearClientes') : res.redirect('login')
// })

// app.get('/proveedores', async (req, res) => {
//   const id = req.session.user_id
//   const [proveedores] = await pool.promise().query('SELECT * FROM proveedores WHERE user_id = ?', id)
//   req.session.loggedin ? res.render('proveedores', { proveedores }) : res.redirect('login')
// })

// app.get('/crearProveedores', (req, res) => {
//   req.session.loggedin ? res.render('crearProveedores') : res.redirect('login')
// })

// GET PRODUCTOS

// app.get('/productos', async (req, res) => {
//   const id = req.session.user_id
//   const [tableitems] = await pool.promise().query('SELECT * FROM productos WHERE user_id = ?', id)
//   req.session.loggedin ? res.render('productos', { tableitems }) : res.redirect('login')
// })
