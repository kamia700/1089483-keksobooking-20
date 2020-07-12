'use strict';

(function () {
  var BORDER_ERROR_RED = '3px solid red';

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
  var address = document.querySelector('#address');
  var noticeBlock = document.querySelector('.notice');
  var roomsSelect = noticeBlock.querySelector('#room_number');
  var guestsSelect = noticeBlock.querySelector('#capacity');
  var adFormTitleInput = noticeBlock.querySelector('#title');
  var adFormPriceInput = noticeBlock.querySelector('#price');
  var adFormTypeInput = noticeBlock.querySelector('#type');
  var timeIn = noticeBlock.querySelector('#timein');
  var timeOut = noticeBlock.querySelector('#timeout');
  var timefieldset = noticeBlock.querySelector('.ad-form__element--time');

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

  var setCoordinates = function (x, y) {
    address.setAttribute('value', x + ', ' + y);
    return address.value;
  };

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

  var typeInputHandler = function () {
    adFormPriceInput.min = PRICE_MIN_VALUE[adFormTypeInput.value];
    adFormPriceInput.placeholder = adFormPriceInput.min;
  };

  var timeSyncHandler = function (evt) {
    if (evt.target === timeIn) {
      timeOut.value = timeIn.value;
    } else {
      timeIn.value = timeOut.value;
    }
  };

  var changeBorder = function (input, borderColor) {
    input.style.border = borderColor;
  };

  adFormTitleInput.addEventListener('invalid', function () {
    changeBorder(adFormTitleInput, BORDER_ERROR_RED);
  });
  adFormPriceInput.addEventListener('invalid', function () {
    changeBorder(adFormPriceInput, BORDER_ERROR_RED);
  });

  roomsSelect.addEventListener('change', roomsInputHandler);

  adFormTitleInput.addEventListener('input', titleInputHandler);
  adFormTypeInput.addEventListener('input', typeInputHandler);
  adFormPriceInput.addEventListener('input', priceInputHandler);
  timefieldset.addEventListener('change', timeSyncHandler);

  address.setAttribute('readonly', 'readonly');

  window.form = {
    setCoordinates: setCoordinates,
    disableFields: disableFields,
    activateFields: activateFields
  };
})();
