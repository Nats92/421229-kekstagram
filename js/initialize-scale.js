'use strict';

(function () {
  var valueButton = window.uploadOverlay.querySelector('.upload-resize-controls-value');
  var valueNumber = Number(valueButton.value.replace('%', ''));
  var step = Number(valueButton.getAttribute('step'));
  var minSize = Number(valueButton.getAttribute('minlength'));
  var maxSize = Number(valueButton.getAttribute('maxlength'));
  var incButton = window.uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var decButton = window.uploadOverlay.querySelector('.upload-resize-controls-button-dec');

  window.resetScale = function () {
    valueNumber = 100;
    valueButton.value = valueNumber + '%';
    document.querySelector('.effect-image-preview').style.transform = 'scale(1)';
  };
  window.initializeScale = function (scaleElement, callback) {
    function onScaleButtonsClick(evt) {
      var currTarg = evt.target;
      if (currTarg === incButton) {
        if (valueNumber >= minSize && valueNumber < maxSize) {
          valueNumber += step;
        }
        if (valueNumber > maxSize) {
          valueNumber = maxSize;
        }
      }
      if (currTarg === decButton) {
        if (valueNumber > minSize && valueNumber <= maxSize) {
          valueNumber -= step;
        }
        if (valueNumber < minSize) {
          valueNumber = minSize;
        }
      }
      valueButton.value = valueNumber + '%';
      callback(valueNumber);
    }
    scaleElement.addEventListener('click', onScaleButtonsClick);
  };
})();

