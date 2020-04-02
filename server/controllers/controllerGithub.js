const axios = require('axios');

class controllerGitHub {
    static githubSignIn(req, res, next){
        let code = req.query.code;
        axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.client_id_github,
            client_secret: process.env.client_secret_github,
            code
        })
        .then((result) => {
            console.log(result.data)
        })
        .catch(next)
    }
}

module.exports = controllerGitHub;