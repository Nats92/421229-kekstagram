'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture-template').content;
  var descriptions = window.data.createArrayOfDescriptions();

// создание картинки по образцу
  function createNewPhoto(description) {
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('img').setAttribute('src', description.url);
    newPhoto.querySelector('.picture-likes').textContent = description.likes;
    newPhoto.querySelector('.picture-comments').textContent = window.data.createRandomLengthArray().length;
    return newPhoto;
  }

  document.querySelector('.upload-overlay').classList.add('hidden');

// Выведение картинок на страницу
  (function addFragment() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < descriptions.length; i++) {
      fragment.appendChild(createNewPhoto(descriptions[i]));
    }
    window.picturesList = document.querySelector('.pictures');
    window.picturesList.appendChild(fragment);
  })();
})();
