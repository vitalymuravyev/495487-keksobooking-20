'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobook1ing';
  var StatusCode = {
    OK: 200
  };

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function onDestroyPopup(evt) {
    var elem = evt.target;
    elem.remove();
    elem.removeEventListener('click', onDestroyPopup);
  }

  function onError(errorMessage) {
    var errorPopup = errorTemplate.cloneNode(true);
    var errorPopupText = errorPopup.querySelector('.error__message');
    var errorPopupButton = errorPopup.querySelector('.error__button');

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

    errorPopup.addEventListener('click', onDestroyPopup);

  }

  function onSave() {
    var successPopup = successTemplate.cloneNode(true);
    main.appendChild(successPopup);

    window.main.reInit();

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        successPopup.remove();
      }
    });

    successPopup.addEventListener('click', onDestroyPopup);
  }

  function onXhrLoad(xhr, onSuccess) {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError('Произошла ошибка: ' + xhr.statusText);
    }
  }

  function load(onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      onXhrLoad(xhr, onLoad);
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения!');
    });

    xhr.timeout = 3000;

    xhr.addEventListener('timeout', function () {
      onError('Запрос выполняется слишком долго!');
    });


    xhr.send();
  }

  function save(data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', URL_SAVE);

    xhr.addEventListener('load', function () {
      onXhrLoad(xhr, onSave);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка при отправке данных');
    });

    xhr.timeout = 3000;

    xhr.addEventListener('timeout', function () {
      onError('Запрос выполняется слишком долго!');
    });

    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save,

  };

})();
