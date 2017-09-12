'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture-template').content;
  var photos = [];
  var children = document.querySelector('.pictures').children;
// создание картинки по образцу
  function createNewPhoto(description) {
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('img').setAttribute('src', description.url);
    newPhoto.querySelector('.picture-likes').textContent = description.likes;
    newPhoto.querySelector('.picture-comments').textContent = description.comments.length;
    return newPhoto;
  }
  function createNewFragment(photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(createNewPhoto(photosArray[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  }

  function successHandler(data) {
    photos = data;
    createNewFragment(photos);
    document.querySelector('.filters').classList.remove('hidden');
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; z-index: 100; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); text-align: center; padding-top: 100px; box-sizing: border-box; font-size: 40px; color: #ff0000';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function changePicturesContent() {
    Array.from(children).forEach(function (child) {
      document.querySelector('.pictures').removeChild(child);
    });
  }
  function updatePhotos(evt) {
    var filter = evt.target;
    var updatedPhotos;
    if (filter.id === 'filter-popular') {
      updatedPhotos = sortingByLikes();
    }
    if (filter.id === 'filter-discussed') {
      updatedPhotos = sortingByComments();
    }
    if (filter.id === 'filter-recommend') {
      updatedPhotos = defaultSorting();
    }
    if (filter.id === 'filter-random') {
      updatedPhotos = randomSorting();
    }
    debounce(changePicturesContent());
    createNewFragment(updatedPhotos);
  }
  function sortingByLikes() {
    var photosCopy = photos.slice();
    return photosCopy.sort(function (firstPhoto, secondPhoto) {
      if (firstPhoto.likes < secondPhoto.likes) {
        return 1;
      } else if (firstPhoto.likes > secondPhoto.likes) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  function sortingByComments() {
    var photosCopy = photos.slice();
    return photosCopy.sort(function (firstPhoto, secondPhoto) {
      if (firstPhoto.comments.length < secondPhoto.comments.length) {
        return 1;
      } else if (firstPhoto.comments.length > secondPhoto.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  function defaultSorting() {
    return photos;
  }

  function randomSorting() {
    var photosCopy = photos.slice();
    return photosCopy.sort(function () {
      return (Math.random() - 0.5);
    });
  }
  function debounce(action) {
    setTimeout(action, 500);
  }

  document.querySelector('.filters').addEventListener('focusin', updatePhotos);
// Выведение картинок на страницу
  window.backend.load(successHandler, errorHandler);

})();
