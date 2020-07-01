'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking1/data';
  var StatusCode = {
    OK: 200
  };

  var errorPopup = document.querySelector('.net__error__message');

  function onError(errorMessage) {
    errorPopup.textContent = errorMessage;
    errorPopup.classList.remove('hidden');

    errorPopup.addEventListener('click', function () {
      errorPopup.classList.add('hidden');
    });
  }

  window.backend = {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL_LOAD);

      xhr.addEventListener('load', function () {
        try {
          if (xhr.status === StatusCode.OK) {
            onLoad(xhr.response);
          } else {
            throw new Error(xhr.statusText);
          }
        } catch (e) {
          onError('Произошла ошибка: ' + e);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения!');
      });

      xhr.timeout = 3000;

      xhr.addEventListener('timeout', function () {
        onError('Запрос выполняется слишком долго!');
      });


      xhr.send();


    },
  };

})();
