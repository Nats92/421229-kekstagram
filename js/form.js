'use strict';

(function () {
  var valueButton = window.uploadOverlay.querySelector('.upload-resize-controls-value');
  var valueNumber = Number(valueButton.value.replace('%', ''));
  var step = Number(valueButton.getAttribute('step'));
  var minSize = Number(valueButton.getAttribute('minlength'));
  var maxSize = Number(valueButton.getAttribute('maxlength'));
  var effectImgPreview = document.querySelector('.effect-image-preview');
  var divisor = 100; // делитель для получения дробного числа в transform: scale

  function onIncreaseClick() {
    if (valueNumber >= minSize && valueNumber < maxSize) {
      valueNumber += step;
      effectImgPreview.style = 'transform: scale(' + valueNumber / divisor + ')';
    }
    if (valueNumber > maxSize) {
      valueNumber = maxSize;
      effectImgPreview.style = 'transform: scale(1)';
    }
    return valueButton.setAttribute('value', valueNumber + '%');
  }

  function onDecreaseClick() {
    if (valueNumber > minSize && valueNumber <= maxSize) {
      valueNumber -= step;
      effectImgPreview.style = ('transform: scale(' + valueNumber / divisor + ')');
    }
    if (valueNumber < minSize) {
      valueNumber = minSize;
      effectImgPreview.style = 'transform: scale(0.25)';
    }
    return valueButton.setAttribute('value', valueNumber + '%');
  }

  (function manageResize() {
    var incButton = window.uploadOverlay.querySelector('.upload-resize-controls-button-inc');
    var decButton = window.uploadOverlay.querySelector('.upload-resize-controls-button-dec');
    incButton.addEventListener('click', onIncreaseClick);
    decButton.addEventListener('click', onDecreaseClick);
  })();

  function onFilterClick(evt) {
    effectImgPreview.removeAttribute('class');
    effectImgPreview.setAttribute('class', 'effect-image-preview');
    var name = evt.target.parentElement.htmlFor.replace('upload-', '');
    effectImgPreview.classList.add(name);
  }

  (function addHandler() {
    var uploadEffectPreview = document.querySelectorAll('.upload-effect-preview');
    for (var j = 0; j < uploadEffectPreview.length; j++) {
      uploadEffectPreview[j].addEventListener('click', onFilterClick);
    }
  })();

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
})();

