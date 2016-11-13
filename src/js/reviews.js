'use strict';

var getJSONPData = require('./load');
var getReviewElement = require('./review');

var reviewsFilter = document.querySelector('.reviews-filter'); // блок с фильтрами
reviewsFilter.classList.add('invisible'); // прячет блок с фильтрами

var container = document.querySelector('.reviews-list'); // сюда копируем созданные элементы

// var template = document.querySelector('template'); // находим шаблон
// var templateContainer = 'content' in template ? template.content : template; // содержимое шаблона

// var getJSONPData = function(url, callback) {
//   var elem = document.createElement('script');
//   elem.src = url;
//   document.head.appendChild(elem);
//
//   window.JSONPCallback = function(data) {
//     window.reviews = data;
//     callback(window.reviews);
//   };
// };

getJSONPData('http://localhost:1507/api/reviews?callback=JSONPCallback', function(reviews) {
  reviews.forEach(function(review) {
    container.appendChild(getReviewElement(review));
  });
});

// var getReviewElement = function(review) { // возвращает DOM элементы
//   var reviewElement = templateContainer.querySelector('.review').cloneNode(true); // копируем article
//   reviewElement.querySelector('.review-rating').textContent = review.rating;
//   reviewElement.querySelector('.review-text').textContent = review.description;
//
//   var photo = new Image(124, 124);
//
//   photo.onload = function() {
//     reviewElement.querySelector('.review-author').src = review.author.picture;
//     reviewElement.querySelector('.review-author').alt = review.author.name;
//   };
//
//   photo.onerror = function() {
//     reviewElement.classList.add('review-load-failure');
//   };
//
//   photo.src = review.author.picture;
//   photo.alt = review.author.name;
//
//   return reviewElement;
// };

reviewsFilter.classList.remove('invisible'); // показывает блок с фильтрами
