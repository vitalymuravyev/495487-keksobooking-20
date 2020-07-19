'use strict';

(function () {
  var map = document.querySelector('.map');

  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;
  var mainPin = map.querySelector('.map__pin--main');
  var titleInput = postForm.querySelector('#title');
  var roomsNumber = postForm.querySelector('#room_number');
  var capacity = postForm.querySelector('#capacity');
  var checkinn = postForm.querySelector('#timein');
  var checkout = postForm.querySelector('#timeout');
  var type = postForm.querySelector('#type');

  function init() {
    map.classList.add('map--faded');

    window.form.disableFormElements(postFormFields);
    window.form.disableFormElements(mapFilterFormFields);

    window.form.changeAdressValue();

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

    checkinn.addEventListener('change', function () {
      checkout.value = checkinn.value;
    });
    checkout.addEventListener('change', function () {
      checkinn.value = checkout.value;
    });

    type.addEventListener('change', window.form.changePricePlaceholder);

  }

  init();
})();
