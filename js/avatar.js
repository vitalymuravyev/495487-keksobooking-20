'use strict';

(function () {
  var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var preview = document.querySelector('.ad-form-header__preview img');
  var fileChooser = document.querySelector('.ad-form-header__input');

  function clearAvatar() {
    preview.src = 'img/muffin-grey.svg';
  }


  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);

    }
  });

  window.avatar = {
    clearAvatar: clearAvatar,
  };

})();
