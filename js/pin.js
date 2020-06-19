'use strict';

(function () {
  var PIN_SHIFT_X = 25;
  var PIN_SHIFT_Y = 35;

  var similarPinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

  var pinMap = document.querySelector('.map__pins');

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

      document.addEventListener('keydown', window.card.popupCloseEscHandler);
    });
    return pinElement;
  };

  var addPins = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < offers.length; j++) {
      if (offers[j].offer) {
        fragment.appendChild(renderPin(offers[j]));
      }
    }
    pinMap.appendChild(fragment);
  };

  window.pin = {
    addPins: addPins,
  };
})();
