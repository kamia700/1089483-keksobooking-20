'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var priceRange = {
    ANY: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGHT: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var getHouisingType = function (value) {
    return housingType.value === 'any' ? true : value.offer.type === housingType.value;
  };

  var getPriceRange = function (item) {
    switch (housingPrice.value) {
      case priceRange.LOW: return item.offer.price <= priceRange.MIN;
      case priceRange.MIDDLE:
        return item.offer.price >= priceRange.MIN && item.offer.price <= priceRange.MAX;
      case priceRange.HIGHT: return item.offer.price >= priceRange.MAX;
      default: return true;
    }
  };

  var getHouisingRooms = function (item) {
    return (housingRooms.value === 'any') ? true : (item.offer.rooms === (parseInt(housingRooms.value, 10)));
  };

  var getHouisingGuests = function (item) {
    return (housingGuests.value === 'any') ? true : (item.offer.guests === (parseInt(housingGuests.value, 10)));
  };

  var getHouisingFeatures = function (item) {
    var checkedFeatures = Array.from(housingFeatures.querySelectorAll('input:checked'));
    var featuresArray = checkedFeatures.map(function (it) {
      return it.value;
    });
    return featuresArray.every(function (feature) {
      return item.offer.features.includes(feature);
    });
  };

  var allFilters = function (data) {
    return data.filter(function (it) {
      return getHouisingType(it) &&
            getPriceRange(it) &&
            getHouisingRooms(it) &&
            getHouisingGuests(it) &&
            getHouisingFeatures(it);
    }).slice(0, 5);
  };

  var resetFilter = function () {
    var filterItems = mapFilters.querySelectorAll('select');
    filterItems.forEach(function (it) {
      it.value = 'any';
    });

    var filterFeatures = mapFilters.querySelectorAll('input');
    filterFeatures.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var filterChangeHandler = window.debounce.set(function () {
    window.pin.remove();
    window.card.close();

    var filtration = allFilters(window.offersArray);
    window.pin.add(filtration);
  });

  mapFilters.addEventListener('change', filterChangeHandler);


  window.filter = {
    housingType: housingType,
    reset: resetFilter,
    allFilters: allFilters
  };

})();
