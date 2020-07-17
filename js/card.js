'use strict';

(function () {
  var WIDTH_PHOTO_CARD = 45;
  var HEIGHT_PHOTO_CARD = 40;
  var PHOTO_ALT_CARD = 'Фотография жилья';

  var housingType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var filtersContainer = window.map.block.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var renderCard = function (ads) {
    closeCard();
    window.map.block.insertBefore(getCard(ads), filtersContainer);
  };

  var renderPhotos = function (container, photos) {
    container.innerHTML = '';

    photos.forEach(function (item) {
      var photoElement = document.createElement('img');
      photoElement.src = item;
      photoElement.classList.add('popup__photo');
      photoElement.width = WIDTH_PHOTO_CARD;
      photoElement.height = HEIGHT_PHOTO_CARD;
      photoElement.alt = PHOTO_ALT_CARD;

      container.appendChild(photoElement);
    });
  };

  var renderFeatures = function (container, features) {
    container.innerHTML = '';

    features.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + item);

      container.appendChild(featureElement);
    });
  };

  var getCorrectWordFormRooms = function (number) {
    if (number === 1) {
      return 'a';
    }
    return (number >= 2 && number <= 4) ? 'ы' : '';
  };

  var getCorrectWordFormGuest = function (number) {
    return number === 1 ? 'я' : 'ей';
  };

  var generateCorrectText = function (rooms, guests) {
    var endingWordRooms = getCorrectWordFormRooms(rooms);
    var endingWordGuests = getCorrectWordFormGuest(guests);

    var text = rooms + ' комнат' + endingWordRooms + ' для ' + guests + ' гост' + endingWordGuests;

    return text;
  };

  var getCard = function (ads) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var closeButton = cardElement.querySelector('.popup__close');
    var childElements = cardElement.querySelectorAll(':scope > *');

    cardElement.querySelector('.popup__title').textContent = ads.offer.title || 'no value';
    cardElement.querySelector('.popup__text--address').textContent = ads.offer.address || 'no value';
    cardElement.querySelector('.popup__text--price').textContent = ads.offer.price + '₽/ночь' || 'no value';
    cardElement.querySelector('.popup__type').textContent = housingType[ads.offer.type] || 'no value';
    cardElement.querySelector('.popup__text--capacity').textContent = generateCorrectText(ads.offer.rooms, ads.offer.guests) || 'no value';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout || 'no value';
    cardElement.querySelector('.popup__description').textContent = ads.offer.description;

    cardElement.querySelector('.popup__avatar').src = ads.author.avatar;

    renderFeatures(cardFeatures, ads.offer.features);
    renderPhotos(cardPhotos, ads.offer.photos);

    childElements.forEach(function (element) {
      if (element.textContent === 'no value') {
        element.classList.add('visually-hidden');
      }
    });

    closeButton.addEventListener('click', popupCloseMousedownHandler);
    document.addEventListener('keydown', popupCloseEscHandler);

    return cardElement;
  };

  var closeCard = function () {
    var mapCardPopup = document.querySelector('.map__card');
    if (mapCardPopup) {
      mapCardPopup.remove();
    }
  };

  var popupCloseMousedownHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, closeCard);

    document.removeEventListener('keydown', popupCloseMousedownHandler);
  };

  var popupCloseEscHandler = function (evt) {
    window.util.isEscEvent(evt, closeCard);

    document.removeEventListener('keydown', popupCloseEscHandler);
  };


  window.card = {
    popupCloseEscHandler: popupCloseEscHandler,
    render: renderCard,
    close: closeCard
  };
})();
