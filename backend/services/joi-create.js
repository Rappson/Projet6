const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().alphanum().required(),
    manufacturer: Joi.string().alphanum().required(),
    description: Joi.string().required(),
    mainPepper: Joi.string().alphanum().required(),
    heat: Joi.number().required(),
    likes: Joi.number().required().default(0),
    dislikes: Joi.number().required().default(0),
    usersLiked: Joi.array().required().default([]),
    usersDisiked: Joi.array().required().default([])
});