'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');

  function onEscPress(evt) {
    if (evt.keyCode === window.data.KEY_CODES.ESC) {
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
    var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', target.querySelector('img').getAttribute('src'));
    galleryOverlay.querySelector('.likes-count').textContent = like.childNodes[0].data;
    galleryOverlay.querySelector('.comments-count').textContent = comment.childNodes[0].data;

    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    galleryOverlayClose.addEventListener('keydown', function () {
      if (evt.keyCode === window.data.KEY_CODES.ENTER) {
        onCloseClick();
      }
    });
    galleryOverlayClose.addEventListener('click', onCloseClick);
  }

  function addHandlers() {
    window.picturesList.addEventListener('click', onPictureClick);
    window.picturesList.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.KEY_CODES.ENTER) {
        onEnterPress(evt);
      }
    });
  }
  addHandlers();

})();
