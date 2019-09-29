'use strict';

(function () {
  var INIT_WINDOW_TOP = '';
  var INIT_WINDOW_LEFT = '';

  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');
  var userName = document.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var upload = setup.querySelector('.upload');

  var initWindowStartPosition = function () {
    setup.style.left = INIT_WINDOW_LEFT;
    setup.style.top = INIT_WINDOW_TOP;
  };

  // Показывает окно настроек
  var openSetup = function () {
    initWindowStartPosition();
    setup.classList.remove('hidden');
    // Показываем волшебников
    setup.querySelector('.setup-similar').classList.remove('hidden');
    setupClose.addEventListener('click', setupCloseClickHandler);
    setupClose.addEventListener('keydown', setupCloseKeydownHandler);
    setupSubmit.addEventListener('click', setupSubmitClickHandler);
  };

  // Скрывает окно настроек
  var closeSetup = function () {
    setup.classList.add('hidden');
    setupClose.removeEventListener('click', setupCloseClickHandler);
    setupClose.removeEventListener('keydown', setupCloseKeydownHandler);
    setupSubmit.removeEventListener('click', setupSubmitClickHandler);
  };

  var setupOpenClickHandler = function () {
    openSetup();
  };

  var setupOpenKeydownHandler = function (evt) {
    if (evt.keyCode === window.setup.ENTER_KEY) {
      openSetup();
    }
  };

  var setupCloseClickHandler = function () {
    closeSetup();
  };

  var setupCloseKeydownHandler = function (evt) {
    if (evt.keyCode === window.setup.ENTER_KEY) {
      closeSetup();
    }
  };

  var documnetKeydownHandler = function (evt) {
    if (evt.keyCode === window.setup.ESC_KEY &&
      userName !== document.activeElement) {
      closeSetup();
    }
  };

  var setupSubmitClickHandler = function () {
    var form = document.querySelector('.setup-wizard-form');
    if (form.checkValidity()) {
      form.submit();
    }
  };

  setupOpen.addEventListener('click', setupOpenClickHandler);
  setupOpen.addEventListener('keydown', setupOpenKeydownHandler);
  document.addEventListener('keydown', documnetKeydownHandler);

  var uploadMousedownHandler = function (evt) {
    evt.preventDefault();
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      var uploadClickHandler = function (clkEvt) {
        clkEvt.preventDefault();
        upload.removeEventListener('click', uploadClickHandler);
      };

      if (dragged) {
        upload.addEventListener('click', uploadClickHandler);
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };


    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  upload.addEventListener('mousedown', uploadMousedownHandler);
})();
