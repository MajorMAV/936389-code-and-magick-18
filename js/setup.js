'use strict';
(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.setup = {
    ENTER_KEY: 13,
    ESC_KEY: 27
  };

  // Инициализирует элемент отображения волшебника
  var createWizardElement = function (template, optionsSource) {
    var clone = template.cloneNode(true);
    clone.querySelector('.setup-similar-label').innerText = optionsSource.name;
    clone.querySelector('.wizard-coat').style.fill = optionsSource.colorCoat;
    clone.querySelector('.wizard-eyes').style.fill = optionsSource.colorEyes;
    return clone;
  };

  // Наолняем DocumentFragment элементами отображения волшебников
  var createDocumentFragment = function (options) {
    var docFragment = document.createDocumentFragment();
    options.forEach(function (option) {
      docFragment.appendChild(createWizardElement(wizardTemplate, option));
    });
    return docFragment;
  };

  var getIndexGenerator = function (maxNumber) {
    var index = 0;
    return function () {
      if (index >= maxNumber) {
        index = 0;
      } else {
        index++;
      }
      return index;
    };
  };

  var setWizadrElementColor = function (wizardElement, color, property) {
    switch (property) {
      case 'background':
        wizardElement.style.backgroundColor = color;
        return;
      default:
        wizardElement.style.fill = color;
    }
  };

  var createHandler = function (wizardElement, values, property) {
    var getIndex = getIndexGenerator(values.length);
    return function () {
      setWizadrElementColor(wizardElement, values[getIndex()], property);
    };
  };

  var createErrorElement = function () {
    var p = document.createElement('p');
    p.style.position = 'fixed';
    p.style.zIndex = 1000;
    p.style.top = '50px';
    p.style.lef = '0';
    p.style.width = '100%';
    p.style.backgroundColor = 'red';
    p.style.textAlign = 'center';
    p.id = 'error-message';
    return p;
  };

  window.setup.renderWizards = function (wizards) {
    var subWizards = wizards.length > 4 ? wizards.slice(0, 4) : wizards;

    // Вставляем эмеленты отображения волшебников в документ
    document.querySelector('.setup-similar-list')
      .appendChild(createDocumentFragment(subWizards));
  };
  window.setup.clearWizadrs = function () {
    document.querySelector('.setup-similar-list').innerHTML = '';
  };

  window.setup.showError = function (errorMessage) {
    var errorElement = createErrorElement();
    errorElement.textContent = errorMessage;
    document.body.appendChild(errorElement);

    var closeError = function () {
      document.body.removeChild(errorElement);
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyDownHandler);
    };

    var clickHandler = function () {
      closeError();
    };
    var keyDownHandler = function () {
      closeError();
    };
    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyDownHandler);
  };

  // Ищем template для создания элементов отображения волшебнтков
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


  var wizardEyesBlock = document.querySelector(' .setup-wizard .wizard-eyes');
  var wizardCoat = document.querySelector(' .setup-wizard .wizard-coat');
  var fireball = document.querySelector('.setup-fireball-wrap');

  var wizardEyesClickHandler = createHandler(wizardEyesBlock, EYES_COLORS);
  var wizardCoatClickHandler = createHandler(wizardCoat, COAT_COLORS);
  var fireballClickHandler = createHandler(fireball, FIREBALL_COLORS, 'background');

  wizardEyesBlock.addEventListener('click', wizardEyesClickHandler);
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  fireball.addEventListener('click', fireballClickHandler);
})();
