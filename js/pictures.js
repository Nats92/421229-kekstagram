'use strict';

// генерирование случайных значений
var generateRandomNumber = function (min, max) {
  var multiplier = max + 1 - min;
  return Math.floor(min + Math.random() * multiplier);
};

// создание массива неповторяющихся url-ов
var createArrayOfURLS = function () {
  var urls = [];
  while (urls.length < 25) {
    var randomNumber = generateRandomNumber(1, 25);
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
};

// массив комментариев
var photoComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// генератор комментариев
var generateComment = function () {
  var amount = generateRandomNumber(1, 2);
  var maxIndex = photoComments.length - 1;
  var i = generateRandomNumber(0, maxIndex); // индекс эл-та массива
  var j = generateRandomNumber(0, maxIndex); // ещё один индекс эл-та массива
  var comment = photoComments[i];

  return (amount === 1) ? comment : (photoComments[i] + ' ' + photoComments[j]);
};

// создание массива комментариев переменной длины
var createRandomLengthArray = function () {
  var comments = [];
  var length = generateRandomNumber(0, 30);
  for (var i = 0; i < length; i++) {
    var comment = generateComment();
    comments.push(comment);
  }
  return comments;
};

// создание массива обьектов
var createArrayOfDescriptions = function () {
  var photoDescriptions = [];
  var photos = createArrayOfURLS();
  for (var i = 0; photoDescriptions.length < 25; i++) {
    var object = {
      url: photos[i],
      likes: generateRandomNumber(15, 200),
      comments: generateComment()
    };
    photoDescriptions.push(object);
  }
  return photoDescriptions;
};

var photoTemplate = document.querySelector('#picture-template').content;
var descriptions = createArrayOfDescriptions();
var picturesList = document.querySelector('.pictures');

var createNewPhoto = function (description) {
  var newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('img').setAttribute('src', description.url);
  newPhoto.querySelector('.picture-likes').textContent = description.likes;
  newPhoto.querySelector('.picture-comments').textContent = createRandomLengthArray().length;
  return newPhoto;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < descriptions.length; i++) {
  fragment.appendChild(createNewPhoto(descriptions[i]));
}
picturesList.appendChild(fragment);
document.querySelector('.upload-overlay').classList.add('hidden');

document.querySelector('.gallery-overlay').classList.remove('hidden');
document.querySelector('.gallery-overlay-image').setAttribute('src', descriptions[0].url);
document.querySelector('.likes-count').textContent = descriptions[0].likes;
document.querySelector('.comments-count').textContent = createRandomLengthArray().length;


