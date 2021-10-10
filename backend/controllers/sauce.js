const Sauce = require('../models/Sauce');
const fs = require('fs');
const likes = require('../services/like');
const User = require('../models/user');

const JoiCreate = require('../services/joi-create');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    const createValidate = JoiCreate.validate({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLikes: [],
        usersDislikes: []
    });

    const sauce = new Sauce({
        ...createValidate.value,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()

        .then(() => res.status(201).json({ message: 'objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const data = req.body;
    const sauceValidate = JoiCreate.validate({
        ...data,
        _id: req.params.id,
    })
    const sauceObject =
    {
        ...sauceValidate.value,
    }


    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            console.log(sauce);
            const authId = req.body.onlineUser;
            const sauceUserId = sauce.userId;
            console.log(authId);
            User.findOne({_id : req.body.onlineUser})
            .then(user =>{
                console.log(user);
            })
            if (sauceUserId === authId) {
                const img = sauce.imageUrl;

                if (req.file && img != `${req.protocol}://${req.get('host')}/images/${req.file.filename}`) {
                    // si l'image change
                    const filename = sauce.imageUrl.split('/images/')[ 1 ];
                    fs.unlink(`images/${filename}`, () => {
                        Sauce.updateOne({ _id: sauceValidate.value._id },
                            {
                                ...sauceObject,
                                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                                _id: sauceValidate.value._id
                            })
                            .then(() => res.status(200).json({ message: 'Sauce modifiée !!' }))
                            .catch(error => res.status(400).json({ error }));;
                    })
                } else {
                    // si l'image ne change pas
                    Sauce.updateOne({ _id: sauceValidate.value._id }, { ...sauceObject, _id: sauceValidate.value._id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée !!' }))
                        .catch(error => res.status(400).json({ error }));
                }
            } else{
                console.error( `You are not allowed to do this action !!!`);
            }
        })
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[ 1 ];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Produit supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(400).json({ error }));
};

exports.like = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            likes(req, sauce, req.body.like)
            res.status(200).json({ message: 'like posté !' })
        })
        .catch(error => res.status(400).json({ error }));
};