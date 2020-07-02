'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_OF_PINS = 8;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  function renderPin(post) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = post.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = post.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = post.author.avatar;
    pin.querySelector('img').alt = post.offer.title;
    return pin;
  }

  window.pins = {

    addPins: function (pins) {
      var fragment = document.createDocumentFragment();

      for (var n = 0; n < NUMBER_OF_PINS; n++) {
        fragment.appendChild(renderPin(pins[n]));
      }
      mapPins.appendChild(fragment);
    },
  };

})();
