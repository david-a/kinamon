(function() {
  this.menus = {
    recipe: {
      name: 'מתכון',
      type: 'recipe',
      button: 'קדימה לתנור!',
      elements: {
        base: {
          prefix: 'בסיס'
        },
        fill: {
          prefix: 'מילוי'
        },
        extras: {
          prefix: 'תוספות'
        },
        cover: {
          prefix: 'ציפוי'
        }
      }
    },
    base: {
      name: 'בסיס',
      type: 'base',
      elements: {
        brownies: {
          name: 'בראוניז'
        },
        coconut: {
          name: 'קוקוס'
        },
        riceflakes: {
          name: 'פצפוצי אורז'
        },
        biscuits: {
          name: 'ביסקוויטים'
        },
        tort: {
          name: 'טורט'
        }
      }
    },
    fill: {
      name: 'מילוי',
      type: 'fill',
      elements: {
        tricolad: {
          name: 'טריקולד'
        },
        whiteCream: {
          name: 'קרם לבן'
        }
      }
    },
    extras: {
      name: 'תוספות',
      type: 'extras',
      elements: {
        none: {
          name: 'ללא תוספות'
        },
        truffles: {
          name: 'טראפלס'
        },
        cornflakes: {
          name: 'קורנפלקס'
        }
      }
    },
    cover: {
      name: 'ציפוי',
      type: 'cover',
      elements: {
        none: {
          name: 'ללא ציפוי'
        },
        whiteGanash: {
          name: 'גנש לבן'
        },
        brownGanash: {
          name: 'גנש חום'
        }
      }
    }
  };

}).call(this);
