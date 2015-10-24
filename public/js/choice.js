$('input.button.button-warning').click(function() {
  var pathArray = window.location.pathname.split( '/' );
  var index = _.indexOf(pathArray, 'game');
  if (index < 0) {
    alert("Erreur d'url");
    return;
  }
  window.location.assign('/choixaleatoire/' + pathArray[index + 1]);
});
