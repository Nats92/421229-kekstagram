'use strict';

var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
var photoPreview = document.querySelector('.effect-image-preview');

window.uploadFile.addEventListener('change', function () {
  // debugger
  var file = window.uploadFile.files[0];
  var fileName = file.name.toLowerCase();

  var matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      photoPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});
