'use strict';

(function () {

  var postForm = document.querySelector('.ad-form');
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
  };
})();
