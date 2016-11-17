'use strict';

var galleryContainer = document.querySelector('.overlay-gallery'); //элемент галереи
var galleryPreviousControl = document.querySelector('.overlay-gallery-control-left'); //элементы переключения фотографии
var galleryNextControl = document.querySelector('.overlay-gallery-control-right'); // элементы переключения фотографии
var galleryActivePictureNumber = document.querySelector('.preview-number-current'); // номер фотографии
var galleryPicturesNumber = document.querySelector('.preview-number-total'); // количество фотографий
var galleryCloseControl = document.querySelector('.overlay-gallery-close'); // элемент закрытия галереи

// var galleryPictures = [];
var activePicture = 0;

var Gallery = function(data) { //data?
  this.pictures = data;
  this.activePicture = activePicture;
  this.container = galleryContainer;
  this.previousControl = galleryPreviousControl;
  this.nextControl = galleryNextControl;
  this.activePictureNumber = galleryActivePictureNumber;
  this.picturesNumber = galleryPicturesNumber;
  this.closeControl = galleryCloseControl;
};

Gallery.prototype = {
  show: function() {
    // var self = this;

    this.closeControl.onclick = function() {

    };

    this.previousControl.onclick = function() {

    };

    this.nextControl.onclick = function() {

    };

    this.container.classList.remove('invisible');
    this.setActivePicture();
  },

  hide: function() {
    this.container.classList.add('invisible');
    this.nextControl.onclick = null;
    this.previousControl.onclick = null;
    this.closeControl.onclick = null;
  },

  setActivePicture: function() {

  },
};

module.exports = Gallery;
