'use strict';

(function () {
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var ImageSize = {
    WIDTH: '70px',
    HEIGHT: '70px',
  };

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserPhoto = document.querySelector('#images');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  previewPhoto.remove();

  var upload = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var addNewImg = function () {
    var newImgContainer = document.createElement('div');
    var newImg = document.createElement('img');

    newImgContainer.classList.add('ad-form__photo');

    newImg.style.width = ImageSize.WIDTH;
    newImg.style.height = ImageSize.HEIGHT;
    newImgContainer.appendChild(newImg);
    photoContainer.appendChild(newImgContainer);
    return newImg;
  };

  var removeImages = function () {
    previewAvatar.src = AVATAR_DEFAULT;
    if (previewPhoto) {
      var newImages = document.querySelectorAll('.ad-form__photo');
      newImages.forEach(function (it) {
        it.remove();
      });
    }
  };

  var changeAvatarHandler = function () {
    upload(fileChooserAvatar, previewAvatar);
  };

  var changePhotoHandler = function () {
    upload(fileChooserPhoto, addNewImg());
  };

  fileChooserAvatar.addEventListener('change', changeAvatarHandler);
  fileChooserPhoto.addEventListener('change', changePhotoHandler);

  window.upload = {
    removeImages: removeImages
  };
})();
