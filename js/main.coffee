menu = $('.menu')
startingPrice = 160
orderingEmail = 'david.avikasis@gmail.com'

storeMenuHeaight = ->
  menu.data('height', menu.height()) unless menu.data('height')

minimizeMenu = ->
  storeMenuHeaight()
  menu.animate
    height: $('.menu-title-wrapper').height()
  $('.menu-wrapper .submit').fadeOut(200)

restoreMenu = ->
  menu.animate
    height: menu.data('height')
    opacity: 1
  ,
    complete: ->
      menu.removeData('height')
      $('.menu-wrapper .submit').fadeIn(200)


showOverlayAndForm = ->
  showForm()
  $('.overlay').show ->
    $(@).addClass('enabled', 500)

hideOverlay = ->
  $('.overlay').fadeOut 400, ->
    $(@).removeClass('enabled')

showApproval = ->
  $('.form-wrapper').fadeOut ->
    $('.order-approval').fadeIn(500).delay(3000).fadeOut 100, ->
      hideOverlay()

showForm = ->
  $('.form-wrapper').fadeIn()

formErrors = ->
  if $('#form-phone').val().length < 9
    $('#form-phone').addClass('error', 600)
    return true

recipeErrors = ->
  hasErrors = false
  $.each menus['recipe'].elements, (type, el) ->
    unless el.name
      $("li.line[data-value=#{type}] span").addClass('error', 2000)
      hasErrors = true
  hasErrors

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
  menus['recipe'].elements[type].price = menus[type].elements[value].price

updateCake = (type, value) ->
  $("#cake ##{type}").html(menus[type].elements[value].svg)

calculatePrice = ->
  extraPrice = $.map menus['recipe'].elements, (el) -> el.price
    .reduce (previousValue, currentValue, index, array) ->
      previousValue + currentValue
    ,
      0
  startingPrice + extraPrice

recipeSummary = ->
  $.map menus['recipe'].elements, (el) -> "#{el.prefix}: #{el.name || 'ללא'}"
    .reduce (previousValue, currentValue, index, array) ->
      previousValue + ' | '+ currentValue
    ,
      ''

placeCake = ->
  bgHeight = $(window).height() - $('.header-wrapper').height()
  $('.cake-wrapper').css('padding', "#{0.05 * bgHeight}px 0").css('height', 0.9 * bgHeight)

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
    # return false if recipeErrors() # debug
    price = calculatePrice()
    $('.form-show-total').html(price)
    $('#form-total').attr('value', price)
    $('#form-recipe').attr('value', recipeSummary())
    showOverlayAndForm()
  else
    switchMenu('recipe', true)

$('.back-to-recipe').on 'click', -> hideOverlay()

$('form.submit-cake-form input').on 'focus', ->
  $('.error').removeClass('error')

$('form.submit-cake-form, .menu').on 'submit', (event) ->
  # return false if formErrors() # DEBUG
  event.preventDefault()
  # formData = $(@).serialize()
  # $.ajax
  #   url: '//formspree.io/' + orderingEmail
  #   method: 'POST'
  #   data: formData
  #   dataType: 'json'
  #   complete: -> showApproval()
  showApproval() # DEBUG

$('body').on 'click', (event) ->
  minimizeMenu() if clickedOnAppBody(event.target)

$('body').on 'click', '.menu-title-wrapper', -> restoreMenu()

$(window).on 'resize', -> placeCake()

placeCake()
switchMenu('recipe')