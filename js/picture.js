'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture-template').content;

// создание картинки по образцу
  function createNewPhoto(description) {
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('img').setAttribute('src', description.url);
    newPhoto.querySelector('.picture-likes').textContent = description.likes;
    newPhoto.querySelector('.picture-comments').textContent = description.comments.length;
    return newPhoto;
  }

  function successHandler(photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createNewPhoto(photos[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  }
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; z-index: 100; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); text-align: center; padding-top: 100px; box-sizing: border-box; font-size: 40px; color: #ff0000';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

// Выведение картинок на страницу
  window.backend.load(successHandler, errorHandler);
})();
