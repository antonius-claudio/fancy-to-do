const jwt = require('jsonwebtoken');

const authentication = function (req, res, next) {
    const token = req.headers.token;

    if (!token) {
        throw { msg: "Token Not Found!", status: 404 };
    } else {
        let decoded = jwt.verify(token, process.env.secret);
        req.UserId = decoded.UserId;
        next();
    }
}

module.exports = authentication;