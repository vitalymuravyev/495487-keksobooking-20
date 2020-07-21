'use strict';

(function () {
  window.filterAds = function (newPins) {
    var newArr = newPins.slice();

    var filtersForm = document.querySelector('.map__filters');
    var housingType = document.querySelector('#housing-type');
    var housingPrice = filtersForm.querySelector('#housing-price');
    var housingRooms = filtersForm.querySelector('#housing-rooms');
    var housingGuests = filtersForm.querySelector('#housing-guests');
    var housingFeatures = filtersForm.querySelectorAll('.map__checkbox:checked');

    var filters = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value,
      features: Array.from(housingFeatures).map(function (item) {
        return item.value;
      }),
    };

    newArr = newArr.filter(function (item) {
      if (filters.type === 'any') {
        return true;
      }
      return item.offer.type === filters.type;
    });

    newArr = newArr.filter(function (item) {
      if (filters.rooms === 'any') {
        return true;
      }
      return item.offer.rooms === +filters.rooms;
    });

    newArr = newArr.filter(function (item) {
      if (filters.guests === 'any') {
        return true;
      }
      return item.offer.guests === +filters.guests;
    });

    newArr = newArr.filter(function (item) {

      switch (filters.price) {
        case 'low':
          if (item.offer.price < 10000) {
            return true;
          }
          break;
        case 'middle':
          if (item.offer.price >= 10000 && item.offer.price < 50000) {
            return true;
          }
          break;
        case 'high':
          if (item.offer.price >= 50000) {
            return true;
          }
          break;
        case 'any':
          return true;
      }
      return false;
    });

    newArr = newArr.filter(function (item) {
      if (filters.features.length === 0) {
        return true;
      }
      for (var i = 0; i < filters.features.length; i++) {
        if (!item.offer.features.includes(filters.features[i])) {
          return false;
        }
      }
      return true;
    });
    return newArr;
  };

})();
