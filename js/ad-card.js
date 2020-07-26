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

  function makeAdCard(ad) {
    var card = map.querySelector('.popup');
    if (card) {
      card.classList.remove('visually-hidden');
    } else {
      card = cardTemplate.cloneNode(true);
    }

    var closeButton = card.querySelector('.popup__close');
    var photos = card.querySelector('.popup__photos');
    var features = card.querySelector('.popup__features');

    card.querySelector('.popup__title').textContent = ad.offer.title;

    card.querySelector('.popup__text--address').textContent = ad.offer.address;

    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

    card.querySelector('.popup__type').textContent = type[ad.offer.type];

    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    card.querySelector('.popup__description').textContent = ad.offer.description;

    card.querySelector('.popup__avatar').src = ad.author.avatar;

    features.innerHTML = '';
    features.appendChild(createFeatures(ad.offer.features));

    photos.innerHTML = '';
    photos.appendChild(createPhoto(ad.offer.photos));

    closeButton.addEventListener('click', function () {
      card.classList.add('visually-hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        card.classList.add('visually-hidden');
      }
    });

    mapFilters.before(card);
  }

  window.adCard = {
    makeAdCard: makeAdCard,
  };

})();
