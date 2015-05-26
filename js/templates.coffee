@templates =
  menu: (data) ->
    lines = $.map data.elements, (element, type) ->
      "<li class='line #{element.klass || ''}' data-value='#{type}'>" +
      "<img src='images/check.png'>" +
      "<span class='prefix'>#{element.prefix || ''}</span>" +
      "#{element.name || ''}" +
      "</li>"
    "<div class='menu-wrapper' data-type='#{data.type}'>" +
    "<a class='submit'>#{data.button || 'בחר'}</a>" +
    "<h2 class='heading'>#{data.name}</h2>" +
    "<div class='list-wrapper'>" +
    "<ul>" +
    lines.join('') +
    "</ul>" +
    "</div>" +
    "</div>"

  hiddenDiv: (content) ->
    "<div class='menu invisible'>" + content + "</div>"