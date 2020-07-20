'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorPopupText = errorPopup.querySelector('.error__message');
  var errorPopupButton = errorPopup.querySelector('.error__button');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function OnClickClose(evt) {
    var elem = evt.target;
    elem.remove();
  }

  function onError(errorMessage) {
    errorPopupText.textContent = errorMessage;
    map.appendChild(errorPopup);

    errorPopupButton.addEventListener('click', function () {
      errorPopup.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        errorPopup.remove();
      }
    });

    errorPopup.addEventListener('click', OnClickClose);

  }

  function onSuccess() {
    var successPopup = successTemplate.cloneNode(true);
    main.appendChild(successPopup);

    window.removePins();
    mainPin.style.left = window.map.mainPinDefaultX;
    mainPin.style.top = window.map.mainPinDefaultY;
    window.form.resetForm();
    window.init();

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        successPopup.remove();
      }
    });

    successPopup.addEventListener('click', OnClickClose);
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

    save: function (data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', URL_SAVE);

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Произошла ошибка: ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка при отправке данных');
      });

      xhr.send(data);
    },

  };

})();
