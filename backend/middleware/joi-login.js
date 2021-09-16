const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string()
        .email()
        .pattern(new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$'))
        .required(),

    password: Joi.string()
    /* 
    6 caractère minimum - 16 maximum
    une majuscule    <-
    des minuscule    <-   AU MOINS 1 DANS LA CHAINE
    des chiffres     <-
     */
        .pattern(new RegExp('^( ?=.* [ 0 - 9 ] ) ( ?=.* [ a - z ] ) ( ?=.* [ A - Z ] ) . {6, 16} $'))
        .required()
});

