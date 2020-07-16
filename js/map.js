'use strict';

(function () {

  var map = document.querySelector('.map');
  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var addressField = postForm.querySelector('#address');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var mainPinXValue = parseInt(mainPin.style.left, 10) + Math.floor(mainPinWidth / 2);
  var mainPinYValue = parseInt(mainPin.style.top, 10) + Math.floor(mainPinHeight / 2);
  var mainPinActivYValue = mainPinYValue + Math.floor(mainPinHeight / 2) + 22;
  var mainPinMinX = 0 - Math.floor(mainPinWidth / 2);
  var mainPinMaxX = map.offsetWidth - Math.floor(mainPinWidth / 2);
  var mainPinMinY = 130 - Math.floor(mainPinHeight / 2);
  var mainPinMaxY = 630 - Math.floor(mainPinHeight / 2);
  var housingType = document.querySelector('#housing-type');

  var newPins = [];

  function addPins(data) {
    window.renderPins(data);
  }

  function successHandler(data) {
    newPins = data.slice();
    addPins(newPins);
  }

  function onMainPinMove(evt) {
    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMouseMove(moveEvt) {

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
    addressField.value = mainPinXValue + ', ' + mainPinActivYValue;
    mainPin.removeEventListener('mousedown', window.map.mouseClick);
    mainPin.removeEventListener('keydown', window.map.enterClick);

    window.backend.load(successHandler);

    mainPin.addEventListener('mousedown', function (evt) {
      onMainPinMove(evt);
    });
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
  };
})();
