const { Todo } = require('../models');

class controllerTodos {
    static create(req, res){
        const { title, description, status, due_date } = req.body;
        Todo.create({
            title,
            description,
            status,
            due_date
        })
            .then((newTodo) => {
                res.status(201).json({newTodo});
            }).catch((err) => {
                if (err.errors) {
                    res.status(400).json({errors: err.errors});
                }                
                res.status(500).json(err);
            });
    }

    static getTodos(req, res){
        Todo.findAll()
            .then((todos) => {
                res.status(200).json({todos});
            }).catch((err) => {
                res.status(500).json(err);
            });
    }
}

module.exports = controllerTodos;