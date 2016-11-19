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

for(var i = 0; i < photoGalleryPics.length; i++) {
  photoGalleryPicsAdresses.push(photoGalleryPics[i].src); //значения src скринов ("http://localhost:1507/img/screenshots/1.png")
}

var gallery = new Gallery(photoGalleryPicsAdresses);

var photogalleryLinks = document.querySelectorAll('.photogallery-image');
for(var j = 0; j < photogalleryLinks.length; j++) {
  photogalleryLinks[j].onclick = setInitialPicture(j);
}

function setInitialPicture(pic) {
  return function() {
    gallery.show(pic);
  };
}
