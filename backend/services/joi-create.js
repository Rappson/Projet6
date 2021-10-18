const Joi = require('joi');

module.exports = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    manufacturer: Joi.string().required(),
    description: Joi.string().required(),
    mainPepper: Joi.string().required(),
    heat: Joi.number().required(),
    likes: Joi.number().default(0),
    dislikes: Joi.number().default(0),
    usersLiked: Joi.array().default([]),
    usersDisiked: Joi.array().default([])
});