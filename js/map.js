'use strict';

(function () {

  var map = document.querySelector('.map');
  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var housingType = document.querySelector('#housing-type');
  var roomsNumber = postForm.querySelector('#room_number');
  var capacity = postForm.querySelector('#capacity');
  var checkinn = postForm.querySelector('#timein');
  var checkout = postForm.querySelector('#timeout');
  var type = postForm.querySelector('#type');
  var titleInput = postForm.querySelector('#title');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;

  var newPins = [];

  function addPins(data) {
    window.render.removePins();
    window.render.renderPins(data);
  }

  function successHandler(data) {
    window.form.enableFormElements(mapFilterFormFields);
    newPins = data.slice();
    addPins(newPins);
  }

  function onMainPinMove(evt) {
    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMouseMove(moveEvt) {

      var mainPinMinX = 0 - Math.floor(mainPinWidth / 2);
      var mainPinMaxX = map.offsetWidth - Math.floor(mainPinWidth / 2);
      var mainPinMinY = 130 - mainPinHeight;
      var mainPinMaxY = 630 - mainPinHeight;

      var shift = {
        x: startCoordinats.x - moveEvt.clientX,
        y: startCoordinats.y - moveEvt.clientY,
      };

      var currentX = mainPin.offsetLeft - shift.x;
      var currentY = mainPin.offsetTop - shift.y;

      startCoordinats = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (currentX < mainPinMinX) {
        currentX = mainPinMinX;
      } else if (currentX > mainPinMaxX) {
        currentX = mainPinMaxX;
      }
      mainPin.style.left = currentX + 'px';

      if (currentY < mainPinMinY) {
        currentY = mainPinMinY;
      } else if (currentY > mainPinMaxY) {
        currentY = mainPinMaxY;
      }
      mainPin.style.top = currentY + 'px';

      window.form.changeAdressValue();
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function activateMap() {
    map.classList.remove('map--faded');
    postForm.classList.remove('ad-form--disabled');
    window.form.enableFormElements(postFormFields);
    window.form.changeAdressValue();
    mainPin.removeEventListener('mousedown', window.map.mouseClick);
    mainPin.removeEventListener('keydown', window.map.enterClick);

    window.backend.load(successHandler);

    mainPin.addEventListener('mousedown', onMainPinMove);

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

  housingType.addEventListener('change', function (evt) {
    var newArr = newPins.slice().filter(function (item) {
      return item.offer.type === evt.target.value;
    });
    addPins(newArr);
  });

  window.map = {

    mouseClick: function (evt) {
      var buttonPressed = evt.button;
      if (buttonPressed === 0) {
        activateMap();
      }
    },

    enterClick: function (evt) {
      if (evt.key === 'Enter') {
        activateMap();
      }
    },

    mainPinDefaultX: mainPin.style.left,

    mainPinDefaultY: mainPin.style.top,
  };
})();
