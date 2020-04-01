const { User } = require('../models');
const { checkPassword } = require('../helpers/bcrypt');
const { jwtToken } = require('../helpers/jwt');


class controllerUser {
    static register(req, res, next){
        let form = { email: req.body.email, password: req.body.password };
        User.findOne({ where: { email: form.email } })
            .then((user) => {
                if (user) {
                    throw { msg: "Email already in use!", status: 400 }
                } else {
                    return User.create(form)
                }
            })
            .then((result) => {
                console.log('test', process.env.secret)
                let token = jwtToken({
                        UserId : result.id,
                        email: result.email
                    })
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
                        let token = jwtToken({
                            UserId : result.id,
                            email: result.email
                        })
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