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

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomFeatures = function (features) {
  var rendomFeatureNumbers = getRandomIntInclusive(1, FEATURES.length);
  var lengthOfArray = features.length;

  // While there remain elements to shuffle…
  while (lengthOfArray) {
    // Pick a remaining element…
    var i = Math.floor(Math.random() * lengthOfArray--);
    // And swap it with the current element.
    var t = features[lengthOfArray];
    features[lengthOfArray] = features[i];
    features[i] = t;
  }
  return features.slice(0, rendomFeatureNumbers);
};
// getRandomFeatures(FEATURES);

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

var getOffers = function () {
  var offersArr = [];
  for (var i = 0; i < ELEMENTS_NUMBER; i++) {
    offersArr[i] = (createAds(i));
  }
  return offersArr;
};

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
    // проверка для п.5.2 ТЗ
    if (offers[j].offer) {
      fragment.appendChild(renderPin(offers[j]))
    }
  }
  pinMap.appendChild(fragment);
};

var offers = getOffers();

document.querySelector('.map').classList.remove('map--faded');
addPins(offers);

// дз 2
var cardTemplate = document.querySelector('#card')
.content
.querySelector('.map__card');

var housingTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

var WIDTH_PHOTO_CARD = 45;
var HEIGHT_PHOTO_CARD = 40;
var PHOTO_ALT_CARD = 'Фотография жилья';

// Вставьте полученный DOM-элемент в блок .map перед блоком .map__filters-container
var map = document.querySelector('.map');
var filtersContainer = map.querySelector('.map__filters-container');

var renderPhotos = function (container, photos) {
  container.innerHTML = '';

  for (var i = 0; i < photos.length; i++) {
    // debugger;
    var photoElement = document.createElement('img');
    photoElement.src = photos[i];
    photoElement.classList.add('popup__photo');
    photoElement.width = WIDTH_PHOTO_CARD;
    photoElement.height = HEIGHT_PHOTO_CARD;
    photoElement.alt = PHOTO_ALT_CARD;

    container.appendChild(photoElement);
  }
};
// или так
// var renderPhotos = function (photos) {
//   var imgPhoto = '';

//   for (var i = 0; i < photos.length; i++) {
//     imgPhoto += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
//   }
//   return imgPhoto;
// };

// тут функция отрабатывает через раз
// выдает ошибку InvalidCharacterError: String contains an invalid character main.js:225

var renderFeatures = function (container, features) {
  container.innerHTML = '';

  for (var i = 0; i < features.length; i++) {
    // debugger;
    var featureElement = document.createElement('li');

    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + features[i]);

    container.appendChild(featureElement);
  }
};


// генерирую DOM-элементы
var renderCard = function (ads) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ads.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ads.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = housingTypes[ads.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ads.offer.rooms + ' комнаты' + ' для ' + ads.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ads.offer.description;
  // cardElement.querySelector('.popup__photos').innerHTML = renderPhotos(ads.offer.photos);


  var cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  // если вывожу текстом, массив генерится в случайном порядке и отображается.
  // с иконками работает через раз
  // cardFeatures.textContent = ads.offer.features;
  renderFeatures(cardFeatures, ads.offer.features);

  var cardPhotos = cardElement.querySelector('.popup__photos');
  renderPhotos(cardPhotos, ads.offer.photos);

  cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

  return cardElement;
};

map.insertBefore(renderCard(offers[0]), filtersContainer);

