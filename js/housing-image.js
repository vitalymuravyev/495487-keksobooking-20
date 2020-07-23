'use strict';

(function () {
  var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previewContainer = document.querySelector('.ad-form__photo');
  var fileChooser = document.querySelector('.ad-form__input');


  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var preview = document.createElement('img');
        preview.width = 70;
        preview.height = 70;
        preview.alt = 'Фото жилья';
        preview.src = reader.result;
        previewContainer.appendChild(preview);
      });

      reader.readAsDataURL(file);

    }
  });

})();
