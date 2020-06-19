'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PRICE_MIN_VALUE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var adInputs = adForm.querySelectorAll('input');
  var adSelects = adForm.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');

  var disableElements = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].setAttribute('disabled', 'disabled');
    }
  };

  var activateElements = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].removeAttribute('disabled');
    }
  };

  var disableFields = function () {
    disableElements(adFieldsets);
    disableElements(adInputs);
    disableElements(adSelects);
    disableElements(mapFilters);
  };

  var activateFields = function () {
    activateElements(adFieldsets);
    activateElements(adInputs);
    activateElements(adSelects);
    activateElements(mapFilters);
  };

  var address = document.querySelector('#address');

  var setCoordinates = function (shiftY) {
    var x = Math.round(mapPinMain.offsetLeft - PIN_MAIN_WIDTH / 2);
    var y = mapPinMain.offsetTop - shiftY;
    address.value = x + ', ' + y;
    return address.value;
  };

  var noticeBlock = document.querySelector('.notice');
  var roomsSelect = noticeBlock.querySelector('#room_number');
  var guestsSelect = noticeBlock.querySelector('#capacity');
  var adFormTitleInput = noticeBlock.querySelector('#title');

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

  roomsSelect.addEventListener('change', roomsInputHandler);

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


  var adFormPriceInput = noticeBlock.querySelector('#price');

  var priceInputHandler = function () {
    var price = adFormPriceInput.value;

    if (adFormPriceInput.validity.badInput) {
      adFormPriceInput.setCustomValidity('Пожалуйста, укажите числовое значение');
    } else if (price > 1000000) {
      adFormPriceInput.setCustomValidity('Максимальное значение не может превышать 1000000');
    } else if (adFormPriceInput.validity.rangeUnderflow) {
      adFormPriceInput.setCustomValidity('Минимальная цена на этот тип жилья составляет ' + adFormPriceInput.min + 'руб.');
    } else {
      adFormPriceInput.setCustomValidity('');
    }
  };

  var adFormTypeInput = noticeBlock.querySelector('#type');

  var typeInputHandler = function () {
    adFormPriceInput.min = PRICE_MIN_VALUE[adFormTypeInput.value];
    adFormPriceInput.placeholder = adFormPriceInput.min;
  };

  adFormTypeInput.addEventListener('input', typeInputHandler);
  adFormPriceInput.addEventListener('input', priceInputHandler);

  var timeIn = noticeBlock.querySelector('#timein');
  var timeOut = noticeBlock.querySelector('#timeout');
  var timefieldset = noticeBlock.querySelector('.ad-form__element--time');

  var timeSyncHandler = function (evt) {
    if (evt.target === timeIn) {
      timeOut.value = timeIn.value;
    } else {
      timeIn.value = timeOut.value;
    }
  };
  timefieldset.addEventListener('change', timeSyncHandler);

  address.setAttribute('readonly', 'readonly');

  window.form = {
    setCoordinates: setCoordinates,
    disableFields: disableFields,
    activateFields: activateFields,
  };
})();