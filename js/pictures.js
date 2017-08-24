'use strict';

// массив комментариев
var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var KEY_CODES = {
  ESC: 27,
  ENTER: 13
};

// генерирование случайных значений
function generateRandomNumber(min, max) {
  var multiplier = max + 1 - min;
  return Math.floor(min + Math.random() * multiplier);
}

// создание массива неповторяющихся url-ов
function createArrayOfURLS(length) {
  var urls = [];
  while (urls.length < length) {
    var randomNumber = generateRandomNumber(1, length);
    var found = false;
    for (var i = 0; i < urls.length; i++) {
      if (('photos/' + randomNumber + '.jpg') === urls[i]) {
        found = true;
        break;
      }
    }
    if (!found) {
      urls.push('photos/' + randomNumber + '.jpg');
    }
  }
  return urls;
}

// генератор комментариев
function generateComment() {
  var amount = generateRandomNumber(1, 2);
  var maxIndex = PHOTO_COMMENTS.length - 1;
  var i = generateRandomNumber(0, maxIndex); // индекс эл-та массива
  var j = generateRandomNumber(0, maxIndex); // ещё один индекс эл-та массива
  var comment = PHOTO_COMMENTS[i];

  return (amount === 1) ? comment : (PHOTO_COMMENTS[i] + ' ' + PHOTO_COMMENTS[j]);
}

// создание массива комментариев переменной длины
function createRandomLengthArray() {
  var comments = [];
  var length = generateRandomNumber(0, 30);
  for (var i = 0; i < length; i++) {
    var comment = generateComment();
    comments.push(comment);
  }
  return comments;
}

// создание массива обьектов
function createArrayOfDescriptions() {
  var photoDescriptions = [];
  var photos = createArrayOfURLS(25);
  for (var i = 0; photoDescriptions.length < photos.length; i++) {
    var object = {
      url: photos[i],
      likes: generateRandomNumber(15, 200),
      comments: generateComment()
    };
    photoDescriptions.push(object);
  }
  return photoDescriptions;
}

var picturesList = document.querySelector('.pictures');

function createPhotosByTemplate() {
  var photoTemplate = document.querySelector('#picture-template').content;
  var descriptions = createArrayOfDescriptions();

  function createNewPhoto(description) {
    var newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('img').setAttribute('src', description.url);
    newPhoto.querySelector('.picture-likes').textContent = description.likes;
    newPhoto.querySelector('.picture-comments').textContent = createRandomLengthArray().length;
    return newPhoto;
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < descriptions.length; i++) {
    fragment.appendChild(createNewPhoto(descriptions[i]));
  }
  picturesList.appendChild(fragment);
}

createPhotosByTemplate();

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

document.querySelector('.upload-overlay').classList.add('hidden');

function onEscPress(evt) {
  if (evt.keyCode === KEY_CODES.ESC) {
    onCloseClick();
  }
}

function onCloseClick() {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
}

function onEnterPress(evt) {
  if (evt.keyCode === KEY_CODES.ENTER) {
    evt.preventDefault();
    galleryOverlay.classList.remove('hidden');
    var like = evt.target.querySelector('.picture-likes');
    var comment = evt.target.querySelector('.picture-comments');
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', evt.target.querySelector('img').getAttribute('src'));
    galleryOverlay.querySelector('.likes-count').textContent = like.childNodes[0].data;
    galleryOverlay.querySelector('.comments-count').textContent = comment.childNodes[0].data;

    document.addEventListener('keydown', onEscPress);
    galleryOverlayClose.addEventListener('keydown', onCloseClick);
  }
}

function onPictureClick(evt) {
  evt.preventDefault();
  galleryOverlay.classList.remove('hidden');
  var like = evt.target.parentElement.querySelector('.picture-likes');
  var comment = evt.target.parentElement.querySelector('.picture-comments');
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', evt.target.getAttribute('src'));
  galleryOverlay.querySelector('.likes-count').textContent = like.childNodes[0].data;
  galleryOverlay.querySelector('.comments-count').textContent = comment.childNodes[0].data;

  document.addEventListener('keydown', onEscPress);
  galleryOverlayClose.addEventListener('keydown', function () {
    if (evt.keyCode === KEY_CODES.ENTER) {
      onCloseClick();
    }
  });
}

picturesList.addEventListener('click', onPictureClick);
picturesList.addEventListener('keydown', onEnterPress);
galleryOverlayClose.addEventListener('click', onCloseClick);
