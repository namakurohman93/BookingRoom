function adminRoleChecker (request, response, next) {
  if (request.session.user) {
    if (request.session.user.role === 'user') next()
    else response.redirect('/login')
  } else {
    response.redirect('/login')
  }
}


module.exports = adminRoleChecker
