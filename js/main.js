'use strict';

var ELEMENTS_NUMBER = 8;

var Y_TOP = 130;
var Y_BOTTOM = 630;

var PIN_SHIFT_X = 25;
var PIN_SHIFT_Y = 35;

var TYPE = ['palace', 'flat', 'house ', 'bungalo'];

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking ', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var ROOMS = ['1', '2', '3 ', '100'];
var GUESTS = ['1', '2', '3 '];

var pinMap = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var pinMapWidth = pinMap.offsetWidth;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createAds = function (count) {
  var locationX = getRandomIntInclusive(0, pinMapWidth);
  var locationY = getRandomIntInclusive(Y_TOP, Y_BOTTOM);
  var ads = {
    author: {
      avatar: 'img/avatars/user0' + (count + 1) + '.png'
    },
    offer: {
      title: 'строка, заголовок предложения',
      address: locationX + ', ' + locationY,
      price: 2000,
      type: getRandomElement(TYPE),
      rooms: getRandomElement(ROOMS),
      guests: getRandomElement(GUESTS),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: getRandomElement(FEATURES),
      description: 'строка с описанием',
      photos: PHOTOS},
    location: {
      x: locationX,
      y: locationY
    }
  };
  return ads;
};

var getOffers = function () {
  var offersArr = [];
  for (var i = 0; i < ELEMENTS_NUMBER; i++) {
    offersArr[i] = (createAds(i));
  }
  return offersArr;
};


document.querySelector('.map').classList.remove('map--faded');


var renderPin = function (ads) {
  var pinElement = similarPinTemplate.cloneNode(true);

  var pinX = ads.location.x - PIN_SHIFT_X;
  var pinY = ads.location.y - PIN_SHIFT_Y;
  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

  var pinImg = pinElement.querySelector('img');
  pinImg.src = ads.author.avatar;
  pinImg.alt = ads.offer.title;

  return pinElement;
};

var addPins = function (offers) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < offers.length; j++) {
    fragment.appendChild(renderPin(offers[j]));
  }
  pinMap.appendChild(fragment);
};

var offers = getOffers();
addPins(offers);
