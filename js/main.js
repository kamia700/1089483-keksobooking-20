'use strict';
(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 85;
  var PIN_MAIN_SHIFT_Y = Math.round(PIN_MAIN_HEIGHT / 2);

  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');

  var getCoordinateX = function () {
    return Math.round(mapPinMain.offsetLeft + PIN_MAIN_WIDTH / 2);
  };

  var getCoordinateY = function () {
    if (activeMode) {
      return mapPinMain.offsetTop + PIN_MAIN_HEIGHT;
    } else {
      return mapPinMain.offsetTop + PIN_MAIN_SHIFT_Y;
    }
  };

  var activeMode = true;

  var setDisabledModePage = function () {
    activeMode = false;
    window.form.setCoordinates(getCoordinateX(), getCoordinateY());
    window.map.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.disableFields();
    mapFilters.setAttribute('disabled', 'disabled');
  };
  setDisabledModePage();


  var setActivedModePage = function () {
    activeMode = true;
    adForm.classList.remove('ad-form--disabled');
    window.form.activateFields();
    mapFilters.removeAttribute('disabled');
    window.map.activateMap(window.map.map);
    window.form.setCoordinates(getCoordinateX(), getCoordinateY());
  };


  var mapPinMainMousedownHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, setActivedModePage);

    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
  };

  var mapPinMainKeydownHandler = function (evt) {
    window.util.isEnterEvent(evt, setActivedModePage);

    mapPinMain.removeEventListener('keydown', mapPinMainMousedownHandler);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  var limits = {
    top: window.map.MAP_TOP_Y,
    bottom: window.map.MAP_BOTTOM_Y,
    left: 0 - Math.round(mapPinMain.offsetWidth / 2),
    right: window.map.map.offsetWidth - Math.round(mapPinMain.offsetWidth / 2),
  };

  var mouseDownHandler = function (evt) {

    var pinCoords = {
      x: getCoordinateX(),
      y: getCoordinateY()
    };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      pinCoords.x = (pinCoords.x > limits.right) ? limits.right : pinCoords.x;
      pinCoords.x = (pinCoords.x < limits.left) ? limits.left : pinCoords.x;

      pinCoords.y = (pinCoords.y < limits.top) ? limits.top : pinCoords.y;
      pinCoords.y = (pinCoords.y > limits.bottom) ? limits.bottom : pinCoords.y;

      mapPinMain.style.top = pinCoords.y + 'px';
      mapPinMain.style.left = pinCoords.x + 'px';

      window.form.setCoordinates(pinCoords.x, pinCoords.y);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };

  mapPinMain.addEventListener('mousedown', mouseDownHandler);

  window.main = {
    mapFilters: mapFilters,
    mapPinMain: mapPinMain,
  };
})();

