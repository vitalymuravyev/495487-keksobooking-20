'use strict';

(function () {
  var map = document.querySelector('.map');

  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;
  var mainPin = map.querySelector('.map__pin--main');
  var titleInput = postForm.querySelector('#title');
  var checkinn = postForm.querySelector('#timein');
  var checkout = postForm.querySelector('#timeout');
  var roomsNumber = postForm.querySelector('#room_number');
  var capacity = postForm.querySelector('#capacity');
  var type = postForm.querySelector('#type');
  var resetButton = postForm.querySelector('.ad-form__reset');
  var avatarChooser = postForm.querySelector('.ad-form-header__input');
  var houseImageChooser = postForm.querySelector('.ad-form__input');

  function init() {
    map.classList.add('map--faded');
    postForm.classList.add('ad-form--disabled');

    mapFilterForm.reset();
    window.form.disableFormElements(postFormFields);
    window.form.disableFormElements(mapFilterFormFields);

    window.form.changeAdressValue();

    mainPin.addEventListener('mousedown', window.map.mouseClick);
    mainPin.addEventListener('keydown', window.map.enterClick);
  }

  function reInit() {
    window.render.removePins();
    mainPin.style.left = window.map.mainPinDefaultX;
    mainPin.style.top = window.map.mainPinDefaultY;
    window.form.reset();

    titleInput.removeEventListener('invalid', window.form.onTitleValidity);
    capacity.removeEventListener('change', window.form.onRoomsCapacityChange);
    roomsNumber.removeEventListener('change', window.form.onRoomsCapacityChange);
    checkinn.removeEventListener('change', window.form.onCheckinnCheckoutChange);
    checkout.removeEventListener('change', window.form.onCheckinnCheckoutChange);
    type.removeEventListener('change', window.form.onPricePlaceholderChange);
    avatarChooser.removeEventListener('change', window.form.onAvatarChooserChange);
    houseImageChooser.removeEventListener('change', window.form.onHouseImageChooserChange);
    postForm.removeEventListener('submit', window.form.onFormSubmit);
    resetButton.removeEventListener('click', window.form.onResetButtonClick);

    init();

  }

  window.main = {
    init: init,
    reInit: reInit,
  };

  init();
})();
