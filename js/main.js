'use strict';

var map = document.querySelector('.map');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function similarPosts() {
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
    for (var g = 1; g <= NUMBER_OF_PINS; g++) {
      tempArr.push('img/avatars/user0' + g + '.png');
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
    for (var j = 0; j < NUMBER_OF_PINS; j++) {
      posts.push(createPost());
    }
    return posts;
  }

  var newPosts = createPosts();
  map.classList.remove('map--faded');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(post) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = post.offer.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = post.offer.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = post.author.avatar;
    pin.querySelector('img').alt = post.offer.title;
    return pin;
  }

  var fragment = document.createDocumentFragment();

  for (var k = 0; k < NUMBER_OF_PINS; k++) {
    fragment.appendChild(renderPin(newPosts[k]));
  }
  var mapPins = map.querySelector('.map__pins');
  mapPins.appendChild(fragment);
}

var postForm = document.querySelector('.ad-form');
var postFormFields = postForm.querySelectorAll('fieldset');
var mapFilterForm = document.querySelector('.map__filters');
var mapFilterFormFields = mapFilterForm.children;

function disableFormElements(formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', 'disabled');
  }
}
function enableFormElements(formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
}

disableFormElements(postFormFields);
disableFormElements(mapFilterFormFields);

var mainPin = map.querySelector('.map__pin--main');
var MAIN_PIN_WIDTH = mainPin.offsetWidth;
var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
var MAIN_PIN_ACTIV_HEIGHT = MAIN_PIN_HEIGHT + 22;
var addressField = postForm.querySelector('#address');

addressField.value = (parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2)) + ', '
  + (parseInt(mainPin.style.top, 10) + Math.floor(MAIN_PIN_HEIGHT / 2));

function activateMap() {
  similarPosts();
  postForm.classList.remove('ad-form--disabled');
  enableFormElements(postFormFields);
  enableFormElements(mapFilterFormFields);
  addressField.value = (parseInt(mainPin.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2)) + ', '
  + (parseInt(mainPin.style.top, 10) + MAIN_PIN_ACTIV_HEIGHT);
  mainPin.removeEventListener('mousedown', mouseClick);
  mainPin.removeEventListener('keydown', enterClick);
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

mainPin.addEventListener('mousedown', mouseClick);
mainPin.addEventListener('keydown', enterClick);

var titleInput = postForm.querySelector('#title');

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

var roomsNumber = postForm.querySelector('#room_number');
var roomsNumberItems = roomsNumber.options;
var capacity = postForm.querySelector('#capacity');
var capacityItems = capacity.options;


roomsNumber.addEventListener('change', function () {
  var selectedItem = roomsNumber.selectedIndex;
  if (roomsNumberItems[selectedItem].value === '100') {
    for (var j = 0; j < capacityItems.length; j++) {
      capacityItems[j].disabled = false;
      if (capacityItems[j].value !== '0') {
        capacityItems[j].disabled = true;
      }
    }
  } else {
    for (var i = 0; i < capacityItems.length; i++) {
      capacityItems[i].disabled = false;
      if (capacityItems[i].value === '0' || roomsNumberItems[selectedItem].value < capacityItems[i].value) {
        capacityItems[i].disabled = true;
      }
    }
  }
});
