'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_NUMBER_OF_PINS = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  function renderPin(post) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = post.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = post.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = post.author.avatar;
    pin.querySelector('img').alt = post.offer.title;

    pin.addEventListener('click', function () {
      pin.classList.add('map__pin--active');
      window.offerCard.makeOfferCard(post);
    });
    return pin;
  }

  function removePins() {
    var oldPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    oldPins.forEach(function (item) {
      item.remove();
    });
  }

  function renderPins(pins) {
    var NUMBER_OF_PINS = (pins.length >= MAX_NUMBER_OF_PINS) ? MAX_NUMBER_OF_PINS : pins.length;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_PINS; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPins.appendChild(fragment);
  }

  window.render = {
    removePins: removePins,
    renderPins: renderPins,
  };

})();
