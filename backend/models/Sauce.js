const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manuf: { type: String, required: true},
    description: {type: String, required: false},
    mainPepper: {type: String, required: false},
    image: { type: String, required: false},
    heat: {type: Number, required: false},
    likes: {type: Number, required: false},
    dislikes: {type: Number, required: false},
    userLiked: {type: String, required: false},
    userDisliked: {type: String, required: false}
});

module.exports = mongoose.model('Sauce', sauceSchema);