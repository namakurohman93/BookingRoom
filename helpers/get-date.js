function getDate () {
  return new Date().toJSON().split('T')[0]
}


module.exports = getDate
