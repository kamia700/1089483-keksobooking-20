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

  var setPinMainDefoltCoords = function () {
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
      window.card.renderCard(ads);
    });
    return pinElement;
  };

  var addPins = function (offers) {
    // var takeNumber = offers.length > window.data.ELEMENTS_NUMBER ? window.data.ELEMENTS_NUMBER : offers.length;
    // for (var i = 0; i < takeNumber; i++) {
    //   pinMap.appendChild(renderPin(offers[i]));
    // }
    var multipleRandomElements = window.data.getOffers(offers);
    for (var i = 0; i < multipleRandomElements.length; i++) {
      if (offers[i].offer) {
        pinMap.appendChild(renderPin(offers[i]));
      }
    }
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      pins[j].remove();
    }
  };

  window.pin = {
    addPins: addPins,
    setPinMainDefoltCoords: setPinMainDefoltCoords,
    removePins: removePins
  };
})();
