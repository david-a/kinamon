(function() {
  var calculatePrice, clickedCakePart, formEndpoint, formErrors, hideOverlay, isMobile, isPortrait, menu, nikudForTitle, placeCake, recipeErrors, recipeSummary, refreshSelected, showApproval, showForm, showOverlayAndForm, startingPrice, switchMenu, updateCake, updateRecipe;

  menu = $('.menu');

  startingPrice = 160;

  formEndpoint = '//formspree.io/f/mgeqqjnd';

  isPortrait = function() {
    return $(window).height() > $(window).width();
  };

  isMobile = function() {
    return isPortrait() || $(window).width() <= 500;
  };

  showOverlayAndForm = function() {
    showForm();
    return $('.overlay').show(function() {
      return $(this).addClass('enabled', 500);
    });
  };

  hideOverlay = function() {
    return $('.overlay').fadeOut(400, function() {
      return $(this).removeClass('enabled');
    });
  };

  showApproval = function() {
    return $('.form-wrapper').fadeOut(function() {
      return $('.order-approval').fadeIn(500).delay(3000).fadeOut(100, function() {
        return hideOverlay();
      });
    });
  };

  showForm = function() {
    return $('.form-wrapper').fadeIn();
  };

  formErrors = function() {
    if ($('#form-phone').val().length < 9) {
      $('#form-phone').addClass('error', 600);
      return true;
    }
  };

  recipeErrors = function() {
    var hasErrors;
    hasErrors = false;
    $.each(menus['recipe'].elements, function(type, el) {
      if (!el.name) {
        $("li.line[data-value=" + type + "] span").addClass('error', 2000);
        return hasErrors = true;
      }
    });
    return hasErrors;
  };

  clickedCakePart = function(element) {
    return $(element).parents('.cake-part').attr('id') || 'recipe';
  };

  switchMenu = function(type, animate) {
    var menuHtml, tempDiv;
    if (animate == null) {
      animate = false;
    }
    menuHtml = templates.menu(menus[type]);
    if (!animate) {
      return menu.html(menuHtml);
    }
    tempDiv = $(templates.hiddenDiv(menuHtml)).appendTo('body');
    return menu.animate({
      height: tempDiv.height(),
      width: tempDiv.width()
    }, 200, function() {
      $(this).html(menuHtml).attr({
        style: ''
      });
      return tempDiv.remove();
    });
  };

  refreshSelected = function(type, value) {
    var scrollPosition;
    $.each(menus[type].elements, function(i, e) {
      return e.klass = '';
    });
    menus[type].elements[value].klass = 'selected';
    scrollPosition = $('.menu ul').scrollTop();
    switchMenu(type);
    return $('.menu ul').scrollTop(scrollPosition);
  };

  updateRecipe = function(type, value) {
    menus['recipe'].elements[type].klass = 'selected';
    menus['recipe'].elements[type].name = menus[type].elements[value].name;
    return menus['recipe'].elements[type].price = menus[type].elements[value].price;
  };

  updateCake = function(type, value) {
    $("#cake #" + type + " > g").replaceWith(menus[type].elements[value].svg);
    return $(".cake-wrapper").html($(".cake-wrapper").html());
  };

  calculatePrice = function() {
    var extraPrice;
    extraPrice = $.map(menus['recipe'].elements, function(el) {
      return el.price;
    }).reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    }, 0);
    return startingPrice + extraPrice;
  };

  recipeSummary = function() {
    return $.map(menus['recipe'].elements, function(el) {
      return el.prefix + ": " + (el.name || 'ללא');
    }).reduce(function(previousValue, currentValue, index, array) {
      return previousValue + ' | ' + currentValue;
    }, '');
  };

  placeCake = function() {
    var bgHeight;
    bgHeight = $(window).height() - $('.header-wrapper').height();
    if (isMobile()) {
      bgHeight -= menu.height();
    }
    return $('.cake-wrapper').css('padding', (0.05 * bgHeight) + "px 2vw").css('height', 0.9 * bgHeight);
  };

  nikudForTitle = function() {
    if ("chrome" in window) {
      return $('.header h1.title').html('עוּגָה בְּהַרְכָּבָה');
    }
  };

  menu.on('click', 'li', function(event) {
    return menu.trigger('item:click', [$(this).closest('.menu-wrapper').data('type'), $(this).data('value')]);
  });

  menu.on('click', 'a.submit', function(event) {
    return menu.trigger('menu:submit', [$(this).closest('.menu-wrapper').data('type')]);
  });

  menu.on('item:click', function(event, type, value) {
    if (type === 'recipe') {
      return switchMenu(value, true);
    } else {
      refreshSelected(type, value);
      updateRecipe(type, value);
      return updateCake(type, value);
    }
  });

  menu.on('menu:submit', function(event, type) {
    var price;
    if (type === 'recipe') {
      ga('send', 'event', 'cake-recipe', 'cake-submit');
      if (recipeErrors()) {
        ga('send', 'event', 'cake-recipe', 'cake-error');
        return false;
      }
      price = calculatePrice();
      $('.form-show-total').html(price);
      $('#form-total').attr('value', price);
      $('#form-recipe').attr('value', recipeSummary());
      return showOverlayAndForm();
    } else {
      ga('send', 'event', 'cake-recipe', 'chosen-ingredient');
      return switchMenu('recipe', true);
    }
  });

  $('.back-to-recipe').on('click', function() {
    return hideOverlay();
  });

  $('form.submit-cake-form input').on('focus', function() {
    return $('.error').removeClass('error');
  });

  $('form.submit-cake-form, .menu').on('submit', function(event) {
    var formData;
    ga('send', 'event', 'order-form', 'order-submit');
    if (formErrors()) {
      ga('send', 'event', 'order-form', 'order-error');
      return false;
    }
    event.preventDefault();
    formData = $(this).serialize();
    return $.ajax({
      url: formEndpoint,
      method: 'POST',
      data: formData,
      dataType: 'json',
      complete: function() {
        ga('send', 'event', 'order-form', 'order-success');
        return showApproval();
      }
    });
  });

  $('.cake-wrapper').on('click', function(event) {
    return switchMenu(clickedCakePart(event.target));
  });

  $(window).on('resize', function() {
    return placeCake();
  });

  nikudForTitle();

  switchMenu('recipe');

  placeCake();

}).call(this);
