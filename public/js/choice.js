$('input.button.button-warning').click(function() {
  //On essaye de trouver le numero de la page actuelle à l'aide de
  //notre URL actuelle. (e.g. /game/167/1)
  var pathArray = window.location.pathname.split( '/' );
  var index = _.indexOf(pathArray, 'game');
  if (index < 0) {
    alert("Erreur d'url");
    return;
  }

  //Requête ajax GET pour connaitre le choix aleatoire en fonction du numero de page
  $.ajax({
    type: "GET",
    url: "/json/choixaleatoire/" + pathArray[index + 1],
    success: function(data) {
      if (!_.isUndefined(data) && !_.isNull(data)) {
        var deserializedData = JSON.parse(data);
        if (_.isString(deserializedData.redirect)){
          //On redirige l'utilisateur vers le nom de la page qui à été renvoyé par le service web
          window.location.assign(deserializedData.redirect);
        }
      }
    },
    error: function(jqXHR, exception) {
      alert('Une erreur est survenue lors du choix aleatoire...');
    }
  });
});
