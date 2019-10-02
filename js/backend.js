'use strict';

(function () {
  var BACKEND_URL = 'https://js.dump.academy/code-and-magick';

  if (!window.backend) {
    window.backend = {};
  }

  window.backend.load = function (onLoad, onError) {
    var requestOptions = {
      method: 'GET',
      url: BACKEND_URL + '/data',
      loadHandler: onLoad,
      errorHandler: onError
    };
    sendRequest(requestOptions);
  };

  window.backend.save = function (data, onLoad, onError) {
    var requestOptions = {
      data: data,
      method: 'POST',
      url: BACKEND_URL,
      loadHandler: onLoad,
      errorHandler: onError
    };
    sendRequest(requestOptions);
  };

  var sendRequest = function (option) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        option.loadHandler(xhr.response);
      } else {
        option.errorHandler('Статус ответа: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      option.errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      option.errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;

    xhr.open(option.method, option.url);
    if (option.method === 'POST' && option.data) {
      xhr.send(option.data);
    } else {
      xhr.send();
    }
  };
})();
