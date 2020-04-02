const { User } = require('../models');
const { jwtToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.client_id);


class controllerGoogle {
    static googleSignIn(req, res, next){
        let token = req.body.token;
        let newUser = {};
        client.verifyIdToken({
            idToken: token,
            audience: process.env.client_id
        })
        .then((data) => {
            let payload = data.getPayload();
            newUser.email = payload.email;
            console.log('a')
            return User.findOne({
                where : {
                    email: payload.email
                }
            })
        })
        .then((result) => {
            if (result) {
                let tokenToUser = jwtToken({
                    UserId : result.id,
                    email: result.email
                })
                console.log('b')

                res.status(200).json({ token: tokenToUser });
            } else {
                console.log('c')

                newUser.password = '1234';
                return User.create(newUser)
            }
        })
        .then((newU) => {
            let tokenToUser = jwtToken({
                UserId : newU.id,
                email: newU.email
            })
            console.log('d')
            res.status(201).json({ token: tokenToUser });
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
        // .catch(next)
    }
}

module.exports = controllerGoogle;