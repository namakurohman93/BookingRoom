const bcrypt = require('bcrypt')


function passwordChecker (password, hash) {
  return bcrypt.compareSync(password, hash)
}


module.exports = passwordChecker
