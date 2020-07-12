'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');

  var successPostHandler = function () {
    window.message.show('success');
  };

  var errorPostHandler = function () {
    window.message.show('error');
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(adForm), successPostHandler, errorPostHandler);
    evt.preventDefault();
  };

  var limits = {
    top: window.map.TOP_Y - window.mode.PIN_MAIN_HEIGHT,
    bottom: window.map.BOTTOM_Y - window.mode.PIN_MAIN_HEIGHT,
    left: -Math.round(mapPinMain.offsetWidth / 2),
    right: window.map.block.offsetWidth - Math.round(mapPinMain.offsetWidth / 2),
  };

  var mouseDownHandler = function (evt) {
    window.mode.activate = true;
    var pinCoords = {
      x: window.mode.getCoordinateX(mapPinMain),
      y: window.mode.getCoordinateY(mapPinMain)
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

      window.form.setCoordinates(window.mode.getCoordinateX(mapPinMain), window.mode.getCoordinateY(mapPinMain));
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };

  adForm.addEventListener('submit', submitHandler);
  mapPinMain.addEventListener('mousedown', mouseDownHandler);


  window.main = {
    mapFilters: mapFilters,
    mapPinMain: mapPinMain
  };
})();

