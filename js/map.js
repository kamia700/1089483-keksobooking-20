'use strict';

(function () {
  var MAP_TOP_Y = 130;
  var MAP_BOTTOM_Y = 630;

  var map = document.querySelector('.map');

  var activateMap = function (mapblock) {
    mapblock.classList.remove('map--faded');
  };


  window.map = {
    block: map,
    TOP_Y: MAP_TOP_Y,
    BOTTOM_Y: MAP_BOTTOM_Y,
    activate: activateMap
  };
})();
