'use strict';
(function () {

  var WIZARD_COUNT = 4;
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.setup = {
    ENTER_KEY: 13,
    ESC_KEY: 27
  };

  // Выдает случайный элемент массива
  var getRandomElement = function (array) {
    var index = Math.round(Math.random() * (array.length - 1));
    return array[index];
  };

  // Создает объект настроек волшебника
  var createWizard = function () {
    return {
      name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };
  };

  // Создает массив настроек волшебников
  var createWizards = function (count) {
    var wizardArray = [];
    for (var j = 0; j < count; j++) {
      wizardArray.push(createWizard());
    }
    return wizardArray;
  };

  // Инициализирует элемент отображения волшебника
  var createWizardElement = function (template, optionsSource) {
    var clone = template.cloneNode(true);
    clone.querySelector('.setup-similar-label').innerText = optionsSource.name;
    clone.querySelector('.wizard-coat').style.fill = optionsSource.coatColor;
    clone.querySelector('.wizard-eyes').style.fill = optionsSource.eyesColor;
    return clone;
  };

  // Наолняем DocumentFragment элементами отображения волшебников
  var createDocumentFragment = function (template, options) {
    var docFragment = document.createDocumentFragment();
    options.forEach(function (option) {
      docFragment.appendChild(createWizardElement(template, option));
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

  // Создаем массив настроек
  var wizards = createWizards(WIZARD_COUNT);
  // Ищем template для создания элементов отображения волшебнтков
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // Вставляем эмеленты отображения волшебников в документ
  document.querySelector('.setup-similar-list')
    .appendChild(createDocumentFragment(wizardTemplate, wizards));
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
