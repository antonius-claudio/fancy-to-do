const { Todo, User } = require('../models');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
    '186716819750-nef5dolq5kql200sa60fia48j5aoi1i8.apps.googleusercontent.com',
    'i-xPSJF97joVbRkEH6peKUNO'
    );

oAuth2Client.setCredentials({
    refresh_token: '1//04GUcuDtuZaFZCgYIARAAGAQSNwF-L9Ir0AK71Wh31kCpKEbxBRurHXcHMVuqI6Om6wE8Ok7TltEUysVKayawPrb6Iumr82Rvd1M'
    // , access_token: 'ya29.a0Adw1xeXqL1MO4KHa7UJjx4Ax_x7H0xH1-bpsvq8ClCy_ElGiAaSZQyBVFdKYB55n79S3RV62Tnpn2ZZs4JRmlmtDOAFtAGti_1jVWM85vKPoUjQTFky4rlo4DzRKbvphTgxnhxL0ZCI6FjSefLDOGdV7WzqQyGfQI3M'
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

class controllerTodos {
    static create(req, res, next){
        console.log(req.body)
        let form = {
            title: req.body.title,
            description: req.body.description,
            status: 'Belum',
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
        Todo.findAll({ where: { UserId: req.UserId, status: 'Belum' } })
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
        // let { title, description, status, due_date } = req.body;
        let id = req.params.id;
        Todo.update({
            status: 'Selesai'
        }, { where: { id } })
            .then((updateTodo) => {
                if (updateTodo[0] === 1) {
                    res.status(200).json({ updateTodo: { id } });
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

    static addEvent(req, res, next){
        // console.log('masuk controller user')
        // console.log(req.params.id)
        // console.log(req.UserId)
        Todo.findOne({where: { id: req.params.id } , include: User})
            .then((todo) => {
                var event = {
                    summary: todo.title,
                    description: todo.description,
                    start: {
                      dateTime: new Date(),
                      timeZone: 'Asia/Jakarta',
                    },
                    end: {
                      dateTime: new Date(todo.due_date),
                      timeZone: 'Asia/Jakarta',
                    },
                    attendees: [
                      { email: todo.User.email }
                    ],
                    reminders: {
                      useDefault: false,
                      overrides: [
                        { method: 'email', 'minutes': 24 * 60}
                      ],
                    },
                    colorId: 1
                  };
                console.log(event);
                calendar.freebusy.query(
                    {
                        resource: {
                            timeMin: new Date(),
                            timeMax: new Date(todo.due_date),
                            timeZone: 'Asia/Jakarta',
                            items: [{ id: 'primary'}]
                        }
                    }, (err, result) => {
                        if (err) {
                            console.log('a')
                            throw { msg: 'Free Busy Query Error', status:500 }
                        }
                        const eventsArr = result.data.calendars.primary.busy;
                        if (eventsArr.length === 0) {
                            return calendar.events.insert(
                                { calendarId: 'primary', resource: event },
                                err => {
                                    console.log('b')
                                    if (err) {
                                        console.log('c')
                                        throw { msg: 'Calendar Event Error', status:500 }
                                    }
                                    console.log('d')
                                    res.status(200).json({message: 'Calendar Create'})
                                }
                            )
                        }
                    }
                )
            })
            .catch(next);
    }
}

module.exports = controllerTodos;