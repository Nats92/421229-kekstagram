'use strict';

(function () {

  function testUnique(items) {
    for (var i = 0; i < items.length - 1; i++) {
      for (var j = i + 1; j < items.length; j++) {
        if (items[i] === items[j]) {
          return false;
        }
      }
    } return true;
  }

  var hashtag = document.querySelector('.upload-form-hashtags');
  var formDescription = document.querySelector('.upload-form-description');

  // выделение красной рамкой если значение не валидно
  function makeInvalidFieldRed() {
     // для поля хэш-тегов
    if (!hashtag.validity.valid) {
      hashtag.style = 'border:2px solid red';
    } else {
      hashtag.attributes.style.value = '';
    }

    // для поля комментариев
    if (!formDescription.validity.valid) {
      formDescription.style = 'border:2px solid red';
    } else {
      formDescription.attributes.style.value = '';
    }
  }

  document.getElementById('upload-select-image').addEventListener('input', function (evt) {
    var errors = [];
    var tagsParsed = hashtag.value.split(' ');

    if (tagsParsed.length === 0 || (tagsParsed.length === 1 && tagsParsed[0] === '')) {
      return;
    }

    if (tagsParsed.some(function (item) {
      return item.match(/#.{0,20}\S#/);
    })) {
      errors.push('Необходимо разделять хэш-теги "пробелом".');
    }

    if (hashtag.value.match(/(#[A-zА-яЁё0-9\s]{0,20}){6,}/)) {
      errors.push('Нельзя указать больше пяти хэш-тегов.');
    }

    if (tagsParsed.some(function (item) {
      return item.length > 21;
    })) {
      errors.push('Максимальная длина одного хэш-тега 20 символов.');
    }

    if (!testUnique(tagsParsed)) {
      errors.push('Один и тот же хэш-тег не может быть использован дважды');
    }

    if (tagsParsed.some(function (item) {
      return item !== '' && !item.match(/#[A-zА-яЁё0-9]{0,20}/);
    })) {
      errors.push('Каждый хэш-тег должен начинаться с символа `#` (решётка) и состоять из одного слова.');
    }

    // выведение сообщения со всеми допущенными ошибками
    if (errors.length > 0) {
      hashtag.setCustomValidity(errors.join('\n'));
      hashtag.checkValidity();
    } else {
      hashtag.setCustomValidity('');
    }

    makeInvalidFieldRed();
  });

  function init() {
    window.effectImgPreview = document.querySelector('.effect-image-preview');
    var resizeControls = window.uploadOverlay.querySelector('.upload-resize-controls');

    function adjustScale(scale) {
      window.effectImgPreview.style.transform = 'scale(' + scale / 100 + ')';
    }
    window.initializeScale(resizeControls, adjustScale);

    function setFilterValue(filtName, filtVal) {
      window.effectImgPreview.style.filter = window.filterObj[filtName].name.replace('%', filtVal);
    }
    window.initializeFilters(window.effectImgPreview.style.filter, setFilterValue);
  }
  init();
})();

