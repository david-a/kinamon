(function() {
  this.templates = {
    menu: function(data) {
      var lines;
      lines = $.map(data.elements, function(element, type) {
        return ("<li class='line " + (element.klass || '') + "' data-value='" + type + "'>") + "<img src='public/images/check.png'>" + ("<span class='prefix'>" + (element.prefix || '') + "</span>") + ("" + (element.name || '')) + "</li>";
      });
      return ("<div class='menu-wrapper' data-type='" + data.type + "'>") + ("<a class='submit'>" + (data.button || 'בחר') + "</a>") + ("<h2 class='heading'>" + data.name + "</h2>") + "<div class='list-wrapper'>" + "<ul>" + lines.join('') + "</ul>" + "</div>" + "</div>";
    },
    hiddenDiv: function(content) {
      return "<div class='menu invisible'>" + content + "</div>";
    }
  };

}).call(this);
