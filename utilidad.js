// const cookieParser = require('cookie-parser')

// const session = require('express-session')

// app.use(express.urlencoded({ extended: true }))

// app.use(cookieParser('suricata'))

// const sessionMiddleware = session({

//     secret: 'gatocalvo',

//     resave: true,

//     saveUninitialized: true

// });

// app.use(sessionMiddleware);

// app.post('/register', async (req, res) => {

//     const { name, accesscode } = req.body;

//       const newdata = { name, accesscode }

//       const [data] = await pool.promise().query('SELECT * FROM chatters WHERE accesscode = ?', [accesscode])

//    if (data.length > 0) {

//           res.render('register')

//       } else {

//           await pool.promise().query('INSERT INTO chatters SET ?', newdata)

//           res.redirect('/login')

//       }

//   })

// app.post('/login', async (req, res) => {

//     const [data] = await pool.promise().query('SELECT * FROM chatters WHERE accesscode = ?', [accesscode]);

//     if (data.length > 0) {

//     req.session.loggedin = true;

//        res.redirect('/index');

//    });

// app.get('/login', async (req, res) => {

//     if (req.session.loggedin) {

//   res.render('index');

//   }

// res.render('login');

// })

// const express = require('express')

// const http = require('http')

// app.set('view engine', 'ejs');

// si se reinicia el servidor la unica forma de el servidor dar un dato NUEVO al usuario es enviando

// ese dato mediante motores de plantilla por ejemplo ejs o express-handlebars
