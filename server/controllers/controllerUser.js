const { User } = require('../models');
const jwt = require('jsonwebtoken'); // pakai jsonwebtoken untuk mengubah payload menjadi random string (token)

class controllerUser {
    static register(req, res, next){
        let { email, password } = req.body;
        User.create({ email, password })
            .then((result) => {
                let token = jwt.sign({
                    UserId : result.id,
                    email: result.email
                }, process.env.secret );
                res.status(201).json({token});
            })
            .catch(next);
    }

    static login(req, res, next){
        a
    }
}

module.exports = controllerUser;