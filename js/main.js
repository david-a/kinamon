(function() {
  var refreshSelected, switchMenu, updateRecipe;

  switchMenu = function(type, animate) {
    var menuHtml, tempDiv;
    if (animate == null) {
      animate = false;
    }
    menuHtml = templates.menu(menus[type]);
    if (!animate) {
      return $('.menu').html(menuHtml);
    }
    tempDiv = $(templates.hiddenDiv(menuHtml)).appendTo('body');
    return $('.menu').animate({
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

  $('.menu').on('click', 'li', function(event) {
    return $('.menu').trigger('item:click', [$(this).closest('.menu-wrapper').data('type'), $(this).data('value')]);
  });

  $('.menu').on('click', 'a.submit', function(event) {
    return $('.menu').trigger('menu:submit', [$(this).closest('.menu-wrapper').data('type')]);
  });

  $('.menu').on('item:click', function(event, type, value) {
    if (type === 'recipe') {
      return switchMenu(value, true);
    } else {
      refreshSelected(type, value);
      return updateRecipe(type, value);
    }
  });

  $('.menu').on('menu:submit', function(event, type) {
    if (type === 'recipe') {

    } else {
      return switchMenu('recipe', true);
    }
  });

  switchMenu('recipe');

}).call(this);
