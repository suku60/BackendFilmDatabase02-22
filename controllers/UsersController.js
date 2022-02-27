const { User } = require('../models/index');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const UsersController = {};

// Controller functions

// (Read) Find users

UsersController.showAllUsers = (req, res) => {

    User.findAll()
    .then(data => {

        res.send(data)
    });
};

// - Filtered by id / email

// Id

UsersController.showAllUsersById = (req, res) => {

    User.findByPk(req.params.id)
    .then(data => {
        res.send(data)
    });
};

// Email

UsersController.showAllUsersByEmail = (req, res) => {
    Usuario.findOne({ where : { email : req.params.email }})
    .then(data => {
        res.send(data)
    });
};


// (Create) user / Register

UsersController.createUser = (req, res) => {
    
        let name = req.body.name;
        let birthdate = req.body.birthdate;
        let username = req.body.username;
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)); 
        let email = req.body.email;

        User.findAll({
            where : {

                [Op.or] : [
                    {
                        email : {
                            [Op.like] : email
                        }
                    },
                    {
                        username : {
                            [Op.like] : username
                        }
                    }
                ]

            }

        }).then(repeatedData => {

            if(repeatedData == 0){

                    User.create({
                    name: name,
                    birthdate: birthdate,
                    username: username,
                    password: password,
                    email: email
                }).then(user => {
                    res.send(`welcome ${user.username}`);
                })
                .catch((error) => {
                    res.send(error);
                });

            }else {
                res.send("This user already exists in our database");
            }
        }).catch(error => {
            res.send(error)
        });

    
    
};

// (Update) Modify user data

UsersController.updateUser = async (req, res) => {

    let data = req.body;

    let id = req.params.id;

    try {

        User.update(data, {
            where: {id : id}
        })
        .then(updated => {
            res.send(updated);
        });

    } catch (error) {
        res.send(error);
    }

};

UsersController.levelUpUser = (req, res) => {};

// (Delete) users

// - All

UsersController.deleteAll = async (req, res) => {

    try {

        User.destroy({
            where : {},
            truncate : false
        })
        .then(deletedUser => {
            res.send(`${deletedUser} have been deleted`);
        })

    } catch (error) {
        res.send(error);
    }

};

// - Filtered by Id

UsersController.deleteById = (req, res) => {};

