//Effectuer un callback après un click sur le bouton "Débuter l'aventure" du formulaire
$('input.button.button-success').click(function() {
      var disciplines = [],
          items = [];

      $("#discs input:checked").each(function() {
        disciplines.push(this.name);
      });

      $("#equip input:checked").each(function() {
        items.push(this.name);
      });

      var data = {
        name: $('#heroname').val(),
        disciplines: disciplines,
        items: items
      };

      var masteredWeapon = localStorage.getItem('random-weapon-key');
      if (masteredWeapon) {
        data.masteredWeapon = masteredWeapon;
      }

      //Requête ajax POST pour envoyer les infos du joueur en JSON
      $.ajax({
        type: "POST",
        url: "/player",
        success: function(data) {
          if (typeof(data.redirect) == 'string') {
            //On redirige l'utilisateur vers le nom de la page qui à été renvoyé par le service web
            window.location = data.redirect;
          }
        },
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json"
      });
    }
);

//Callback à effectuer après un click sur le checkbox de la discipline "Maîtrise des armes"
$('#DISC_ARMS_CONTROL').click(function() {
  var masteredWeaponText = $('#mastered-weapon');
  if (masteredWeaponText.hasClass('invisible')) {
    var randomWeaponIndex = Math.floor(Math.random() * (9 - 1)) + 1;

    //Requête ajax GET pour obtenir la liste des armes qui sont maîtrisables
    $.ajax({
      type: "GET",
      url: '/json/weapons',
      success: function(data) {
        if (!data) {
          return;
        }

        var weapons = _.pairs(data);
        //On sauvegarde temporairement l'arme maîtrisé
        localStorage.setItem('random-weapon-key', weapons[randomWeaponIndex][0]);
        localStorage.setItem('random-weapon-value', weapons[randomWeaponIndex][1]);

        //On modifie le html de l'élément afin qu'il affiche l'arme maîtrisé
        masteredWeaponText.html('Arme maitrisee: ' + localStorage.getItem('random-weapon-value'));
        //On fait apparaître l'élément en enlevant la classe invisible
        masteredWeaponText.removeClass('invisible').addClass('mastered-weapon');
      },
      error: function() {
        alert('Impossible de recuperer les armes du jeu sur le serveur...');
      }
    });

  } else {
    //On cache l'élément car le checkbox "Maîtrise des armes" à été clicker à nouveau
    masteredWeaponText.removeClass('mastered-weapon').addClass('invisible');
    //On supprimes les valeurs du localstorage
    localStorage.removeItem('random-weapon-key');
    localStorage.removeItem('random-weapon-value');
  }
});