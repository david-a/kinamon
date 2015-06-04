(function() {
  var clickedOnAppBody, hideForm, hideMenu, menu, minimizeMenu, refreshSelected, restoreMenu, showForm, storeMenuHeaight, switchMenu, updateCake, updateRecipe;

  menu = $('.menu');

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
    return menus['recipe'].elements[type].name = menus[type].elements[value].name;
  };

  updateCake = function(type, value) {
    return $("#cake #" + type).html(menus[type].elements[value].svg);
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
    if (type === 'recipe') {
      return showForm();
    } else {
      return switchMenu('recipe', true);
    }
  });

  $('.back-to-recipe').on('click', function() {
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
