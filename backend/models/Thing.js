const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manuf: { type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    image: { type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    userLiked: {type: String, required: true},
    userDisliked: {type: String, required: true}
});

module.exports = mongoose.model('Thing', thingSchema);