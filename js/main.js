'use strict';

var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var NUMBER_OF_PINS = 8;

var HOME_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var HOME_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = map.querySelector('.map__pins');
var postForm = document.querySelector('.ad-form');
var postFormFields = postForm.querySelectorAll('fieldset');
var mapFilterForm = document.querySelector('.map__filters');
var mapFilterFormFields = mapFilterForm.children;
var mainPin = map.querySelector('.map__pin--main');
var mainPinWidth = mainPin.offsetWidth;
var mainPinHeight = mainPin.offsetHeight;
var mainPinXValue = parseInt(mainPin.style.left, 10) + Math.floor(mainPinWidth / 2);
var mainPinYValue = parseInt(mainPin.style.top, 10) + Math.floor(mainPinHeight / 2);
var mainPinActivYValue = mainPinYValue + Math.floor(mainPinHeight / 2) + 22;
var addressField = postForm.querySelector('#address');
var titleInput = postForm.querySelector('#title');
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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createRandomArray(arr) {
  var newArr = [];
  var quantity = getRandomNumber(0, arr.length - 1);
  for (var i = 0; i < quantity; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}

function createAvatarsArray() {
  var tempArr = [];
  for (var j = 1; j <= NUMBER_OF_PINS; j++) {
    tempArr.push('img/avatars/user0' + j + '.png');
  }
  return tempArr;
}

var AVATARS = createAvatarsArray();


function renderAvatar() {
  return AVATARS.splice(getRandomNumber(0, AVATARS.length), 1);
}

function createPost() {
  var location = {
    x: getRandomNumber(0, map.offsetWidth),
    y: getRandomNumber(MIN_Y, MAX_Y),
  };

  return {
    author: {
      avatar: renderAvatar(),
    },

    offer: {
      title: 'Here will be title of the real post',
      address: location.x + ', ' + location.y,
      price: getRandomNumber(5, 80) * 1000,
      type: HOME_TYPE[getRandomNumber(0, HOME_TYPE.length)],
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(2, 8),
      checkinn: CHECK_TIME[getRandomNumber(0, CHECK_TIME.length)],
      checkout: CHECK_TIME[getRandomNumber(0, CHECK_TIME.length)],
      features: createRandomArray(HOME_FEATURES),
      photos: createRandomArray(PHOTOS),
      location: {
        x: location.x,
        y: location.y,
      },
    },
  };
}

function createPosts() {
  var posts = [];
  for (var k = 0; k < NUMBER_OF_PINS; k++) {
    posts.push(createPost());
  }
  return posts;
}

var newPosts = createPosts();

function renderPin(post) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = post.offer.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = post.offer.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = post.author.avatar;
  pin.querySelector('img').alt = post.offer.title;
  return pin;
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

function addPins(pins) {
  var fragment = document.createDocumentFragment();

  for (var n = 0; n < pins.length; n++) {
    fragment.appendChild(renderPin(pins[n]));
  }
  mapPins.appendChild(fragment);
}

function activateMap() {
  map.classList.remove('map--faded');
  postForm.classList.remove('ad-form--disabled');
  enableFormElements(postFormFields);
  enableFormElements(mapFilterFormFields);
  addressField.value = mainPinXValue + ', ' + mainPinActivYValue;
  mainPin.removeEventListener('mousedown', mouseClick);
  mainPin.removeEventListener('keydown', enterClick);
  addPins(newPosts);
}

function mouseClick(evt) {
  var buttonPressed = evt.button;
  if (buttonPressed === 0) {
    activateMap();
  }
}

function enterClick(evt) {
  if (evt.key === 'Enter') {
    activateMap();
  }
}

function changeRoomsCapacity() {
  if (capacity.value > roomsCapacity[roomsNumber.value]) {
    capacity.setCustomValidity(roomsCapacityError[roomsNumber.value]);
  } else if (roomsNumber.value === '100' && capacity.value > roomsCapacity[roomsNumber.value]) {
    capacity.setCustomValidity(roomsCapacityError[roomsNumber.value]);
  } else {
    capacity.setCustomValidity('');
  }
}

function init() {
  map.classList.add('map--faded');

  disableFormElements(postFormFields);
  disableFormElements(mapFilterFormFields);

  addressField.value = mainPinXValue + ', ' + mainPinYValue;

  mainPin.addEventListener('mousedown', mouseClick);
  mainPin.addEventListener('keydown', enterClick);

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

  capacity.addEventListener('change', changeRoomsCapacity);

  roomsNumber.addEventListener('change', changeRoomsCapacity);
}

init();
