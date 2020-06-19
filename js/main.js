'use strict';
(function () {
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_SHIFT_Y = Math.round(PIN_MAIN_HEIGHT / 2);

  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');


  var setDisabledModePage = function () {
    window.form.setCoordinates(PIN_MAIN_SHIFT_Y);
    window.map.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.disableFields();
    mapFilters.setAttribute('disabled', 'disabled');
  };
  setDisabledModePage();


  var setActivedModePage = function () {
    adForm.classList.remove('ad-form--disabled');
    window.form.activateFields();
    mapFilters.removeAttribute('disabled');
    window.map.activateMap(window.map.map);
    window.form.setCoordinates(PIN_MAIN_HEIGHT);
  };


  var mapPinMainMousedownHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, setActivedModePage);
    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainMousedownHandler);
  };

  var mapPinMainKeydownHandler = function (evt) {
    window.util.isEnterEvent(evt, setActivedModePage);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);
})();

