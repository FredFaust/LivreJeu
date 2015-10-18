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

      $.ajax({
        type: "POST",
        url: "/player",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json"
      });
    }
);