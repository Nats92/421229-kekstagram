'use strict';

(function () {
  var valueButton = window.uploadOverlay.querySelector('.upload-resize-controls-value');
  var valueNumber = Number(valueButton.value.replace('%', ''));
  var step = Number(valueButton.getAttribute('step'));
  var minSize = Number(valueButton.getAttribute('minlength'));
  var maxSize = Number(valueButton.getAttribute('maxlength'));

  window.initializeScale = function (scaleElement, callback) {
    function onScaleButtonsClick(evt) {
      var incButton = window.uploadOverlay.querySelector('.upload-resize-controls-button-inc');
      var decButton = window.uploadOverlay.querySelector('.upload-resize-controls-button-dec');

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
      valueButton.setAttribute('value', valueNumber + '%');
      callback(valueNumber);
    }
    scaleElement.addEventListener('click', onScaleButtonsClick);
  };
})();

