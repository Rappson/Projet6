const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().alphanum().required(),
    manufacturer: Joi.string().alphanum().required(),
    description: Joi.string().alphanum().required(),
    mainPepper: Joi.string().alphanum().required(),
    imageUrl: Joi.string().required(),
    heat: Joi.number().required(),
    likes: Joi.number().required(),
    dislikes: Joi.number().required(),
    usersLiked: Joi.array().required(),
    usersDisiked: Joi.array().required()
})