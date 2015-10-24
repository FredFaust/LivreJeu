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

      $.ajax({
        type: "POST",
        url: "/player",
        success: function(data) {
          console.log(data);
          if (typeof(data.redirect) == 'string') {
            window.location = data.redirect;
          }
        },
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json"
      });
    }
);

$('#DISC_ARMS_CONTROL').click(function() {
  var masteredWeaponText = $('#mastered-weapon');
  if (masteredWeaponText.hasClass('invisible')) {
    var randomWeaponIndex = Math.floor(Math.random() * (9 - 1)) + 1;

    $.ajax({
      type: "GET",
      url: '/game/weapons',
      success: function(data) {
        if (!data) {
          return;
        }

        var weapons = _.pairs(data);
        localStorage.setItem('random-weapon-key', weapons[randomWeaponIndex][0]);
        localStorage.setItem('random-weapon-value', weapons[randomWeaponIndex][1]);

        masteredWeaponText.html('Arme maitrisee: ' + localStorage.getItem('random-weapon-value'));
        masteredWeaponText.removeClass('invisible').addClass('visible');
      },
      error: function() {
        alert('Impossible de recuperer les armes du jeu sur le serveur...');
      }
    });

  } else {
    masteredWeaponText.removeClass('visible').addClass('invisible');
    localStorage.removeItem('random-weapon');
  }
});