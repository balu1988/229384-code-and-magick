'use strict';

var galleryContainer = document.querySelector('.overlay-gallery'); //элемент галереи
var galleryPreviousControl = document.querySelector('.overlay-gallery-control-left'); //элементы переключения фотографии
var galleryNextControl = document.querySelector('.overlay-gallery-control-right'); // элементы переключения фотографии
var galleryActivePictureNumber = document.querySelector('.preview-number-current'); // номер фотографии
var galleryPicturesNumber = document.querySelector('.preview-number-total'); // количество фотографий
var galleryCloseControl = document.querySelector('.overlay-gallery-close'); // элемент закрытия галереи
var galleryPreview = document.querySelector('.overlay-gallery-preview');

var Gallery = function(data) {
  this.pictures = data;
  this.activePicture = 0;
  this.container = galleryContainer;
  this.previousControl = galleryPreviousControl;
  this.nextControl = galleryNextControl;
  this.activePictureNumber = galleryActivePictureNumber;
  this.picturesNumber = galleryPicturesNumber;
  this.closeControl = galleryCloseControl;
};

Gallery.prototype.show = function(activePicture) {
  var self = this;

  this.closeControl.onclick = function() {
    self.hide();
  };

  this.previousControl.onclick = function() {
    self.show(--activePicture);
  };

  this.nextControl.onclick = function() {
    self.show(++activePicture);
  };

  this.container.classList.remove('invisible');
  this.setActivePicture(activePicture);
};

Gallery.prototype.hide = function() {
  this.container.classList.add('invisible');
  this.nextControl.onclick = null;
  this.previousControl.onclick = null;
  this.closeControl.onclick = null;
};

Gallery.prototype.setActivePicture = function(activePicture) {
  this.activePicture = activePicture;
  var photo = new Image();
  photo.src = this.pictures[this.activePicture];
  galleryPreview.appendChild(photo);
  this.activePictureNumber.textContent = this.activePicture + 1;
};

module.exports = Gallery;
