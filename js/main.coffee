
switchMenu = (type, animate = false) ->
  menuHtml = templates.menu(menus[type])
  return $('.menu').html menuHtml unless animate
  tempDiv = $(templates.hiddenDiv(menuHtml)).appendTo('body')
  $('.menu').animate {
    height: tempDiv.height()
    width: tempDiv.width()
  }, 200, ->
    $(@).html(menuHtml).attr(style: '')
    tempDiv.remove()

refreshSelected = (type, value) ->
  $.each menus[type].elements, (i, e) -> e.klass = ''
  menus[type].elements[value].klass = 'selected'
  switchMenu(type)

updateRecipe = (type, value) ->
  menus['recipe'].elements[type].klass = 'selected'
  menus['recipe'].elements[type].name = menus[type].elements[value].name

$('.menu').on 'click', 'li', (event) ->
  $('.menu').trigger 'item:click', [$(@).closest('.menu-wrapper').data('type'), $(@).data('value')]

$('.menu').on 'click', 'a.submit', (event) ->
  $('.menu').trigger 'menu:submit', [$(@).closest('.menu-wrapper').data('type')]

$('.menu').on 'item:click', (event, type, value) ->
  if type == 'recipe'
    switchMenu(value, true)
  else
    refreshSelected(type, value)
    updateRecipe(type, value)
    # Replace cake part
    # Update form?

$('.menu').on 'menu:submit', (event, type) ->
  if type == 'recipe'
    # Open popup
  else
    switchMenu('recipe', true)

switchMenu('recipe')