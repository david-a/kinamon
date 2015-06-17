menu = $('.menu')
startingPrice = 160
orderingEmail = 'or.kinamon@gmail.com'

isPortrait = ->
  $(window).height() > $(window).width()

isMobile = ->
  isPortrait() || $(window).width() <= 500

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

clickedCakePart = (element) ->
  $(element).parents('.cake-part').attr('id') || 'recipe'

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
  scrollPosition = $('.menu ul').scrollTop()
  switchMenu(type)
  $('.menu ul').scrollTop(scrollPosition)

updateRecipe = (type, value) ->
  menus['recipe'].elements[type].klass = 'selected'
  menus['recipe'].elements[type].name = menus[type].elements[value].name
  menus['recipe'].elements[type].price = menus[type].elements[value].price

updateCake = (type, value) ->
  # $('#cake-defs').append menus[type].elements[value].defs # TODO enable defs on-the-fly
  $("#cake ##{type} > g").replaceWith(menus[type].elements[value].svg)
  $(".cake-wrapper").html($(".cake-wrapper").html());

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
  bgHeight -= menu.height() if isMobile()
  $('.cake-wrapper').css('padding', "#{0.05 * bgHeight}px 2vw").css('height', 0.9 * bgHeight)

nikudForTitle = ->
  $('.header h1.title').html('עוּגָה בְּהַרְכָּבָה') if "chrome" of window

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
    ga('send', 'event', 'cake-recipe', 'cake-submit')
    if recipeErrors()
      ga('send', 'event', 'cake-recipe', 'cake-error')
      return false
    price = calculatePrice()
    $('.form-show-total').html(price)
    $('#form-total').attr('value', price)
    $('#form-recipe').attr('value', recipeSummary())
    showOverlayAndForm()
  else
    ga('send', 'event', 'cake-recipe', 'chosen-ingredient')
    switchMenu('recipe', true)

$('.back-to-recipe').on 'click', -> hideOverlay()

$('form.submit-cake-form input').on 'focus', ->
  $('.error').removeClass('error')

$('form.submit-cake-form, .menu').on 'submit', (event) ->
  ga('send', 'event', 'order-form', 'order-submit')
  if formErrors()
    ga('send', 'event', 'order-form', 'order-error')
    return false
  event.preventDefault()
  formData = $(@).serialize()
  $.ajax
    url: '//formspree.io/' + orderingEmail
    method: 'POST'
    data: formData
    dataType: 'json'
    complete: ->
      ga('send', 'event', 'order-form', 'order-success')
      showApproval()

$('.cake-wrapper').on 'click', (event) ->
  switchMenu(clickedCakePart(event.target))

$(window).on 'resize', -> placeCake()

nikudForTitle()
switchMenu('recipe')
placeCake()
