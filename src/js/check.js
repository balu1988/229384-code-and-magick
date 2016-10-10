'use strict';

var getMessage = function (a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
        return 'Я никуда не попал';
    }
  } else if (typeof a === 'number') {
  return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  } else if (Array.isArray(a) && !Array.isArray(b)) {
      var numberOfSteps = 0;
    for (var i = 0; i < a.length; i++) {
    numberOfSteps += a[i];
    }
    return 'Я прошёл ' + numberOfSteps + ' шагов';
  } else if (Array.isArray(a) && Array.isArray(b)) {
    var distancePath = 0;
    for (var j = 0; j < a.length; j++) {
      distancePath += a[j] * b[j];
    }
    return 'Я прошёл ' + distancePath + ' метров';
    }
  return 'Переданы некорректные данные';
};
