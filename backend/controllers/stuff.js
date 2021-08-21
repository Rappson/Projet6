const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // je supprime l'id qui sera fourni plus tard
    delete sauceObject._id;
    // je recupere mon schema et je fait une nouvelle sauce
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // je l'enregistre dans la base de donnée
    sauce.save()
        // j'implémente les resultats de reussite ou d'echec
        .then(() => res.status(201).json({ message: 'objet enregistré !' }))
        .catch(error => res.status(400).json({ message: "Oops !!" + error }));
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
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !!' }))
        .catch(error => res.status(400).json({ error }));
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
    // Si j'aime = 1, l'utilisateur aime la sauce. 
    // Si j'aime = 0, l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas.
    // Si j'aime = -1, l'utilisateur n'aime pas la sauce.

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // userId et résultat du like
            console.log(req.body);
            let tabLikes = sauce.usersLiked;
            let tabDislikes = sauce.usersDisliked;
           
            function gestionLikes() {
                /*si l'user aime la sauce:
                je verifie dans les tableaux qu'il n'est pas présent sinon je le supprime des tableaux
                je l'ajoute dans le tableau correspondant
                */
                if (req.body.id === 1) {
                    // position dans le tableau des likes et des dislikes de l'userId
                    let positionOnLike = tabLikes.indexOf(req.body.userId);
                    let positionOnDisLike = tabDislikes.indexOf(req.body.userId);

                    // je supprime l'userId des tableaux
                    if (positionOnLike != -1) {
                        // tabLikes.splice(0, positionOnLike);
                        delete tabLikes[ positionOnLike ]
                    } else if (positionOnDisLike != -1) {
                        // tabDislikes.splice(0, positionOnDisLike);
                        delete tabDislikes[ positionOnDisLike ]
                    }
                    sauce.usersLiked.push(req.body.userId)
                }
                
                sauce.likes = sauce.usersLiked.length;
                sauce.dislikes = sauce.usersDisliked.length;
                // résultat de la requete
                console.log(sauce);
                sauce.save();
            }
            gestionLikes();
            console.log(tabLikes);

        })
        .then(() => res.status(200).json({ message: "like posté" }))
        .catch(error => res.status(400).json({ error }));

};