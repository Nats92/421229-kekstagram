'use strict';

window.photos = [];
var children = document.querySelector('.pictures').children;

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
  window.createNewFragment(updatedPhotos);
}
function sortingByLikes() {
  var photosCopy = window.photos.slice();
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
  var photosCopy = window.photos.slice();
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
  return window.photos;
}

function randomSorting() {
  var photosCopy = window.photos.slice();
  return photosCopy.sort(function () {
    return (Math.random() - 0.5);
  });
}
function debounce(action) {
  setTimeout(action, 500);
}
document.querySelector('.filters').addEventListener('change', updatePhotos);
