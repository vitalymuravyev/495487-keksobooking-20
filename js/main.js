'use strict';

(function () {
  var map = document.querySelector('.map');

  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var mainPinXValue = parseInt(mainPin.style.left, 10) + Math.floor(mainPinWidth / 2);
  var mainPinYValue = parseInt(mainPin.style.top, 10) + Math.floor(mainPinHeight / 2);
  var addressField = postForm.querySelector('#address');
  var titleInput = postForm.querySelector('#title');
  var roomsNumber = postForm.querySelector('#room_number');
  var capacity = postForm.querySelector('#capacity');

  function init() {
    map.classList.add('map--faded');

    window.form.disableFormElements(postFormFields);
    window.form.disableFormElements(mapFilterFormFields);

    addressField.value = mainPinXValue + ', ' + mainPinYValue;

    mainPin.addEventListener('mousedown', window.map.mouseClick);
    mainPin.addEventListener('keydown', window.map.enterClick);

    titleInput.addEventListener('invalid', function () {
      if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity('Обязательное поле');
      } else if (titleInput.validity.tooShort) {
        titleInput.setCustomValidity('Минимум 30 символов');
      } else if (titleInput.validity.tooLong) {
        titleInput.setCustomValidity('Не более 100 символов');
      } else {
        titleInput.setCustomValidity('');
      }
    });

    capacity.addEventListener('change', window.form.changeRoomsCapacity);

    roomsNumber.addEventListener('change', window.form.changeRoomsCapacity);
  }

  init();
})();
