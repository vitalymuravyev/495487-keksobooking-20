'use strict';

(function () {
  var type = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var mapFilters = document.querySelector('.map__filters-container');
  var card = map.querySelector('.popup');
  var closeButton = cardTemplate.querySelector('.popup__close');

  function createPhoto(photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = photos[i];
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      fragment.appendChild(photo);
    }

    return fragment;
  }

  function createFeatures(features) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < features.length; j++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + features[j]);

      fragment.appendChild(feature);
    }

    return fragment;
  }

  function removePopup() {
    var activePin = map.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
    card.remove();
    document.removeEventListener('keydown', onEscPress);
    closeButton.removeEventListener('click', onMouseClick);
  }

  function onMouseClick() {
    removePopup();
  }

  function onEscPress(evt) {
    if (evt.key === 'Escape') {
      removePopup();
    }
  }

  function makeCard(post) {
    card = map.querySelector('.popup');

    if (card) {
      card.remove();
    }
    card = cardTemplate.cloneNode(true);

    var photos = card.querySelector('.popup__photos');
    var features = card.querySelector('.popup__features');

    closeButton = card.querySelector('.popup__close');

    if (post.offer.title) {
      card.querySelector('.popup__title').textContent = post.offer.title;
    } else {
      card.querySelector('.popup__title').classList.add('hidden');
    }

    if (post.offer.address) {
      card.querySelector('.popup__text--address').textContent = post.offer.address;
    } else {
      card.querySelector('.popup__text--address').classList.add('hidden');
    }

    if (post.offer.price) {
      card.querySelector('.popup__text--price').textContent = post.offer.price + '₽/ночь';
    } else {
      card.querySelector('.popup__text--price').classList.add('hidden');
    }

    if (post.offer.type) {
      card.querySelector('.popup__type').textContent = type[post.offer.type];
    } else {
      card.querySelector('.popup__type').classList.add('hidden');
    }

    if (post.offer.rooms && post.offer.guests) {
      card.querySelector('.popup__text--capacity').textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';
    } else {
      card.querySelector('.popup__text--capacity').classList.add('hidden');
    }

    if (post.offer.checkin && post.offer.checkout) {
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + post.offer.checkin + ', выезд до ' + post.offer.checkout;
    } else {
      card.querySelector('.popup__text--time').classList.add('hidden');
    }

    if (post.offer.description) {
      card.querySelector('.popup__description').textContent = post.offer.description;
    } else {
      card.querySelector('.popup__description').classList.add('hidden');
    }

    if (post.author.avatar) {
      card.querySelector('.popup__avatar').src = post.author.avatar;
    } else {
      card.querySelector('.popup__avatar').classList.add('hidden');
    }

    if (post.offer.features.length) {
      features.innerHTML = '';
      features.appendChild(createFeatures(post.offer.features));
    } else {
      features.classList.add('hidden');
    }

    if (post.offer.photos.length) {
      photos.innerHTML = '';
      photos.appendChild(createPhoto(post.offer.photos));
    } else {
      photos.classList.add('hidden');
    }

    closeButton.addEventListener('click', onMouseClick);

    document.addEventListener('keydown', onEscPress);

    mapFilters.before(card);

  }

  window.offerCard = {
    makeCard: makeCard,
    onEscPress: onEscPress,
    onMouseClick: onMouseClick,
  };

})();
