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

  var getMultipleRandomElements = function (array, n) {
    var originalArray = array;
    var modifiedArray = [];
    for (var i = 0; i < n; i++) {
      var element = window.util.getRandomElement(originalArray);
      modifiedArray.push(element);
    }

    return modifiedArray;
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomIntInclusive: getRandomIntInclusive,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isLeftButtonEvent: isLeftButtonEvent,
    getMultipleRandomElements: getMultipleRandomElements
  };
})();
