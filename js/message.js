'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainBlock = document.querySelector('main');

  var successText = successTemplate.cloneNode(true);
  var errorText = errorTemplate.cloneNode(true);


  var showMessage = function (result) {
    switch (result) {
      case 'success':
        document.body.appendChild(successText);
        break;
      case 'error':
        mainBlock.appendChild(errorText);
        var errorButton = document.querySelector('.error__button');
        errorButton.addEventListener('click', closeMessage);
        break;
    }
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', closeMessage);
  };

  var closeMessage = function (evt) {
    var error = document.querySelector('.error');
    var success = document.querySelector('.success');

    if (error && (evt.keyCode === 27 || evt.button === 0)) {
      errorText.remove();
      window.mode.resetPage();
      window.mode.setActivedPageMode();
    } else
    if (success && (evt.keyCode === 27 || evt.button === 0)) {
      successText.remove();
      window.mode.resetPage();
    }
    document.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', closeMessage);
  };


  window.message = {
    close: closeMessage,
    show: showMessage
  };
})();
