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

var photoTemplate = document.querySelector('#picture-template').content;
var descriptions = createArrayOfDescriptions();

// создание картинки по образцу
function createNewPhoto(description) {
  var newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('img').setAttribute('src', description.url);
  newPhoto.querySelector('.picture-likes').textContent = description.likes;
  newPhoto.querySelector('.picture-comments').textContent = createRandomLengthArray().length;
  return newPhoto;
}

var picturesList = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

// Выведение картинок на страницу
var fragment = document.createDocumentFragment();
for (var i = 0; i < descriptions.length; i++) {
  fragment.appendChild(createNewPhoto(descriptions[i]));
}
picturesList.appendChild(fragment);

function onEscPress(evt) {
  if (evt.keyCode === KEY_CODES.ESC) {
    onCloseClick();
  }
}
function onEnterPress(evt) {
  openPicture(evt);
}

function onPictureClick(evt) {
  openPicture(evt);
}

function onCloseClick() {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
}

function openPicture(evt) {
  evt.preventDefault();
  var target = (evt.type === 'keydown') ? evt.target : evt.target.parentElement;
  var like = target.querySelector('.picture-likes');
  var comment = target.querySelector('.picture-comments');
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', target.querySelector('img').getAttribute('src'));
  galleryOverlay.querySelector('.likes-count').textContent = like.childNodes[0].data;
  galleryOverlay.querySelector('.comments-count').textContent = comment.childNodes[0].data;

  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
  galleryOverlayClose.addEventListener('keydown', function () {
    if (evt.keyCode === KEY_CODES.ENTER) {
      onCloseClick();
    }
  });
  galleryOverlayClose.addEventListener('click', onCloseClick);
}

function addHandlers() {
  picturesList.addEventListener('click', onPictureClick);
  picturesList.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODES.ENTER) {
      onEnterPress(evt);
    }
  });
}

addHandlers();
