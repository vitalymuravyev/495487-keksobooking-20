'use strict';

(function () {
  var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var map = document.querySelector('.map');
  var postForm = document.querySelector('.ad-form');
  var type = postForm.querySelector('#type');
  var price = postForm.querySelector('#price');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var titleInput = postForm.querySelector('#title');
  var addressField = postForm.querySelector('#address');
  var checkinn = postForm.querySelector('#timein');
  var checkout = postForm.querySelector('#timeout');
  var roomsNumber = postForm.querySelector('#room_number');
  var capacity = postForm.querySelector('#capacity');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var houseImagePreviewContainer = document.querySelector('.ad-form__photo');
  var houseImageChooser = document.querySelector('.ad-form__input');
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

  function clearHouseImage() {
    houseImagePreviewContainer.innerHTML = '';
  }

  function clearAvatar() {
    avatarPreview.src = 'img/muffin-grey.svg';
  }

  function onTitleValidity() {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Минимум 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Не более 100 символов');
    } else {
      titleInput.setCustomValidity('');
    }
  }

  function onRoomsCapacityChange() {
    if (capacity.value > roomsCapacity[roomsNumber.value]) {
      capacity.setCustomValidity(roomsCapacityError[roomsNumber.value]);
    } else if (roomsNumber.value === '100' && capacity.value > roomsCapacity[roomsNumber.value]) {
      capacity.setCustomValidity(roomsCapacityError[roomsNumber.value]);
    } else {
      capacity.setCustomValidity('');
    }
  }

  function onPricePlaceholderChange() {
    price.placeholder = priceMap[type.value];
    price.min = priceMap[type.value];
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }
    clearHouseImage();
    clearAvatar();
    window.main.reInit();
  }

  function onCheckinnCheckoutChange(evt) {
    var element = evt.target;
    var changedElement = (element.id === checkinn.id) ? checkout : checkinn;

    changedElement.value = element.value;
  }

  function onAvatarChooserChange() {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);

    }
  }

  function onHouseImageChooserChange() {
    var files = houseImageChooser.files;

    for (var i = 0; i < files.length; i++) {
      var file = houseImageChooser.files[i];
      var fileName = file.name.toLowerCase();

      var matches = IMAGE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var preview = document.createElement('img');
          preview.width = 70;
          preview.height = 70;
          preview.alt = 'Фото жилья';
          preview.src = reader.result;
          houseImagePreviewContainer.appendChild(preview);
        });

        reader.readAsDataURL(file);

      }
    }
  }

  function disableFormElements(formElements) {
    for (var l = 0; l < formElements.length; l++) {
      formElements[l].setAttribute('disabled', true);
    }
  }

  function enableFormElements(formElements) {
    for (var m = 0; m < formElements.length; m++) {
      formElements[m].removeAttribute('disabled');
    }
  }

  function changeAdressValue() {
    var mainPinXValue = parseInt(mainPin.style.left, 10) + Math.floor(mainPinWidth / 2);
    if (postForm.classList.contains('ad-form--disabled')) {
      var mainPinYValue = parseInt(mainPin.style.top, 10) + Math.floor(mainPinHeight / 2);
    } else {
      mainPinYValue = parseInt(mainPin.style.top, 10) + mainPinHeight;
    }

    addressField.value = mainPinXValue + ', ' + mainPinYValue;
  }

  function reset() {
    clearHouseImage();
    clearAvatar();
    postForm.reset();
  }

  function onFormSubmit(evt) {
    window.backend.save(new FormData(postForm));
    evt.preventDefault();
    postForm.removeEventListener('submit', onFormSubmit);
  }

  window.form = {
    onTitleValidity: onTitleValidity,
    onRoomsCapacityChange: onRoomsCapacityChange,
    onPricePlaceholderChange: onPricePlaceholderChange,
    onCheckinnCheckoutChange: onCheckinnCheckoutChange,
    onAvatarChooserChange: onAvatarChooserChange,
    onHouseImageChooserChange: onHouseImageChooserChange,
    onFormSubmit: onFormSubmit,
    onResetButtonClick: onResetButtonClick,
    disableFormElements: disableFormElements,
    enableFormElements: enableFormElements,
    changeAdressValue: changeAdressValue,
    reset: reset,
  };

})();
