'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var successText = successTemplate.cloneNode(true);
  var errorText = errorTemplate.cloneNode(true);

  var mainBlock = document.querySelector('main');


  var showMessage = function (result) {
    switch (result) {
      case 'success':
        document.body.appendChild(successText);

        break;
      case 'error':
        mainBlock.appendChild(errorText);

        break;
    }
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', closeMessage);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', closeMessage);
  };

  var closeMessage = function (evt) {
    if (successText && evt.keyCode === 27 || evt.button === 0) {
      successText.remove();
      window.mode.pageReset();
      window.mode.setDisabledPageMode();
    } if (errorText && evt.keyCode === 27 || evt.button === 0) {
      errorText.remove();
      window.mode.pageReset();
      window.mode.setDisabledPageMode();
    }
    document.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', closeMessage);
  };


  window.message = {
    closeMessage: closeMessage,
    showMessage: showMessage
  };
})();
