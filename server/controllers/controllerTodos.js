const { Todo } = require('../models');

class controllerTodos {
    static create(req, res){
        let { title, description, status, due_date } = req.body;
        Todo.create({
            title,
            description,
            status,
            due_date
        })
            .then((newTodo) => {
                res.status(201).json({ newTodo });
            }).catch((err) => {
                if (err.errors) {
                    res.status(400).json({ errors: err.errors });
                } else {
                    res.status(500).json(err);
                }          
            });
    }

    static getTodos(req, res){
        Todo.findAll()
            .then((todos) => {
                res.status(200).json({ todos });
            }).catch((err) => {
                res.status(500).json(err);
            });
    }

    static getById(req, res){
        let id = req.params.id;
        Todo.findByPk(id)
            .then((todo) => {
                if (todo === null) {
                    res.status(404).json({ errors: "Not Found!" })
                } else {
                    res.status(200).json({ todo });
                }
            }).catch((err) => {
                res.status(500).json(err);
            });
    }

    static update(req, res){
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
                    res.status(404).json({ errors: "ID is not registered!"});
                }
            }).catch((err) => {
                if (err.errors) {
                    res.status(400).json({ errors: err.errors });
                } else {
                    res.status(500).json(err);
                }
            });
    }

    static delete(req, res){

    }
}

module.exports = controllerTodos;