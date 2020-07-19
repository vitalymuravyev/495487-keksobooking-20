'use strict';

(function () {

  var postForm = document.querySelector('.ad-form');
  var type = postForm.querySelector('#type');
  var price = postForm.querySelector('#price');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;

  var addressField = postForm.querySelector('#address');
  var roomsNumber = postForm.querySelector('#room_number');
  var capacity = postForm.querySelector('#capacity');
  var roomsCapacity = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0,
  };
  var roomsCapacityError = {
    '1': 'Не более одного гостя!',
    '2': 'Не более двух гостей!',
    '3': 'Не более трех гостей!',
    '100': 'Только не для гостей!',
  };
  var priceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };


  window.form = {
    changeRoomsCapacity: function () {
      if (capacity.value > roomsCapacity[roomsNumber.value]) {
        capacity.setCustomValidity(roomsCapacityError[roomsNumber.value]);
      } else if (roomsNumber.value === '100' && capacity.value > roomsCapacity[roomsNumber.value]) {
        capacity.setCustomValidity(roomsCapacityError[roomsNumber.value]);
      } else {
        capacity.setCustomValidity('');
      }
    },

    changePricePlaceholder: function () {
      price.placeholder = priceMap[type.value];
    },

    disableFormElements: function (formElements) {
      for (var l = 0; l < formElements.length; l++) {
        formElements[l].setAttribute('disabled', true);
      }
    },

    enableFormElements: function (formElements) {
      for (var m = 0; m < formElements.length; m++) {
        formElements[m].removeAttribute('disabled');
      }
    },

    changeAdressValue: function () {
      var mainPinXValue = parseInt(mainPin.style.left, 10) + Math.floor(mainPinWidth / 2);
      var mainPinYValue = parseInt(mainPin.style.top, 10) + mainPinHeight;
      addressField.value = mainPinXValue + ', ' + mainPinYValue;
    },
  };
})();
