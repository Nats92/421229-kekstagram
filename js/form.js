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
  var uploadForm = document.getElementById('upload-select-image');
  var hashtag = uploadForm.querySelector('.upload-form-hashtags');
  var formDescription = uploadForm.querySelector('.upload-form-description');

  // выделение красной рамкой если значение не валидно
  function makeInvalidFieldRed() {
     // для поля хэш-тегов
    if (!hashtag.validity.valid) {
      hashtag.style.border = '2px solid red';
    } else {
      hashtag.style.border = '';
    }

    // для поля комментариев
    if (!formDescription.validity.valid) {
      formDescription.style.border = '2px solid red';
    } else {
      formDescription.style.border = '';
    }
  }

  uploadForm.addEventListener('input', function (evt) {
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

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadForm), function () {
      window.uploadOverlay.classList.add('hidden');
    });
    document.getElementById('upload-effect-none').checked = true;
    document.querySelector('.effect-image-preview').style.filter = '';
    window.resetScale();
    document.querySelector('#upload-file').value = '';
    evt.preventDefault();
  });
})();

