'use strict';

(function () {
  var ELEMENTS_NUMBER = 5;

  var Y_TOP = 130;
  var Y_BOTTOM = 630;

  var TYPE = ['palace', 'flat', 'house', 'bungalo'];

  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var ROOMS = ['1', '2', '3 ', '100'];
  var GUESTS = ['1', '2', '3 '];


  var getRandomFeatures = function (features) {
    var rendomFeatureNumbers = window.util.getRandomIntInclusive(1, FEATURES.length);
    var lengthOfArray = features.length;

    while (lengthOfArray) {
      var i = Math.floor(Math.random() * lengthOfArray--);
      var t = features[lengthOfArray];
      features[lengthOfArray] = features[i];
      features[i] = t;
    }
    return features.slice(0, rendomFeatureNumbers);
  };

  var pinMap = document.querySelector('.map__pins');
  var pinMapWidth = pinMap.offsetWidth;

  var createAds = function (count) {
    var locationX = window.util.getRandomIntInclusive(0, pinMapWidth);
    var locationY = window.util.getRandomIntInclusive(Y_TOP, Y_BOTTOM);
    var ads = {
      author: {
        avatar: 'img/avatars/user0' + (count + 1) + '.png'
      },
      offer: {
        title: 'Просторная уютная квартира',
        address: locationX + ', ' + locationY,
        price: 2000,
        type: window.util.getRandomElement(TYPE),
        rooms: window.util.getRandomElement(ROOMS),
        guests: window.util.getRandomElement(GUESTS),
        checkin: window.util.getRandomElement(CHECKIN),
        checkout: window.util.getRandomElement(CHECKOUT),
        features: getRandomFeatures(FEATURES),
        description: 'строка с описанием',
        photos: PHOTOS},
      location: {
        x: locationX,
        y: locationY
      }
    };
    return ads;
  };

  var getOffers = function (data) {
    var takeNumber = data.length > ELEMENTS_NUMBER ? ELEMENTS_NUMBER : data.length;
    var offers = window.util.getMultipleRandomElements(data, takeNumber);
    return offers;
  };

  window.data = {
    getOffers: getOffers,
    createAds: createAds,
    ELEMENTS_NUMBER: ELEMENTS_NUMBER
  };
})();
