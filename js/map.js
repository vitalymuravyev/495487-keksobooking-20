'use strict';

(function () {

  var map = document.querySelector('.map');
  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var addressField = postForm.querySelector('#address');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var mainPinXValue = parseInt(mainPin.style.left, 10) + Math.floor(mainPinWidth / 2);
  var mainPinYValue = parseInt(mainPin.style.top, 10) + Math.floor(mainPinHeight / 2);
  var mainPinActivYValue = mainPinYValue + Math.floor(mainPinHeight / 2) + 22;


  function activateMap() {
    map.classList.remove('map--faded');
    postForm.classList.remove('ad-form--disabled');
    window.form.enableFormElements(postFormFields);
    window.form.enableFormElements(mapFilterFormFields);
    addressField.value = mainPinXValue + ', ' + mainPinActivYValue;
    mainPin.removeEventListener('mousedown', window.map.mouseClick);
    mainPin.removeEventListener('keydown', window.map.enterClick);
    window.pins.addPins(window.newPosts);
  }

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
