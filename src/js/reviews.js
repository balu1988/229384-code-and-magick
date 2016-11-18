'use strict';

var getJSONPData = require('./load.js');
var getReviewElement = require('./review.js');

var reviewsFilter = document.querySelector('.reviews-filter'); // блок с фильтрами
reviewsFilter.classList.add('invisible'); // прячет блок с фильтрами

var container = document.querySelector('.reviews-list'); // сюда копируем созданные элементы

getJSONPData('http://localhost:1507/api/reviews?callback=JSONPCallback', function(reviews) {
  reviews.forEach(function(review) {
    var element = getReviewElement(review);
    container.appendChild(element);
  });
});

reviewsFilter.classList.remove('invisible'); // показывает блок с фильтрами
