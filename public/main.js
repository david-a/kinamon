(function() {
  var calculatePrice, clickedOnAppBody, formErrors, hideForm, hideMenu, menu, minimizeMenu, recipeErrors, recipeSummary, refreshSelected, restoreMenu, showForm, startingPrice, storeMenuHeaight, switchMenu, updateCake, updateRecipe;

  menu = $('.menu');

  startingPrice = 160;

  storeMenuHeaight = function() {
    if (!menu.data('height')) {
      return menu.data('height', menu.height());
    }
  };

  hideMenu = function() {
    storeMenuHeaight();
    return menu.animate({
      height: 0,
      opacity: 0
    });
  };

  minimizeMenu = function() {
    storeMenuHeaight();
    return menu.animate({
      height: $('.menu-title-wrapper').height()
    });
  };

  restoreMenu = function() {
    return menu.animate({
      height: menu.data('height'),
      opacity: 1
    }, {
      complete: menu.removeData('height')
    });
  };

  showForm = function() {
    return $('.overlay').addClass('enabled');
  };

  hideForm = function() {
    return $('.overlay').removeClass('enabled');
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

  clickedOnAppBody = function(element) {
    return $(element).is('body') || $(element).parents('.cake-wrapper').length;
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
    $.each(menus[type].elements, function(i, e) {
      return e.klass = '';
    });
    menus[type].elements[value].klass = 'selected';
    switchMenu(type);
    return $('.menu ul').scrollTop($('li.selected').position().top - 100);
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
      if (recipeErrors()) {
        return false;
      }
      price = calculatePrice();
      $('.form-show-total').html(price);
      $('#form-total').attr('value', price);
      $('#form-recipe').attr('value', recipeSummary());
      return showForm();
    } else {
      return switchMenu('recipe', true);
    }
  });

  $('.back-to-recipe').on('click', function() {
    return hideForm();
  });

  $('form.submit-cake-form input').on('focus', function() {
    return $('.error').removeClass('error');
  });

  $('form.submit-cake-form, .menu').on('submit', function(event) {
    var formData;
    if (formErrors()) {
      return false;
    }
    event.preventDefault();
    formData = $(this).serialize();
    $.ajax({
      url: '//formspree.io/david.avikasis@gmail.com',
      method: 'POST',
      data: formData,
      dataType: 'json'
    });
    return hideForm();
  });

  $('body').on('click', function(event) {
    if (clickedOnAppBody(event.target)) {
      return minimizeMenu();
    }
  });

  $('body').on('click', '.menu-title-wrapper', function() {
    return restoreMenu();
  });

  switchMenu('recipe');

}).call(this);
