const dotenv = require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../models/user');
const joiLog = require('../services/joi-login');


exports.signup = (req, res, next) => {
    const logValidate = joiLog.validate({ mail: req.body.email, password: req.body.password })
    let validMail = logValidate.value.mail;
    let validPassword = logValidate.value.password;

    bcrypt.hash(validPassword, 10)
        .then(hash => {
            const user = new User({
                email: validMail,
                password: hash
            });
            if (logValidate.error === undefined) {
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(401).json({ message: logValidate.error.details[ 0 ].message })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },

                            `${process.env.TOKEN_SECRET}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};