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
