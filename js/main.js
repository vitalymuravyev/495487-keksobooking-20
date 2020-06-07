'use strict';
var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var HOME_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var HOME_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');

function renderValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function renderOriginal(arr) {
  var temp;
  var tempArr = arr;
  var newArr = [];
  var quantity = renderValue(1, arr.length);
  for (var i = 0; i < quantity; i++) {
    temp = tempArr.splice(renderValue(0, tempArr.length), 1).toString();
    newArr.push(temp);
  }
  return newArr;
}

function renderAvatar() {
  return AVATARS.splice(renderValue(0, AVATARS.length), 1).toString();
}

function createPost() {
  return {
    author: {
      avatar: 'img/avatars/user' + renderAvatar() + '.png',
    },

    offer: {
      title: 'Here will be title of the real post',
      address: location.x + ', ' + location.y,
      price: renderValue(5, 80) * 1000,
      type: HOME_TYPE[renderValue(0, HOME_TYPE.length)],
      rooms: renderValue(1, 4),
      guests: renderValue(2, 8),
      checkinn: CHECK_TIME[renderValue(0, CHECK_TIME.length)],
      checkout: CHECK_TIME[renderValue(0, CHECK_TIME.length)],
      features: renderOriginal(HOME_FEATURES),
      photos: renderOriginal(PHOTOS),
      location: {
        x: renderValue(0, map.offsetWidth),
        y: renderValue(130, 630),
      },
    },
  };
}

var posts = [];
for (var j = 0; j < 8; j++) {
  posts.push(createPost());
}

map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function renderPin(post) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = post.offer.location.x + 25 + 'px';
  pin.style.top = post.offer.location.y + 70 + 'px';
  pin.querySelector('img').src = post.author.avatar;
  pin.querySelector('img').alt = post.offer.title;

  return pin;
}

var fragment = document.createDocumentFragment();

for (var k = 0; k < 8; k++) {
  fragment.appendChild(renderPin(posts[k]));
}
var mapPins = map.querySelector('.map__pins');
mapPins.appendChild(fragment);
