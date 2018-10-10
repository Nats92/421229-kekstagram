'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var hashtag = uploadForm.querySelector('.upload-form-hashtags');
  var formDescription = uploadForm.querySelector('.upload-form-description');
  var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');

  function testUnique(arr) {
    var iMax = arr.length;
    var testObj = {};
    var result = false;

    for (var i = 0; i < iMax; i++) {

      result = result || testObj.hasOwnProperty(arr[i]);
      testObj[arr[i]] = arr[i];
    }

    return !result;
  }

  // выделение красной рамкой если значение не валидно
  function makeInvalidFieldRed(formField) {
    if (!formField.validity.valid) {
      formField.style.border = '2px solid red';
    } else {
      formField.style.border = '';
    }
  }
  uploadForm.addEventListener('input', function (evt) {
    var errors = [];
    var tagsParsed = hashtag.value.split(' ');

    if (tagsParsed.length === 0 || (tagsParsed.length === 1 && tagsParsed[0] === '')) {
      return;
    }

    if (tagsParsed.some(function (item) {
      return item.match(/#.{1,20}\S#/) || item.length > 21;
    })) {
      errors.push('Хэш-теги должны быть разделены пробелом и иметь длину не более 20 символов.');
    }

    if (tagsParsed.length > 5) {
      errors.push('Нельзя указать больше пяти хэш-тегов.');
    }

    if (!testUnique(tagsParsed)) {
      errors.push('Один и тот же хэш-тег не может быть использован дважды');
    }

    if (tagsParsed.some(function (item) {
      return item !== '' && !item.match(/#[A-zА-яЁё0-9]{1,20}/);
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
    makeInvalidFieldRed(hashtag);
    makeInvalidFieldRed(formDescription);
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

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; z-index: 100; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); text-align: center; padding-top: 100px; box-sizing: border-box; font-size: 40px; color: #ff0000';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function resetForm() {
    document.querySelector('#upload-effect-none').checked = true;
    document.querySelector('.effect-image-preview').style.filter = '';
    uploadForm.reset();
    window.resetScale();
    document.querySelector('#upload-file').value = '';
  }

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadForm), function () {
      window.uploadOverlay.classList.add('hidden');
    }, errorHandler);
    resetForm();
    evt.preventDefault();
  });

  uploadFormCancel.addEventListener('click', function () {
    resetForm();
  })
})();

