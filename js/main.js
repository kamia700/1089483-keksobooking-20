'use strict';

var ELEMENTS_NUMBER = 8;

var Y_TOP = 130;
var Y_BOTTOM = 630;

var PIN_SHIFT_X = 25;
var PIN_SHIFT_Y = 35;
var PIN_HEIGHT = 70;

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

  while (lengthOfArray) {
    var i = Math.floor(Math.random() * lengthOfArray--);
    var t = features[lengthOfArray];
    features[lengthOfArray] = features[i];
    features[i] = t;
  }
  return features.slice(0, rendomFeatureNumbers);
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
    if (offers[j].offer) {
      fragment.appendChild(renderPin(offers[j]));
    }
  }
  pinMap.appendChild(fragment);
};

// var offers = getOffers();

// document.querySelector('.map').classList.remove('map--faded');
// addPins(offers);


// var cardTemplate = document.querySelector('#card')
// .content
// .querySelector('.map__card');

// var housingTypes = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало',
// };

var map = document.querySelector('.map');
// var filtersContainer = map.querySelector('.map__filters-container');

// var renderPhotos = function (container, photos) {
//   container.innerHTML = '';

//   for (var i = 0; i < photos.length; i++) {
//     var photoElement = document.createElement('img');
//     photoElement.src = photos[i];
//     photoElement.classList.add('popup__photo');
//     photoElement.width = WIDTH_PHOTO_CARD;
//     photoElement.height = HEIGHT_PHOTO_CARD;
//     photoElement.alt = PHOTO_ALT_CARD;

//     container.appendChild(photoElement);
//   }
// };

// var renderFeatures = function (container, features) {
//   container.innerHTML = '';

//   for (var i = 0; i < features.length; i++) {
//     var featureElement = document.createElement('li');

//     featureElement.classList.add('popup__feature');
//     featureElement.classList.add('popup__feature--' + features[i]);

//     container.appendChild(featureElement);
//   }
// };

// var getCorrectWordFormRooms = function (number) {
//   if (number === '1') {
//     return 'a';
//   }
//   return (number >= 2 && number <= 4) ? 'ы' : '';
// };

// var getCorrectWordFormGuest = function (number) {
//   return number === '1' ? 'я' : 'ей';
// };

// var generateCorrectText = function (rooms, guests) {
//   var endingWordRooms = getCorrectWordFormRooms(rooms);
//   var endingWordGuests = getCorrectWordFormGuest(guests);

//   var text = rooms + ' комнат' + endingWordRooms + ' для ' + guests + ' гост' + endingWordGuests;

//   return text;
// };

// var renderCard = function (ads) {
//   var cardElement = cardTemplate.cloneNode(true);

//   cardElement.querySelector('.popup__title').textContent = ads.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = ads.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = housingTypes[ads.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = generateCorrectText(ads.offer.rooms, ads.offer.guests);
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
//   cardElement.querySelector('.popup__description').textContent = ads.offer.description;


//   var cardFeatures = cardElement.querySelector('.popup__features');
//   cardFeatures.innerHTML = '';

//   renderFeatures(cardFeatures, ads.offer.features);

//   var cardPhotos = cardElement.querySelector('.popup__photos');
//   renderPhotos(cardPhotos, ads.offer.photos);

//   cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

//   return cardElement;
// };

// map.insertBefore(renderCard(offers[7]), filtersContainer);

// дз 4
var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var adInputs = adForm.querySelectorAll('input');
var adSelects = adForm.querySelectorAll('select');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');

var activateMap = function (mapblock) {
  mapblock.classList.remove('map--faded');
  var offers = getOffers();
  addPins(offers);
};

var disableElement = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].setAttribute('disabled', 'disabled');
  }
};

var activateElement = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].removeAttribute('disabled');
  }
};

// добавляет атрибут disable необходимым полям
var disableFields = function () {
  disableElement(adFieldsets);
  disableElement(adInputs);
  disableElement(adSelects);
};

var activateFields = function () {
  activateElement(adFieldsets);
  activateElement(adInputs);
  activateElement(adSelects);
};

// Заполнение поля адреса.
var address = document.querySelector('#address');
var getCoordinates = function (shiftX, shiftY) {
  var x = mapPinMain.offsetLeft - shiftX;
  var y = mapPinMain.offsetTop - shiftY;

  return x + ', ' + y;
};

// неактивное состояние страницы
var setDisabledModePage = function () {
  address.value = getCoordinates(PIN_SHIFT_X, PIN_SHIFT_Y);
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  disableFields();
  mapFilters.setAttribute('disabled', 'disabled');
};
setDisabledModePage();

// активное состояние страницы
var setActivedModePage = function () {
  adForm.classList.remove('ad-form--disabled');
  activateFields();
  mapFilters.removeAttribute('disabled');
  activateMap(map);
};


// Активация страницы
var mapPinMainMousedownHandler = function (evt) {
  if (evt.button === 0) {
    setActivedModePage();

    address.value = getCoordinates(PIN_SHIFT_X, PIN_HEIGHT);
  }
};

mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
mapPinMain.addEventListener('mousedown', mapPinMainKeydownHandler);
var mapPinMainKeydownHandler = function (evt) {
  if (evt.key === 'Enter') {
    setActivedModePage();
  }
  address.value = getCoordinates(PIN_SHIFT_X, PIN_HEIGHT);
};

// Валидация
// сценарий установки соответствия количества гостей с количеством комнат
var noticeBlock = document.querySelector('.notice');
var roomsSelect = noticeBlock.querySelector('#room_number');
var guestsSelect = noticeBlock.querySelector('#capacity');


var roomsInputHandler = function () {
  if (roomsSelect.value !== '100' && guestsSelect.value === '0') {
    roomsSelect.setCustomValidity('Пожалуйста, укажите количество гостей');
  } else if (roomsSelect.value !== '100' && roomsSelect.value < guestsSelect.value) {
    roomsSelect.setCustomValidity('Количество комнат не может быть меньше количества гостей');
  } else if (roomsSelect.value === '100' && guestsSelect.value > '0') {
    roomsSelect.setCustomValidity('Размещение гостей невозможно для выбранного количества комнат');
  } else {
    roomsSelect.setCustomValidity('');
  }
};

roomsSelect.addEventListener('click', roomsInputHandler);

// Заголовок объявления

var adFormTitleInput = noticeBlock.querySelector('#title');

var titleInputHandler = function () {
  if (adFormTitleInput.validity.tooShort) {
    adFormTitleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30-ти символов');
  } else if (adFormTitleInput.validity.tooLong) {
    adFormTitleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (adFormTitleInput.validity.valueMissing) {
    adFormTitleInput.setCustomValidity('Обязательное поле');
  } else {
    adFormTitleInput.setCustomValidity('');
  }
};
adFormTitleInput.addEventListener('input', titleInputHandler);


// Цена за ночь
var adFormPriceInput = noticeBlock.querySelector('#price');

var priceInputHandler = function () {
  var number = adFormPriceInput.value;
  if (number > 1000000) {
    adFormPriceInput.setCustomValidity('Максимальное значение не может превышать 1000000');
  } else {
    adFormPriceInput.setCustomValidity('');
  }
};
adFormPriceInput.addEventListener('input', priceInputHandler);
