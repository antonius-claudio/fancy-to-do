const { Todo } = require('../models');
const authorization = function(req, res, next){
    Todo.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                if (result.UserId === req.UserId) {
                    next();
                } else {
                    throw { msg: "Not Authorized", status: 401 };
                }
            } else {
                throw { msg: "Not Found", status: 404 };
            }
        })
        .catch(next);
}

module.exports = authorization;