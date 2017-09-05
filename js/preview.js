'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  window.uploadOverlay = document.querySelector('.upload-overlay');

  function onEscapePress(evt) {
    if ((evt.keyCode === window.data.KEY_CODES.ESC) && (evt.target.className !== 'upload-form-description')) {
      closeFraming();
    }
  }

  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  function openFraming() {
    window.effectLevel = document.querySelector('.upload-effect-level');
    window.effectLevel.classList.add('hidden');
    uploadFile.classList.add('hidden');
    window.uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);
    uploadFormCancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.KEY_CODES.ENTER) {
        closeFraming();
      }
    });
  }

  function closeFraming() {
    window.uploadOverlay.classList.add('hidden');
    uploadFile.classList.remove('hidden');
    document.removeEventListener('keydown', onEscapePress);
    uploadFormCancel.removeEventListener('keydown', closeFraming);
  }

  function manageFraming() {
    uploadFile.addEventListener('change', openFraming);
    uploadFormCancel.addEventListener('click', closeFraming);
    document.querySelector('.upload-form-cancel').addEventListener('click', closeFraming);
  }

  manageFraming();
})();

