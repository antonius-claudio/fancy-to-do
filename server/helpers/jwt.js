const jwt = require('jsonwebtoken'); // pakai jsonwebtoken untuk mengubah payload menjadi random string (token)

const jwtToken = (obj) => {
    return jwt.sign( obj, process.env.secret )
}

module.exports = { jwtToken }