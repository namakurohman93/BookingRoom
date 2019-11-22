const bcrypt = require('bcrypt')


function hashPassword (password) {
  const salt = bcrypt.genSaltSync(10)

  return bcrypt.hashSync(password, salt)
}


module.exports = hashPassword
