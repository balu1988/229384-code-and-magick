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

Gallery.prototype.show = function(pic) {
  var self = this;

  this.closeControl.onclick = function() {
    self.hide();
  };

  this.previousControl.onclick = function() {
    if (self.activePicture > 0) {
      self.show(--self.activePicture);
    }
  };

  this.nextControl.onclick = function() {
    if (self.activePicture < self.pictures.length - 1) {
      self.show(++self.activePicture);
    }
  };

  this.container.classList.remove('invisible');
  this.setActivePicture(pic);
};

Gallery.prototype.hide = function() {
  this.container.classList.add('invisible');
  this.nextControl.onclick = null;
  this.previousControl.onclick = null;
  this.closeControl.onclick = null;
};

Gallery.prototype.setActivePicture = function(pic) {
  this.activePicture = pic;
  var photo = new Image();
  photo.src = this.pictures[this.activePicture];
  if (galleryPreview.querySelector('img')) {
    galleryPreview.removeChild(galleryPreview.querySelector('img'));
    galleryPreview.appendChild(photo);
  } else {
    galleryPreview.appendChild(photo);
  }
  this.activePictureNumber.textContent = this.activePicture + 1;
  this.picturesNumber.textContent = this.pictures.length;
};

module.exports = Gallery;
