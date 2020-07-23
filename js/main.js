'use strict';

(function () {
  var map = document.querySelector('.map');

  var postForm = document.querySelector('.ad-form');
  var postFormFields = postForm.querySelectorAll('fieldset');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterFormFields = mapFilterForm.children;
  var mainPin = map.querySelector('.map__pin--main');

  function init() {
    map.classList.add('map--faded');

    window.form.disableFormElements(postFormFields);
    window.form.disableFormElements(mapFilterFormFields);

    window.form.changeAdressValue();

    mainPin.addEventListener('mousedown', window.map.mouseClick);
    mainPin.addEventListener('keydown', window.map.enterClick);
  }

  function reInit() {
    window.render.removePins();
    mainPin.style.left = window.map.mainPinDefaultX;
    mainPin.style.top = window.map.mainPinDefaultY;
    window.form.resetForm();
    init();

  }

  window.main = {
    init: init,
    reInit: reInit,
  };

  init();
})();
