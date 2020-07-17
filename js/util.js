'use strict';

(function () {
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
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isLeftButtonEvent: isLeftButtonEvent
  };
})();
