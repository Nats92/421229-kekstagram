'use strict';

(function () {
  var levelLine = document.querySelector('.upload-effect-level-line');
  var pin = levelLine.querySelector('.upload-effect-level-pin');
  var val = levelLine.querySelector('.upload-effect-level-val');

  function defaultingPin(isHide) {
    var DEFAULT_OFFSET = '91px';
    pin.style.left = DEFAULT_OFFSET;
    val.style.width = DEFAULT_OFFSET;
    if (isHide) {
      window.effectLevel.classList.add('hidden');
    } else {
      window.effectLevel.classList.remove('hidden');
    }
  }
  window.filterObj = {
    'effect-none': {
      name: '',
      defaultVal: ''
    },
    'effect-chrome': {
      name: 'grayscale(%)',
      defaultVal: 0.2,
      filterVal: function (pinOfsL, elWidth) {
        return pinOfsL / elWidth;
      }
    },
    'effect-sepia': {
      name: 'sepia(%)',
      defaultVal: 0.2,
      filterVal: function (pinOfsL, elWidth) {
        return pinOfsL / elWidth;
      }
    },
    'effect-marvin': {
      name: 'invert(%)',
      defaultVal: 0.2,
      filterVal: function (pinOfsL, elWidth) {
        return pinOfsL / elWidth;
      }
    },
    'effect-phobos': {
      name: 'blur(%)',
      defaultVal: '0.6px',
      filterVal: function (pinOfsL, elWidth) {
        return pinOfsL * (3 / elWidth) + 'px';
      }
    },
    'effect-heat': {
      name: 'brightness(%)',
      defaultVal: 0.6,
      filterVal: function (pinOfsL, elWidth) {
        return pinOfsL * (3 / elWidth);
      }
    }
  };

  window.initializeFilters = function (element, callback) {
    if (element !== window.filterName) {
      var uploadEffectPreview = document.querySelectorAll('.upload-effect-preview');
      for (var j = 0; j < uploadEffectPreview.length; j++) {
        uploadEffectPreview[j].addEventListener('click', function (evt) {
          window.filterName = evt.target.parentElement.htmlFor.replace('upload-', '');
          defaultingPin(window.filterName === 'effect-none');
          callback(window.filterName, window.filterObj[window.filterName].defaultVal);
        });
      }
    }
    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
// получение начальных координат с перемещением точки отсчета из левого верхнего угла в середину ползунка
      var startCoords = {
        x: evt.clientX - 0.5 * evt.currentTarget.clientWidth,
        y: evt.clientY - 0.5 * evt.currentTarget.clientHeight
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        var lineWidth = levelLine.clientWidth;
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y
        };

        var estimatedCoord = pin.offsetLeft - shift.x;
        if (estimatedCoord < 0 || estimatedCoord > lineWidth) {
          return;
        }
        pin.style.left = (pin.offsetLeft - shift.x) + 'px';
        val.style.width = pin.style.left;
        startCoords.x = moveEvt.clientX;
        callback(window.filterName, window.filterObj[window.filterName].filterVal(pin.offsetLeft, lineWidth));
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
