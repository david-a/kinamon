(function() {
  var calculatePrice, clickedCakePart, formErrors, hideOverlay, isMobile, isPortrait, menu, orderingEmail, placeCake, recipeErrors, recipeSummary, refreshSelected, showApproval, showForm, showOverlayAndForm, startingPrice, switchMenu, updateCake, updateRecipe;

  menu = $('.menu');

  startingPrice = 160;

  orderingEmail = 'david.avikasis@gmail.com';

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
    return $("#cake #" + type).html(menus[type].elements[value].svg);
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
      return "" + el.prefix + ": " + (el.name || 'ללא');
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
    return $('.cake-wrapper').css('padding', "" + (0.05 * bgHeight) + "px 2vw").css('height', 0.9 * bgHeight);
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
      price = calculatePrice();
      $('.form-show-total').html(price);
      $('#form-total').attr('value', price);
      $('#form-recipe').attr('value', recipeSummary());
      return showOverlayAndForm();
    } else {
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
    event.preventDefault();
    return showApproval();
  });

  $('.cake-wrapper').on('click', function(event) {
    return switchMenu(clickedCakePart(event.target));
  });

  $(window).on('resize', function() {
    return placeCake();
  });

  switchMenu('recipe');

  placeCake();

}).call(this);
