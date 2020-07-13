'use strict';

(function () {
  var type = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var mapFilters = document.querySelector('.map__filters-container');

  window.makeAdCard = function (ad) {
    var card = cardTemplate.cloneNode(true);

    var photos = card.querySelector('.popup__photos');
    var features = card.querySelectorAll('.popup__feature');

    // кол-во ifов очень не нравится, но просто и по другому не придумал
    if (ad.offer.title) {
      card.querySelector('.popup__title').textContent = ad.offer.title;
    } else {
      card.querySelector('.popup__title').classList.add('hidden');
    }

    if (ad.offer.address) {
      card.querySelector('.popup__text--address').textContent = ad.offer.address;
    } else {
      card.querySelector('.popup__text--address').classList.add('hidden');
    }

    if (ad.offer.price) {
      card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    } else {
      card.querySelector('.popup__text--price').classList.add('hidden');
    }

    if (ad.offer.type) {
      card.querySelector('.popup__type').textContent = type[ad.offer.type];
    } else {
      card.querySelector('.popup__type').classList.add('hidden');
    }

    if (ad.offer.rooms && ad.offer.guests) {
      card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    } else {
      card.querySelector('.popup__text--capacity').classList.add('hidden');
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      card.querySelector('.popup__text--time').classList.add('hidden');
    }

    if (ad.offer.description) {
      card.querySelector('.popup__description').textContent = ad.offer.description;
    } else {
      card.querySelector('.popup__description').classList.add('hidden');
    }

    if (ad.author.avatar) {
      card.querySelector('.popup__avatar').src = ad.author.avatar;
    } else {
      card.querySelector('.popup__avatar').classList.add('hidden');
    }

    // А тут и так будет пусто, если ничего не придет
    features.forEach(function (item) {
      if (!ad.offer.features.includes(item.classList.value.slice(31))) {
        item.remove();
      }
    });

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var photo = card.querySelector('.popup__photo').cloneNode(true);
      photo.src = ad.offer.photos[i];
      fragment.appendChild(photo);

    }
    // Снова сделал очистку элемента так)
    photos.innerHTML = '';
    photos.appendChild(fragment);

    mapFilters.before(card);

  };

})();
