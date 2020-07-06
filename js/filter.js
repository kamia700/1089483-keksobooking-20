'use strict';

(function () {
  var offersArray = [];
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');


  var updateOffers = function (value) {
    window.pin.removePins();
    var filteredOffers;
    if (value === 'any') {
      filteredOffers = offersArray;

    } else {
      filteredOffers = offersArray.filter(function (it) {
        return it.offer.type === value;
      });
    }
    // var offers = window.data.getOffers(filteredOffers);
    // window.pin.addPins(offers);

    window.pin.addPins(filteredOffers);
  };


  var typeChangeHandler = function () {
    window.card.closeCard();
    updateOffers(housingType.value);
  };

  housingType.addEventListener('change', typeChangeHandler);

  var successGetHandler = function (data) {
    offersArray = data;
    updateOffers(housingType.value);
  };

  window.filter = {
    updateOffers: updateOffers,
    housingType: housingType,

    successGetHandler: successGetHandler,
    offersArray: offersArray
  };

})();
