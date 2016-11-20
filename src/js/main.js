'use strict';

var form = require('./form');
var Game = require('./game');
var Gallery = require('./gallery');
require('./reviews');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};

var photoGalleryPics = document.querySelectorAll('.photogallery-image img');

var photoGalleryPicsAdresses = [];

photoGalleryPics.forEach(function(element) {
  photoGalleryPicsAdresses.push(element.src);
});

var gallery = new Gallery(photoGalleryPicsAdresses);

var photogalleryLinks = document.querySelectorAll('.photogallery-image');

photogalleryLinks.forEach(function(element, index) {
  element.onclick = setInitialPicture(index);
});

function setInitialPicture(pic) {
  return function() {
    gallery.show(pic);
  };
}
