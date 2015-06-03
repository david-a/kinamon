menu = $('.menu')

storeMenuHeaight = ->
  menu.data('height', menu.height()) unless menu.data('height')

hideMenu = ->
  storeMenuHeaight()
  menu.animate
    height: 0
    opacity: 0

minimizeMenu = ->
  storeMenuHeaight()
  menu.animate
    height: $('.menu-title-wrapper').height()

restoreMenu = ->
  menu.animate
    height: menu.data('height')
    opacity: 1
  ,
    complete: menu.removeData('height')

clickedOnAppBody = (element) ->
  $(element).is('body') || $(element).parents('.cake-wrapper').length

switchMenu = (type, animate = false) ->
  menuHtml = templates.menu(menus[type])
  return menu.html menuHtml unless animate
  tempDiv = $(templates.hiddenDiv(menuHtml)).appendTo('body')
  menu.animate {
    height: tempDiv.height()
    width: tempDiv.width()
  }, 200, ->
    $(@).html(menuHtml).attr(style: '')
    tempDiv.remove()

refreshSelected = (type, value) ->
  $.each menus[type].elements, (i, e) -> e.klass = ''
  menus[type].elements[value].klass = 'selected'
  switchMenu(type)
  $('.menu ul').scrollTop($('li.selected').position().top - 100);

updateRecipe = (type, value) ->
  menus['recipe'].elements[type].klass = 'selected'
  menus['recipe'].elements[type].name = menus[type].elements[value].name

updateCake = (type, value) ->
  $("#cake ##{type}").html(menus[type].elements[value].svg)

menu.on 'click', 'li', (event) ->
  menu.trigger 'item:click', [$(@).closest('.menu-wrapper').data('type'), $(@).data('value')]

menu.on 'click', 'a.submit', (event) ->
  menu.trigger 'menu:submit', [$(@).closest('.menu-wrapper').data('type')]

menu.on 'item:click', (event, type, value) ->
  if type == 'recipe'
    switchMenu(value, true)
  else
    refreshSelected(type, value)
    updateRecipe(type, value)
    updateCake(type, value)

menu.on 'menu:submit', (event, type) ->
  if type == 'recipe'
    # Open popup
  else
    switchMenu('recipe', true)

$('body').on 'click', (event) ->
  minimizeMenu() if clickedOnAppBody(event.target)

$('body').on 'click', '.menu-title-wrapper', -> restoreMenu()

switchMenu('recipe')