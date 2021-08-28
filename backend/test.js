if(sauceObject === 1){
    console.log('Je like !');
    sauce.usersLiked = req.body.userId;
    tabliked.push(sauce.usersLiked);
    // et il faut que je supprime l'userId si il est présent dans la zone opposé
            // let test = tabliked.indexOf(req.body.userId)
            // let test2 = tabliked[test]
    console.log(sauce.usersLiked);
}
else if(sauceObject == '-1'){
    console.log('Je dislike !');
    sauce.usersDisliked = req.body.userId;
}
else if(sauceObject === 0){
    console.log('Enfaite non...');
};

function action() {
    action = req.body.like;
    let positionOnLike = sauce.usersLiked.indexOf(req.body.id);
    let positionOnDisLike = sauce.UserDisliked.indexOf(req.body.id)
    // si l'utilisateur aime la sauce
    if (action === 1) {
        for (let i = 0; i > sauce.usersLiked.length; i++) {

            // Si l'élément n'existe pas dans le tableau je le rajoute
            if (positionOnLike === -1) {
                sauce.usersLiked.push(req.body.id);

                // je le supprime du tableau des dislikes si il est présent
                if(positionOnDisLike != -1){
                    sauce.usersDisliked.splice(0, positionOnDisLike);
                }

            }else{
                // si il exite dans le tableau des likes je le laisse et je le supprime du tableau des dislikes si il est présent
                if(positionOnDisLike != -1){
                    sauce.usersDisliked.splice(0, positionOnDisLike);
                }
            }
        }
    }
};
action();




function gestionDislikes(req, sauce){
    /* si l'user n'aime pas la sauce:
    je verifie dans les tableaux qu'il n'est pas présent sinon je le supprime des tableaux
    je l'ajoute dans le tableau correspondant */

    // position dans le tableau des likes et des dislikes de l'userId
    let positionOnLike = sauce.usersLiked.indexOf(req.body.userId);
    let positionOnDisLike = sauce.usersDisliked.indexOf(req.body.userId);

    // si la recherche retourne -1 c'est qu'il n'est pas présent dans les tableaux
    if (positionOnLike != -1) {
        sauce.usersLiked.splice(positionOnLike, 1);
        console.log('id supprimé du tableau des likes');
    } else if (positionOnDisLike != -1) {
         sauce.usersDisliked.splice(positionOnDisLike, 1);
        console.log('id supprimé du tableau des dislikes');
    }
sauce.usersDisliked.push(req.body.userId)
}