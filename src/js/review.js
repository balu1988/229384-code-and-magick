'use strict';

module.exports = function(review) { // возвращает DOM элементы
  var template = document.querySelector('template'); // находим шаблон
  var templateContainer = 'content' in template ? template.content : template; // содержимое шаблона
  var reviewElement = templateContainer.querySelector('.review').cloneNode(true); // копируем article
  reviewElement.querySelector('.review-rating').textContent = review.rating;
  reviewElement.querySelector('.review-text').textContent = review.description;

  var photo = new Image(124, 124);

  photo.onload = function() {
    reviewElement.querySelector('.review-author').src = review.author.picture;
    reviewElement.querySelector('.review-author').alt = review.author.name;
  };

  photo.onerror = function() {
    reviewElement.classList.add('review-load-failure');
  };

  photo.src = review.author.picture;
  photo.alt = review.author.name;

  return reviewElement;
};
