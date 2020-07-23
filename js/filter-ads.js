'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filtersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');;
  var checkboxWiFi = filtersForm.querySelector('#filter-wifi');
  var checkboxDishwasher = filtersForm.querySelector('#filter-dishwasher');
  var checkboxParking = filtersForm.querySelector('#filter-parking');
  var checkboxWasher = filtersForm.querySelector('#filter-washer');
  var checkboxElevator = filtersForm.querySelector('#filter-elevator');
  var checkboxConditioner = filtersForm.querySelector('#filter-conditioner');

  var filters = {};


  function isHouseTypeMatched(item) {
    if (filters.type === 'any' || item.offer.type === filters.type) {
      return true;
    }
    return false;
  }

  function isRoomsQuantityMatched(item) {
    if (filters.rooms === 'any' || item.offer.rooms === +filters.rooms) {
      return true;
    }
    return false;
  }

  function isGuestsQuantityMatched(item) {
    if (filters.guests === 'any' || item.offer.guests === +filters.guests) {
      return true;
    }
    return false;
  }

  function isPriceMatched(item) {
    switch (filters.price) {
      case 'low':
        if (item.offer.price < LOW_PRICE) {
          return true;
        }
        break;
      case 'middle':
        if (item.offer.price >= LOW_PRICE && item.offer.price < HIGH_PRICE) {
          return true;
        }
        break;
      case 'high':
        if (item.offer.price >= HIGH_PRICE) {
          return true;
        }
        break;
      case 'any':
        return true;
    }
    return false;
  }

  function isFeatureMatched(checkbox, item) {
    if (!checkbox.checked) {
      return true;
    } else if (item.offer.features.includes(checkbox.value)) {
      return true;
    }
    return false;
  }

  function filterAds (newPins) {
    filters = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value,
    };
    var filtredPins = [];

    for (var j = 0; j < newPins.length; j++) {
      var currentPin = newPins[j];
      if (isHouseTypeMatched(currentPin) &&
          isPriceMatched(currentPin) &&
          isRoomsQuantityMatched(currentPin) &&
          isGuestsQuantityMatched(currentPin) &&
          (isFeatureMatched(checkboxWiFi, currentPin) &&
          isFeatureMatched(checkboxDishwasher, currentPin) &&
          isFeatureMatched(checkboxParking, currentPin) &&
          isFeatureMatched(checkboxWasher, currentPin) &&
          isFeatureMatched(checkboxElevator, currentPin) &&
          isFeatureMatched(checkboxConditioner, currentPin))) {
        filtredPins.push(currentPin);
      }

      if (filtredPins.length === 5) {
        break;
      }
    }

    return filtredPins;
  }

  window.filterAds = {
    filterAds: filterAds,
  };

})();
