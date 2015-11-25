$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "/partials",
    success: function(data) {
      alert('it was a success!!');
    },
    error: function(jqXHR, textStatus, errThrown) {
      console.log(textStatus);
      console.log(errThrown);
      alert('Impossible de recuperer les armes du jeu sur le serveur...');
    }
  });
});