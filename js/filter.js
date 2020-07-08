'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');


  var getHouisingType = function (value) {
    return housingType.value === 'any' ? true : value.offer.type === housingType.value;
  };

  var allFilters = function (data) {
    return data.filter(function (it) {
      return getHouisingType(it);
    }).slice(0, 5);
  };

  var typeChangeHandler = function () {
    window.pin.removePins();
    window.card.closeCard();

    window.pin.addPins(allFilters(window.offersArray));
  };

  mapFilters.addEventListener('change', typeChangeHandler);


  window.filter = {
    housingType: housingType,
    // updateOffers: updateOffers,
    // successGetHandler: successGetHandler,
    allFilters: allFilters
  };

})();
