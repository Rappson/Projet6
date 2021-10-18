const Joi = require('joi');

module.exports = Joi.object({
    mail: Joi.string()
        .pattern(/[^+-<>{}()]/)
        .email()
        .required(),

    password: Joi.string()
        .min(6).max(32)
        .pattern(/(?=.*[A-Z])(?=.*[0-9])/)
        .required()
});