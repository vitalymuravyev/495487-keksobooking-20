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

  function createPhoto(photoArr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoArr.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = photoArr[i];
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      fragment.appendChild(photo);
    }

    return fragment;
  }

  function createFeatures(featuresArr) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < featuresArr.length; j++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + featuresArr[j]);

      fragment.appendChild(feature);
    }

    return fragment;
  }

  function onMouseClick() {
    var activePin = map.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
    card.classList.add('visually-hidden');
    document.removeEventListener('keydown', onEscPress);
    closeButton.removeEventListener('click', onMouseClick);
  }

  function onEscPress(evt) {
    var activePin = map.querySelector('.map__pin--active');
    if (evt.key === 'Escape') {
      activePin.classList.remove('map__pin--active');
      card.classList.add('visually-hidden');
      document.removeEventListener('keydown', onEscPress);
      closeButton.removeEventListener('click', onMouseClick);
    }
  }

  function makeOfferCard(post) {
    card = map.querySelector('.popup');
    if (card) {
      card.classList.remove('visually-hidden');
    } else {
      card = cardTemplate.cloneNode(true);
    }

    var photos = card.querySelector('.popup__photos');
    var features = card.querySelector('.popup__features');

    closeButton = card.querySelector('.popup__close');

    card.querySelector('.popup__title').textContent = post.offer.title;

    card.querySelector('.popup__text--address').textContent = post.offer.address;

    card.querySelector('.popup__text--price').textContent = post.offer.price + '₽/ночь';

    card.querySelector('.popup__type').textContent = type[post.offer.type];

    card.querySelector('.popup__text--capacity').textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';

    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + post.offer.checkin + ', выезд до ' + post.offer.checkout;

    card.querySelector('.popup__description').textContent = post.offer.description;

    card.querySelector('.popup__avatar').src = post.author.avatar;

    features.innerHTML = '';
    features.appendChild(createFeatures(post.offer.features));

    photos.innerHTML = '';
    photos.appendChild(createPhoto(post.offer.photos));

    closeButton.addEventListener('click', onMouseClick);

    document.addEventListener('keydown', onEscPress);

    mapFilters.before(card);
  }

  window.offerCard = {
    makeOfferCard: makeOfferCard,
  };

})();
