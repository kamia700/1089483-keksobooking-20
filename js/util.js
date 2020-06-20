'use strict';

(function () {
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
  };

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === 'Enter') {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      action();
    }
  };

  var isLeftButtonEvent = function (evt, action) {
    if (evt.button === 0) {
      action();
    }
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomIntInclusive: getRandomIntInclusive,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isLeftButtonEvent: isLeftButtonEvent,
  };
})();
