const Sauce = require('../models/Sauce');
const fs = require('fs');
const likes = require('../services/like');
const User = require('../models/user');

const validationJoi = require('../services/joi-create');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);

    const createValidate = validationJoi.validate({
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
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            let payload = req.body;

            if (req.file) {
                payload = JSON.parse(req.body.sauce)
            }

            const { error, value } = validationJoi.validate(payload);
            value.id = sauce._id;
            if (error) {
                res.status(400).json({ error })
                console.log(error);
                return
            }
            /* 
            CE QUI BLOQUE: 
            value
            comparer les ancien commits et les cours
            */

            console.log(value);
            console.log(req.file);
            let sauceObject = {};
            if (req.file) {
                const filename = sauce.imageUrl.split('/images/')[ 1 ];
                fs.unlink(`images/${filename}`, () => {
                    sauceObject = {
                        ...value,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                })
            } else {
                sauceObject = {
                    ...value
                }
            }
            sauce.updateOne({ _id: value.id }, { ...sauceObject, _id: value.id })
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