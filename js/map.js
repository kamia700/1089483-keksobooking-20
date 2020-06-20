'use strict';

(function () {
  var map = document.querySelector('.map');

  var activateMap = function (mapblock) {
    mapblock.classList.remove('map--faded');
    window.pin.addPins(window.data.offers);
  };


  window.map = {
    activateMap: activateMap,
    map: map,
  };
})();
