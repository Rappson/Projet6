module.exports = (req, sauce, like) => {
    // position de l'userID dans les tableaux 
    let positionOnLike = sauce.usersLiked.indexOf(req.body.userId);
    let positionOnDisLike = sauce.usersDisliked.indexOf(req.body.userId);


    // suppression de l'userID dans les tableaux
    if (like === 1 || like === -1 || like === 0) {
        if (positionOnLike != -1) {
            sauce.usersLiked.splice(positionOnLike, 1);
        } else if (positionOnDisLike != -1) {
            sauce.usersDisliked.splice(positionOnDisLike, 1);
        }
    }

    // si l'user aime la sauce
    if (like === 1) {
        sauce.usersLiked.push(req.body.userId)
        console.log("like accepté !");
    }
    // si l'user n'aime pas la sauce
    else if (like === -1) {
        sauce.usersDisliked.push(req.body.userId)
        console.log("dislike accepté !");
    }

    // mis à jour du nombre de likes et de dislikes
    sauce.likes = sauce.usersLiked.length
    sauce.dislikes = sauce.usersDisliked.length

    sauce.save()
};
