'use strict';

(function () {
  var ELEMENTS_NUMBER = 5;

  var getOffers = function (data) {
    var takeNumber = data.length > ELEMENTS_NUMBER ? ELEMENTS_NUMBER : data.length;
    var offers = window.util.getMultipleRandomElements(data, takeNumber);
    return offers;
  };

  window.data = {
    ELEMENTS_NUMBER: ELEMENTS_NUMBER,
    getOffers: getOffers
  };
})();
