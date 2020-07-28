'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;

  var map = document.querySelector('.map');
  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var filtersForm = document.querySelector('.map__filters');
  var roomsNumber = postForm.querySelector('#room_number');
  var capacity = postForm.querySelector('#capacity');
  var checkinn = postForm.querySelector('#timein');
  var checkout = postForm.querySelector('#timeout');
  var type = postForm.querySelector('#type');
  var titleInput = postForm.querySelector('#title');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;
  var resetButton = postForm.querySelector('.ad-form__reset');
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var houseImageChooser = document.querySelector('.ad-form__input');

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

  function onMainPinClick(evt) {
    var buttonPressed = evt.button;
    if (buttonPressed === 0) {
      activateMap();
    }
  }

  function onMainPinKeydown(evt) {
    if (evt.key === 'Enter') {
      activateMap();
    }
  }

  function onMainPinMouseMove(evt) {
    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMouseMove(moveEvt) {

      var mainPinMinX = 0 - Math.floor(mainPinWidth / 2);
      var mainPinMaxX = map.offsetWidth - Math.floor(mainPinWidth / 2);
      var mainPinMinY = MIN_Y - mainPinHeight;
      var mainPinMaxY = MAX_Y - mainPinHeight;

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

  function onFilterFormChange() {
    var closeButton = document.querySelector('.popup__close');
    if (map.querySelector('.popup')) {
      map.querySelector('.popup').classList.add('visually-hidden');
      document.removeEventListener('keydown', window.offerCard.onEscPress);
      closeButton.removeEventListener('click', window.offerCard.onMouseClick);
    }
    addPins(window.filterAds.filter(newPins));
  }

  function activateMap() {
    map.classList.remove('map--faded');
    postForm.classList.remove('ad-form--disabled');
    window.form.enableFormElements(postFormFields);
    window.form.changeAdressValue();
    mainPin.removeEventListener('mousedown', onMainPinClick);
    mainPin.removeEventListener('keydown', window.map.onMainPinKeydown);

    window.backend.load(successHandler);

    mainPin.addEventListener('mousedown', onMainPinMouseMove);

    titleInput.addEventListener('invalid', window.form.onTitleValidity);

    capacity.addEventListener('change', window.form.onRoomsCapacityChange);

    roomsNumber.addEventListener('change', window.form.onRoomsCapacityChange);

    checkinn.addEventListener('change', window.form.onCheckinnCheckoutChange);
    checkout.addEventListener('change', window.form.onCheckinnCheckoutChange);

    type.addEventListener('change', window.form.onPricePlaceholderChange);

    avatarChooser.addEventListener('change', window.form.onAvatarChooserChange);
    houseImageChooser.addEventListener('change', window.form.onHouseImageChooserChange);

    postForm.addEventListener('submit', window.form.onFormSubmit);

    resetButton.addEventListener('click', window.form.onResetButtonClick);

    filtersForm.addEventListener('change', onFilterFormChange);

  }

  window.map = {

    onMainPinClick: onMainPinClick,

    onMainPinKeydown: onMainPinKeydown,

    mainPinDefaultX: mainPin.style.left,

    mainPinDefaultY: mainPin.style.top,
  };
})();
