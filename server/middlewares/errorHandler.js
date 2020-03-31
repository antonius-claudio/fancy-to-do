const errorHandler = function (err, req, res, next) {
    let errors = ['Internal server error'];
    let status = 500;
    if (err.name === 'SequelizeValidationError') {
        errors = [];
        status = 400;
        err.errors.forEach(e => {
            errors.push(e.message);
        });
    }
    console.log(errors)
    if (err.msg) {
        errors = [];
        errors.push(err.msg);
        status = 404;
    }
    res.status(status).json(errors)
}

module.exports = errorHandler;