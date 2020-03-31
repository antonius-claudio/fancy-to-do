const { User } = require('../models');
const jwt = require('jsonwebtoken'); // pakai jsonwebtoken untuk mengubah payload menjadi random string (token)
const { checkPassword } = require('../helpers/bcrypt');

class controllerUser {
    static register(req, res, next){
        let form = { email: req.body.email, password: req.body.password };
        User.create(form)
            .then((result) => {
                let token = jwt.sign({
                    UserId : result.id,
                    email: result.email
                }, process.env.secret );
                res.status(201).json({ token });
            })
            .catch(next);
    }

    static login(req, res, next){
        let form = { email: req.body.email, password: req.body.password };
        User.findOne({ where: { email: form.email } })
            .then((result) => {
                if (result) {
                    const isPasswordValid = checkPassword(form.password, result.password);
                    if (isPasswordValid) {
                        let token = jwt.sign({
                            UserId : result.id,
                            email: result.email
                        }, process.env.secret );
                        res.status(200).json({ token });
                    } else {
                        throw { msg: "Wrong Password!", status: 401 }
                    }
                } else {
                    throw { msg : "Email Not Found!" };
                }
            })
            .catch(next);
    }
}

module.exports = controllerUser;