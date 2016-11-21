'use strict';

var loadReviews = require('./load.js');
var Review = require('./review.js');

var reviewsFilter = document.querySelector('.reviews-filter'); // блок с фильтрами
var container = document.querySelector('.reviews-list'); // сюда копируем созданные элементы
var reviewsMore = document.querySelector('.reviews-controls-more');
var pageNumber = 0;
var pageSize = 3;
var currentFilter = 'all';

reviewsFilter.classList.add('invisible'); // прячет блок с фильтрами

var getReviews = function(reviews) {
  reviews.forEach(function(review) {
    var rev = new Review(review);
    container.appendChild(rev.element);
  });
};

var loadPageReviews = function(currentPageNumber, filter) {
  loadReviews('/api/reviews', {
    from: currentPageNumber * pageSize,
    to: currentPageNumber * pageSize + pageSize,
    filter: filter
  }, getReviews);
};

var changeFilters = function(filterID) {
  container.innerHTML = '';
  currentFilter = filterID;
  pageNumber = 0;
  loadPageReviews(pageNumber++, currentFilter);
};

reviewsMore.addEventListener('click', function() {
  loadPageReviews(pageNumber++, currentFilter);
});

reviewsFilter.addEventListener('change', function(evt) {
  changeFilters(evt.target.id);
});

changeFilters(currentFilter);

reviewsFilter.classList.remove('invisible'); // показывает блок с фильтрами
