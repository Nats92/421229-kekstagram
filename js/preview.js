'use strict';

(function () {
  window.KEY_CODES = {
    ESC: 27,
    ENTER: 13
  };
  window.uploadFile = document.querySelector('#upload-file');
  window.uploadOverlay = document.querySelector('.upload-overlay');

  function onEscapePress(evt) {
    if ((evt.keyCode === window.KEY_CODES.ESC) && (evt.target.className !== 'upload-form-description')) {
      closeFraming();
    }
  }

  var uploadFormCancelButton = document.querySelector('.upload-form-cancel');
  function openFraming() {
    window.effectLevel = document.querySelector('.upload-effect-level');
    window.effectLevel.classList.add('hidden');
    window.uploadFile.classList.add('hidden');
    window.uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);
    uploadFormCancelButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEY_CODES.ENTER) {
        closeFraming();
      }
    });
  }

  function closeFraming() {
    window.uploadOverlay.classList.add('hidden');
    window.uploadFile.classList.remove('hidden');
    document.removeEventListener('keydown', onEscapePress);
    uploadFormCancelButton.removeEventListener('keydown', closeFraming);
  }

  function manageFraming() {
    window.uploadFile.addEventListener('change', openFraming);
    uploadFormCancelButton.addEventListener('click', closeFraming);
    document.querySelector('.upload-form-cancel').addEventListener('click', closeFraming);
  }
  manageFraming();
})();

