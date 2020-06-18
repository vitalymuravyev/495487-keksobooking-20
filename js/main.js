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
var roomsNumberItems = roomsNumber.options;
var capacity = postForm.querySelector('#capacity');
var capacityItems = capacity.options;
// var roomsCapacity = {
//   '1': 1,
//   '2': 2,
//   '3': 3,
//   '100': 0,
// };

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

function activateMap() {
  map.classList.remove('map--faded');
  postForm.classList.remove('ad-form--disabled');
  enableFormElements(postFormFields);
  enableFormElements(mapFilterFormFields);
  addressField.value = mainPinXValue + ', ' + mainPinActivYValue;
  mainPin.removeEventListener('mousedown', mouseClick);
  mainPin.removeEventListener('keydown', enterClick);

  var fragment = document.createDocumentFragment();

  for (var n = 0; n < NUMBER_OF_PINS; n++) {
    fragment.appendChild(renderPin(newPosts[n]));
  }
  mapPins.appendChild(fragment);
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

function init() {

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

  roomsNumber.addEventListener('change', function () {
    var selectedItem = roomsNumber.selectedIndex;

    // ------------ Пока оставлю как сделал, не придумал как через объект.------------------------

    // var checkedRoomValue = roomsNumber[selectedItem].value;
    // var checkedRoom = roomsCapacity[checkedRoomValue];

    // for (var o = 0; o < capacityItems.length; o++) {
    //   var capacityValue = capacityItems[o].value;

    //   capacityItems[o].setAttribute('disabled', true);

    // }

    // for (var p = 0; p < checkedRoom.length; p++) {
    //   capacityItems[checkedRoom[p]].removeAttribute('disabled');
    // }
    if (roomsNumberItems[selectedItem].value === '100') {
      for (var o = 0; o < capacityItems.length; o++) {
        capacityItems[o].removeAttribute('disabled');
        if (capacityItems[o].value !== '0') {
          capacityItems[o].setAttribute('disabled', true);
        }
      }
    } else {
      for (var p = 0; p < capacityItems.length; p++) {
        capacityItems[p].removeAttribute('disabled');
        if (capacityItems[p].value === '0' || roomsNumberItems[selectedItem].value < capacityItems[p].value) {
          capacityItems[p].setAttribute('disabled', true);
        }
      }
    }
  });
}

init();
