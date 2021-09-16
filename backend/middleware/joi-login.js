const Joi = require('joi');

module.exports = Joi.object({
    mail: Joi.string()
        // .pattern(new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$'))
        .email()
        .pattern(/[^+-<>{}()]/)
        .required(),

    password: Joi.string()
        /* 
        6 caractère minimum - 16 maximum
        une majuscule    <-
        des minuscule    <-   AU MOINS 1 DANS LA CHAINE
        des chiffres     <-

        .pattern(new RegExp('^( ?=.* [ 0 - 9 ] ) ( ?=.* [ a - z ] ) ( ?=.* [ A - Z ] ) . {6, 16} $'))
         */
        .min(6).max(16)
        .pattern(/(?=.*[A-Z])(?=.*[0-9])/)
        .required()
});