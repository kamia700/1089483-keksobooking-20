'use strict';
(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 85;
  var PIN_MAIN_SHIFT_Y = Math.round(PIN_MAIN_HEIGHT / 2);

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var formResetButton = adForm.querySelector('.ad-form__reset');

  var activeMode = true;


  var getCoordinateX = function (pin) {
    return Math.round(pin.offsetLeft + PIN_MAIN_WIDTH / 2);
  };

  var getCoordinateY = function (pin) {
    if (activeMode) {
      return pin.offsetTop + PIN_MAIN_HEIGHT;
    } else {
      return pin.offsetTop + PIN_MAIN_SHIFT_Y;
    }
  };

  var successGetHandler = function (data) {
    window.offersArray = data;
    window.pin.add(window.filter.allFilters(window.offersArray));
  };

  var errorGetHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var deactivatePage = function () {
    activeMode = false;
    window.form.setCoordinates(getCoordinateX(mapPinMain), getCoordinateY(mapPinMain));
    window.map.block.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.disableFields();
    window.pin.remove();
    window.card.close();
    window.upload.removeImages();
    mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
  };

  var setActivedPageMode = function () {
    activeMode = true;
    adForm.classList.remove('ad-form--disabled');
    window.form.activateFields();
    mapFilters.removeAttribute('disabled');
    window.map.activate(window.map.block);
    window.form.setCoordinates(getCoordinateX(mapPinMain), getCoordinateY(mapPinMain));
    window.backend.load(successGetHandler, errorGetHandler);
  };

  var mapPinMainMousedownHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, setActivedPageMode);
    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
  };

  var mapPinMainKeydownHandler = function (evt) {
    window.util.isEnterEvent(evt, setActivedPageMode);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
  };

  var pageReset = function () {
    adForm.reset();
    window.pin.setMainPinDefoltCoords();
    window.form.setCoordinates(getCoordinateX(mapPinMain), getCoordinateY(mapPinMain));
    window.upload.removeImages();
    window.filter.reset();
    deactivatePage();
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  formResetButton.addEventListener('click', pageReset);
  formResetButton.addEventListener('keydown', pageReset);

  deactivatePage();


  window.mode = {
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    activate: activeMode,

    getCoordinateY: getCoordinateY,
    getCoordinateX: getCoordinateX,

    deactivatePage: deactivatePage,
    pageReset: pageReset
  };
})();
