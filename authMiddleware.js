const isLogged = (req, res, next) => {
  if (req.session.loggedin) {
    return next()
  }
  res.redirect('/login')
}
export default isLogged
