'use strict';

(function () {
  var PIN_SHIFT_X = 25;
  var PIN_SHIFT_Y = 35;

  var mainPinDefault = {
    x: 570,
    y: 375
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var pinMap = document.querySelector('.map__pins');

  var setMainPinDefoltCoords = function () {
    mapPinMain.style.left = mainPinDefault.x + 'px';
    mapPinMain.style.top = mainPinDefault.y + 'px';
  };

  var renderPin = function (ads) {
    var pinElement = similarPinTemplate.cloneNode(true);

    var pinX = ads.location.x - PIN_SHIFT_X;
    var pinY = ads.location.y - PIN_SHIFT_Y;
    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';


    var pinImg = pinElement.querySelector('img');
    pinImg.src = ads.author.avatar;
    pinImg.alt = ads.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.render(ads);
    });
    return pinElement;
  };

  var addPins = function (offers) {
    offers.forEach(function (pin) {
      pinMap.appendChild(renderPin(pin));
    });
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    add: addPins,
    setMainPinDefoltCoords: setMainPinDefoltCoords,
    remove: removePins
  };
})();
