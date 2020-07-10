'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var setDebounce = function (fc) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fc.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    setDebounce: setDebounce
  };

})();
