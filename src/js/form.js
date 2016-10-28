'use strict';

var markForm = document.querySelector('.review-form-group-mark'); //звезды
var nameForm = document.querySelector('.review-form-field-name'); //логин
var recallForm = document.querySelector('.review-form-field-text'); //отзыв
var submitForm = document.querySelector('.review-submit'); //кнопка сабмит
var controlNameForm = document.querySelector('.review-fields-name');

nameForm.required = true; // указываю, что поле обязательное

function validateRecallForm() { // указываю, что поле обязательное, если оценка 3 или 2 или 1
  if (markForm.elements[2 || 3 || 4].checked === true) {
    recallForm.required = true;
  }
}

function checkValidity() { // пока проверка имени и откл сабмита
  // if (!nameForm.value === null || !nameForm.value === '') {
  // if (blablabla === !null || blablabla === !'') {
  //   controlNameForm.classList.add('invisible'); // спрятать лэйбл имя
  //   submitForm.setAttribute('disabled', false); // сабмит disabled - выкл
  // } else {
  //   controlNameForm.classList.remove('invisible');
  //   submitForm.setAttribute('disabled', true); // сабмит disabled - выкл
  // }
  if (nameForm.value === null || nameForm.value === '') {
    controlNameForm.classList.remove('invisible');
    submitForm.disabled = true;
  } else {
    controlNameForm.classList.add('invisible');
    submitForm.disabled = false;
  }
}

nameForm.oninput = function() { // проверка каждый раз при изменении формы
  checkValidity();
};

validateRecallForm();
checkValidity();


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
