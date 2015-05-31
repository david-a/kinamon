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
          name: 'בראוניז',
          svg: '<g id="base-brownies"> <path d="M730.831874,362.22602 L0.207837347,270.270012 L0.207837347,223.87595 L730.831874,315.831958 L730.831874,362.22602 Z" id="base_up" fill="#311B01"></path> <path d="M730.831874,362.22602 L0.207837347,270.270012 L0.207837347,252.87595 L730.831874,344.831958 L730.831874,362.22602 Z" id="base_down" fill-opacity="0.313957556" fill="#3E2200"></path> <path d="M4.5,258.5 L725.499974,347.5" id="line1" stroke-opacity="0.0979959239" stroke="#BF7313" stroke-linecap="square"></path> <path d="M5.14382441,262.5 L726.143799,351.5" id="line2" stroke-opacity="0.0979959239" stroke="#BF7313" stroke-linecap="square"></path> <path d="M6.14382441,266.5 L727.143799,355.5" id="line3" stroke-opacity="0.0979959239" stroke="#BF7313" stroke-linecap="square"></path> <path d="M2.04281037e-14,224.527716 C2.04281037e-14,224.527716 7.48979278,151.451112 75.0452661,81.6898888 C142.600739,11.928666 227.348451,-1.77635684e-15 227.348451,-1.77635684e-15 L730.604187,315.703247 C486.572345,285.249366 2.04281037e-14,224.527716 2.04281037e-14,224.527716 Z" id="base-top" fill="#2F1E06"></path> </g>'
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
        chocolateFudge: {
          name: 'פאדג׳ שוקולד',
          svg: '<g id="fill-chocolate-fudge"> <path d="M730.831874,438.860423 L0.207837347,346.904415 L0.207837347,223.748996 L730.831874,315.705004 L730.831874,438.860423 Z" id="fill" fill="#3D2200"></path> <path d="M0.207837347,224.527716 C0.207837347,224.527716 7.69763012,151.451112 75.2531035,81.6898888 C142.808577,11.928666 227.556288,-1.77635684e-15 227.556288,-1.77635684e-15 L730.812024,315.703247 C486.780182,285.249366 0.207837347,224.527716 0.207837347,224.527716 Z" id="fill-top" fill="#301B01"></path> </g>'
        },
        whiteChocolateMousse: {
          name: 'מוס שוקולד לבן',
          svg: '<g id="fill-white-chocolate-mousse"> <path d="M730.831874,438.860423 L0.207837347,346.904415 L0.207837347,223.748996 L730.831874,315.705004 L730.831874,438.860423 Z" id="fill" fill="#F1D9BA"></path> <path d="M0.207837347,224.527716 C0.207837347,224.527716 7.69763012,151.451112 75.2531035,81.6898888 C142.808577,11.928666 227.556288,-1.77635684e-15 227.556288,-1.77635684e-15 L730.812024,315.703247 C486.780182,285.249366 0.207837347,224.527716 0.207837347,224.527716 Z" id="fill-top" fill="#FFE5C5"></path> <g id="holes1" transform="translate(284.288974, 290.043653) rotate(-16.000000) translate(-284.288974, -290.043653) translate(47.788974, 208.043653)" fill="#E7CFB0"> <ellipse id="hole5" transform="translate(20.367496, 12.335747) rotate(24.000000) translate(-20.367496, -12.335747) " cx="20.3674959" cy="12.3357468" rx="20.5" ry="4"></ellipse> <ellipse id="hole5-copy" transform="translate(79.171116, 30.409837) rotate(24.000000) translate(-79.171116, -30.409837) " cx="79.1711161" cy="30.409837" rx="20.5" ry="4"></ellipse> <ellipse id="hole4" transform="translate(25.195212, 26.409837) rotate(24.000000) translate(-25.195212, -26.409837) " cx="25.1952121" cy="26.409837" rx="15.4983543" ry="3.02406914"></ellipse> <ellipse id="hole4-copy" transform="translate(83.998832, 44.483927) rotate(24.000000) translate(-83.998832, -44.483927) " cx="83.9988323" cy="44.4839273" rx="15.4983543" ry="3.02406914"></ellipse> <ellipse id="hole3" transform="translate(55.501682, 28.052835) rotate(24.000000) translate(-55.501682, -28.052835) " cx="55.5016815" cy="28.0528354" rx="14.8851119" ry="2.90441207"></ellipse> <ellipse id="hole3-copy" transform="translate(114.305302, 46.126926) rotate(24.000000) translate(-114.305302, -46.126926) " cx="114.305302" cy="46.1269257" rx="14.8851119" ry="2.90441207"></ellipse> <ellipse id="hole2" transform="translate(45.617281, 44.451362) rotate(24.000000) translate(-45.617281, -44.451362) " cx="45.6172812" cy="44.451362" rx="13.1470647" ry="2.56528091"></ellipse> <ellipse id="hole2-copy" transform="translate(104.420901, 62.525452) rotate(24.000000) translate(-104.420901, -62.525452) " cx="104.420901" cy="62.5254522" rx="13.1470647" ry="2.56528091"></ellipse> <ellipse id="hole1" transform="translate(57.066081, 40.113970) rotate(24.000000) translate(-57.066081, -40.113970) " cx="57.0660807" cy="40.1139698" rx="13.3095398" ry="2.59698338"></ellipse> <ellipse id="hole1-copy" transform="translate(115.869701, 58.188060) rotate(24.000000) translate(-115.869701, -58.188060) " cx="115.869701" cy="58.18806" rx="13.3095398" ry="2.59698338"></ellipse> <ellipse id="hole1-copy-4" transform="translate(459.315764, 155.629334) rotate(24.000000) translate(-459.315764, -155.629334) " cx="459.315764" cy="155.629334" rx="13.3095398" ry="2.59698338"></ellipse> <ellipse id="hole1-copy-5" transform="translate(225.608698, 73.759940) rotate(24.000000) translate(-225.608698, -73.759940) " cx="225.608698" cy="73.7599398" rx="13.3095398" ry="2.59698338"></ellipse> </g> <g id="holes2" transform="translate(631.615456, 362.614371) rotate(-16.000000) translate(-631.615456, -362.614371) translate(566.615456, 327.114371)" fill="#E7CFB0"> <ellipse id="hole5" transform="translate(20.367496, 12.335747) rotate(24.000000) translate(-20.367496, -12.335747) " cx="20.3674959" cy="12.3357468" rx="20.5" ry="4"></ellipse> <ellipse id="hole5-copy" transform="translate(79.171116, 30.409837) rotate(24.000000) translate(-79.171116, -30.409837) " cx="79.1711161" cy="30.409837" rx="20.5" ry="4"></ellipse> <ellipse id="hole4" transform="translate(25.195212, 26.409837) rotate(24.000000) translate(-25.195212, -26.409837) " cx="25.1952121" cy="26.409837" rx="15.4983543" ry="3.02406914"></ellipse> <ellipse id="hole4-copy" transform="translate(83.998832, 44.483927) rotate(24.000000) translate(-83.998832, -44.483927) " cx="83.9988323" cy="44.4839273" rx="15.4983543" ry="3.02406914"></ellipse> <ellipse id="hole3" transform="translate(55.501682, 28.052835) rotate(24.000000) translate(-55.501682, -28.052835) " cx="55.5016815" cy="28.0528354" rx="14.8851119" ry="2.90441207"></ellipse> <ellipse id="hole3-copy" transform="translate(114.305302, 46.126926) rotate(24.000000) translate(-114.305302, -46.126926) " cx="114.305302" cy="46.1269257" rx="14.8851119" ry="2.90441207"></ellipse> <ellipse id="hole2" transform="translate(45.617281, 44.451362) rotate(24.000000) translate(-45.617281, -44.451362) " cx="45.6172812" cy="44.451362" rx="13.1470647" ry="2.56528091"></ellipse> <ellipse id="hole2-copy" transform="translate(104.420901, 62.525452) rotate(24.000000) translate(-104.420901, -62.525452) " cx="104.420901" cy="62.5254522" rx="13.1470647" ry="2.56528091"></ellipse> <ellipse id="hole1" transform="translate(57.066081, 40.113970) rotate(24.000000) translate(-57.066081, -40.113970) " cx="57.0660807" cy="40.1139698" rx="13.3095398" ry="2.59698338"></ellipse> <ellipse id="hole1-copy" transform="translate(115.869701, 58.188060) rotate(24.000000) translate(-115.869701, -58.188060) " cx="115.869701" cy="58.18806" rx="13.3095398" ry="2.59698338"></ellipse> </g> <g id="holes3" transform="translate(377.500000, 346.500000) scale(-1, 1) rotate(-31.000000) translate(-377.500000, -346.500000) translate(323.000000, 304.000000)" fill="#E7CFB0"> <ellipse id="hole5" transform="translate(21.132772, 37.957910) rotate(24.000000) translate(-21.132772, -37.957910) " cx="21.1327725" cy="37.9579102" rx="16.4301471" ry="3.20754717"></ellipse> <ellipse id="hole5-copy" transform="translate(68.262145, 52.451284) rotate(24.000000) translate(-68.262145, -52.451284) " cx="68.2621445" cy="52.4512844" rx="16.4301471" ry="3.20754717"></ellipse> <ellipse id="hole4" transform="translate(25.002045, 49.243737) rotate(24.000000) translate(-25.002045, -49.243737) " cx="25.002045" cy="49.2437373" rx="12.4214752" ry="2.4249611"></ellipse> <ellipse id="hole4-copy" transform="translate(72.131417, 63.737111) rotate(24.000000) translate(-72.131417, -63.737111) " cx="72.131417" cy="63.7371115" rx="12.4214752" ry="2.4249611"></ellipse> <ellipse id="hole3" transform="translate(49.291789, 50.561236) rotate(24.000000) translate(-49.291789, -50.561236) " cx="49.2917889" cy="50.561236" rx="11.9299794" ry="2.32900968"></ellipse> <ellipse id="hole3-copy" transform="translate(96.421161, 65.054610) rotate(24.000000) translate(-96.421161, -65.054610) " cx="96.4211609" cy="65.0546102" rx="11.9299794" ry="2.32900968"></ellipse> <ellipse id="hole2" transform="translate(41.369733, 63.710998) rotate(24.000000) translate(-41.369733, -63.710998) " cx="41.3697327" cy="63.7109978" rx="10.5369856" ry="2.05706488"></ellipse> <ellipse id="hole2-copy" transform="translate(88.499105, 78.204372) rotate(24.000000) translate(-88.499105, -78.204372) " cx="88.4991047" cy="78.2043721" rx="10.5369856" ry="2.05706488"></ellipse> <ellipse id="hole1" transform="translate(50.545609, 60.232900) rotate(24.000000) translate(-50.545609, -60.232900) " cx="50.5456088" cy="60.2329003" rx="10.6672047" ry="2.08248667"></ellipse> <ellipse id="hole1-copy" transform="translate(97.674981, 74.726275) rotate(24.000000) translate(-97.674981, -74.726275) " cx="97.6749809" cy="74.7262745" rx="10.6672047" ry="2.08248667"></ellipse> <ellipse id="hole5-copy-3" transform="translate(16.554398, 10.147758) rotate(24.000000) translate(-16.554398, -10.147758) " cx="16.5543981" cy="10.1477577" rx="16.4301471" ry="3.20754717"></ellipse> <ellipse id="hole5-copy-2" transform="translate(63.683770, 24.641132) rotate(24.000000) translate(-63.683770, -24.641132) " cx="63.6837702" cy="24.6411319" rx="16.4301471" ry="3.20754717"></ellipse> <ellipse id="hole4-copy-2" transform="translate(20.423671, 21.433585) rotate(24.000000) translate(-20.423671, -21.433585) " cx="20.4236706" cy="21.4335847" rx="12.4214752" ry="2.4249611"></ellipse> <ellipse id="hole4-copy-3" transform="translate(67.553043, 35.926959) rotate(24.000000) translate(-67.553043, -35.926959) " cx="67.5530427" cy="35.926959" rx="12.4214752" ry="2.4249611"></ellipse> <ellipse id="hole3-copy-2" transform="translate(44.713415, 22.751083) rotate(24.000000) translate(-44.713415, -22.751083) " cx="44.7134145" cy="22.7510834" rx="11.9299794" ry="2.32900968"></ellipse> <ellipse id="hole3-copy-3" transform="translate(91.842787, 37.244458) rotate(24.000000) translate(-91.842787, -37.244458) " cx="91.8427866" cy="37.2444577" rx="11.9299794" ry="2.32900968"></ellipse> <ellipse id="hole2-copy-2" transform="translate(36.791358, 35.900845) rotate(24.000000) translate(-36.791358, -35.900845) " cx="36.7913583" cy="35.9008453" rx="10.5369856" ry="2.05706488"></ellipse> <ellipse id="hole2-copy-3" transform="translate(83.920730, 50.394220) rotate(24.000000) translate(-83.920730, -50.394220) " cx="83.9207304" cy="50.3942195" rx="10.5369856" ry="2.05706488"></ellipse> <ellipse id="hole1-copy-2" transform="translate(45.967234, 32.422748) rotate(24.000000) translate(-45.967234, -32.422748) " cx="45.9672345" cy="32.4227477" rx="10.6672047" ry="2.08248667"></ellipse> <ellipse id="hole1-copy-3" transform="translate(93.096607, 46.916122) rotate(24.000000) translate(-93.096607, -46.916122) " cx="93.0966065" cy="46.916122" rx="10.6672047" ry="2.08248667"></ellipse> </g> </g>'
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
          name: 'ללא תוספות',
          svg: ''
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
          name: 'ללא ציפוי',
          svg: ''
        },
        whiteChocolateGanache: {
          name: 'גנש שוקולד לבן',
          svg: '<g id="cover-white-chocolate-ganache" transform="translate(0.000000, 1.000000)"> <path d="M745.831874,318.869939 L0.59324361,224.317753 L0.59324361,412.364704 L15.2078373,414.205287 L15.2078371,245.454521 L745.831891,336.705441 L745.831874,318.869939 Z" id="back" fill="#FDE7CA"></path> <path d="M0.591799853,224.956413 C0.591799853,227.956413 8.09394837,152.261895 75.6494217,82.5006722 C143.204895,12.7394494 227.952606,0.810783396 227.952606,0.810783396 L746.000003,318.999992 L0.591799853,224.956413 Z" id="top" fill="#F4DDC0"></path> </g>'
        },
        brownGanash: {
          name: 'גנש חום'
        }
      }
    }
  };

}).call(this);
