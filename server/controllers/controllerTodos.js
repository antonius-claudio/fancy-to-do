const { Todo } = require('../models');

class controllerTodos {
    static create(req, res, next){
        console.log(req.body)
        let form = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.UserId
        }
        Todo.create(form)
            .then((newTodo) => {
                res.status(201).json({ newTodo });
            })
            // .catch((err) => {
            //     if (err.errors) {
            //         res.status(400).json({ errors: err.errors , message: "Invalid user input, error while writing to database!" });
            //     } else {
            //         res.status(500).json({ errors: err , message: "Error while writing to database!" });
            //     }          
            // });
            .catch(next)
            
    }

    static getTodos(req, res, next){
        Todo.findAll({ where: { UserId: req.UserId } })
            .then((todos) => {
                res.status(200).json({ todos });
            })
            .catch(next)
            // .catch((err) => {
            //     res.status(500).json({ errors: err , message: "Error while reading to database!" });
            // });
    }

    static getById(req, res, next){
        let id = req.params.id;
        Todo.findByPk(id)
            .then((todo) => {
                if (todo === null) {
                    throw { msg : 'Not Found !'}
                    // res.status(404).json({ errors: "Not Found!" })
                } else {
                    res.status(200).json({ todo });
                }
            })
            .catch(next)
            // .catch((err) => {
            //     res.send(err.message)
            //     next(err)
            // })
            // .catch((err) => {
            //     res.status(500).json({ errors: err , message: "Error while reading to database!" });
            // });
    }

    static update(req, res, next){
        let { title, description, status, due_date } = req.body;
        let id = req.params.id;
        Todo.update({
            title,
            description,
            status,
            due_date
        }, { where: { id } })
            .then((updateTodo) => {
                if (updateTodo[0] === 1) {
                    res.status(200).json({ updateTodo: { title, description, status, due_date } });
                } else {
                    throw { msg: "ID is not registered!"}
                    // res.status(404).json({ errors: "ID is not registered!"});
                }
            })
            .catch(next)
            // .catch((err) => {
            //     if (err.errors) {
            //         res.status(400).json({ errors: err.errors });
            //     } else {
            //         res.status(500).json({ errors: err , message: "Error while update to database!" });
            //     }
            // });
    }

    static delete(req, res, next){
        let id = req.params.id;
        let deletedTodo = null;
        Todo.findByPk(id)
            .then((deleted) => {
                if (deleted === null) {
                    throw { msg: "Not Found!" }
                    // res.status(404).json({ errors: "Not Found!" })
                } else {
                    deletedTodo = deleted;
                    return Todo.destroy({ where: { id } });
                }
            })
            .then((result) => {
                if (result === 1) {
                    res.status(200).json({ deletedTodo });
                }
            })
            .catch(next)
            // .catch((err) => {
            //     res.status(500).json({ errors: err , message: "Error while delete at database!" });
            // });
    }
}

module.exports = controllerTodos;