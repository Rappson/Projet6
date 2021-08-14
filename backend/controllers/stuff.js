const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject._id);
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
    } : {...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !!' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (res, req, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Produit supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};