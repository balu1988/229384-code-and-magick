'use strict';

var markForm = document.querySelector('.review-form-group-mark'); //звезды
var nameForm = document.querySelector('.review-form-field-name'); //логин
var recallForm = document.querySelector('.review-form-field-text'); //отзыв
var submitForm = document.querySelector('.review-submit'); //кнопка сабмит
var controlNameLabel = document.querySelector('.review-fields-name'); //лейбл имя
var controlRecallLabel = document.querySelector('.review-fields-text'); //лейбл отзыв
var controlGlobalLabel = document.querySelector('.review-fields'); // лейбл общий
var commonForm = document.querySelector('.review-form'); // вся форма
var bornDate = new Date('1906-12-09'); // дата рождения Хоппер
var nowDate = new Date(); // сегодняшняя дата
nameForm.value = window.Cookies.get('review-name'); // по умолчанию выдавать в поле name значение из куки
document.querySelector('#review-mark-' + window.Cookies.get('review-mark')).checked = true; // выставляет по умолчанию оценку

function daysAfterBirthday() { // вычисляю количество дней после посл дня рождения
  var year = nowDate.getFullYear();
  var day = bornDate.getDate();
  var month = bornDate.getMonth() + 1;
  var lastBirthdayStr = year + '-' + month + '-' + day;
  var lastBirthday = new Date(lastBirthdayStr);
  if (lastBirthday > nowDate) {
    year = year - 1;
    lastBirthdayStr = year + '-' + month + '-' + day;
    lastBirthday = new Date(lastBirthdayStr);
  }
  var daysDifference = Math.floor((nowDate - lastBirthday) / (24 * 60 * 60 * 1000));
  return daysDifference;
}

commonForm.onsubmit = function() { // записываю в куки по сабмиту
  window.Cookies.set('review-mark', checkStar(), {expires: daysAfterBirthday()});
  window.Cookies.set('review-name', nameForm.value, {expires: daysAfterBirthday()});
};
document.write(document.cookie);

nameForm.required = true; // указываю, что поле обязательное

// function validateRecallForm() { // указываю, что поле обязательное, если оценка 3 или 2 или 1
//   if (markForm.elements[2].checked || markForm.elements[3].checked || markForm.elements[4].checked) {
//     recallForm.required = true;
//   } else {
//     recallForm.required = false;
//   }
// }
function validateRecallForm() { // указываю, что поле обязательное, если оценка 3 или 2 или 1
  var isFormRequired = markForm.elements[2].checked || markForm.elements[3].checked || markForm.elements[4].checked;
  recallForm.required = isFormRequired;
}

function checkNameValidity() { // проверка имени и откл сабмита
  if (nameForm.value === null || nameForm.value === '') {
    controlNameLabel.classList.remove('invisible');
    submitForm.disabled = true;
  } else {
    controlNameLabel.classList.add('invisible');
    submitForm.disabled = false;
  }
}

function checkRecallValidity() { // проверка отзыва и откл сабмита
  if (recallForm.value === null || recallForm.value === '') {
    controlRecallLabel.classList.remove('invisible');
    submitForm.disabled = true;
  } else {
    controlRecallLabel.classList.add('invisible');
    submitForm.disabled = false;
  }
}

function hideGlobalLabel() { // оба условия ок, пропадает лейбл с советами
  if (recallForm.value && nameForm.value) {
    controlGlobalLabel.classList.add('invisible');
  } else {
    controlGlobalLabel.classList.remove('invisible');
  }
}

function checkStar() { // находит выбранную оценку
  var star = document.querySelector('input[name="review-mark"]:checked'); // выбранная оценка - звезда
  return star.value;
}

for (var i = 0; i < markForm.elements.length; i++ ) { // проверка каждый раз при изменении оценок
  markForm.elements[i].onchange = function() {
    validateRecallForm();
    checkStar();
  };
}

nameForm.oninput = function() { // проверка каждый раз при изменении формы с именем
  checkNameValidity();
  hideGlobalLabel();
};

recallForm.oninput = function() { // проверка каждый раз при изменении формы с отзывом
  checkRecallValidity();
  hideGlobalLabel();
};

// validateRecallForm();
// checkNameValidity();
// checkRecallValidity();
// hideGlobalLabel();

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
