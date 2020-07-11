'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };

  var map = document.querySelector('.map');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorPopupText = errorPopup.querySelector('.error__message');
  var errorPopupButton = errorPopup.querySelector('.error__button');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;

  function onError(errorMessage) {
    errorPopupText.textContent = errorMessage;
    map.appendChild(errorPopup);

    errorPopupButton.addEventListener('click', function () {
      errorPopup.remove();
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
            window.form.enableFormElements(mapFilterFormFields);
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
