'use strict';

var getReview = function(review) { // возвращает DOM элементы
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

var Review = function(data) {
  this.data = data;
  this.element = getReview(this.data);
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
  var self = this;
  this.quizAnswerYes.onclick = function() {
    self.onReviewYesClick();
  };
  this.quizAnswerNo.onclick = function() {
    self.onReviewNoClick();
  };
};

Review.prototype = {
  onReviewYesClick: function() {
    this.quizAnswerNo.classList.remove('review-quiz-answer-active');
    this.quizAnswerYes.classList.add('review-quiz-answer-active');
  },
  onReviewNoClick: function() {
    this.quizAnswerYes.classList.remove('review-quiz-answer-active');
    this.quizAnswerNo.classList.add('review-quiz-answer-active');
  },
  remove: function() {
    this.quizAnswerYes.onclick = null;
    this.quizAnswerNo.onclick = null;
  }
};

module.exports = Review;
