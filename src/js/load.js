'use strict';

// module.exports = function(url, callback) {
//   var elem = document.createElement('script');
//   elem.src = url;
//   document.head.appendChild(elem);
//
//   window.JSONPCallback = function(data) {
//     window.reviews = data;
//     callback(window.reviews);
//   };
// };

module.exports = (function(url, params, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    var reviews = JSON.parse(evt.target.response);
    callback(reviews);
  };

  xhr.open('GET', url +
   '?from=' + (params.from || 0) +
   '&to=' + (params.to || Infinity) +
   '&filter=' + (params.filter || 'default'));

  xhr.send();
});
