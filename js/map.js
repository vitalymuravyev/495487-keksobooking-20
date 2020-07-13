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
  var housingType = document.querySelector('#housing-type');

  var newPins = [];

  function addPins(data) {
    window.renderPins(data);

    window.makeAdCard(data[2]);
  }

  function successHandler(data) {
    newPins = data.slice();
    addPins(newPins);
  }

  function activateMap() {
    map.classList.remove('map--faded');
    postForm.classList.remove('ad-form--disabled');
    window.form.enableFormElements(postFormFields);
    addressField.value = mainPinXValue + ', ' + mainPinActivYValue;
    mainPin.removeEventListener('mousedown', window.map.mouseClick);
    mainPin.removeEventListener('keydown', window.map.enterClick);

    window.backend.load(successHandler);
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
