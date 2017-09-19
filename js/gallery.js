'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var picturesList = document.querySelector('.pictures');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  function onEscPress(evt) {
    if (evt.keyCode === window.KEY_CODES.ESC) {
      onCloseClick();
    }
  }
  function onEnterPressToOpen(evt) {
    openPicture(evt);
  }
  function onEnterPressToClose(evt) {
    onCloseClick(evt);
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

    galleryOverlayClose.addEventListener('keydown', onEnterPressToClose);
    galleryOverlayClose.addEventListener('click', onCloseClick);
  }

  function addHandlers() {
    picturesList.addEventListener('click', onPictureClick);
    picturesList.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEY_CODES.ENTER) {
        onEnterPressToOpen(evt);
      }
    });
  }
  addHandlers();
})();
