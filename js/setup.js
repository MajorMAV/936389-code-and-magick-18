'use strict';

// Открывает окно настроек волшебника
var openSetup = function () {
  var WIZARD_COUNT = 4;
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  // Показываем окно настроек
  document.querySelector('.setup').classList.remove('hidden');

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

  // Создаем массив настроек
  var wizards = createWizards(WIZARD_COUNT);

  // Ищем template для создания элементов отображения волшебнтков
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var wizardDocumentFragment = document.createDocumentFragment();

  // Инициализирует элемент отображения волшебника
  var createWizardElement = function (template, optionsSource) {
    var clone = template.cloneNode(true);
    clone.querySelector('.setup-similar-label').innerText = optionsSource.name;
    clone.querySelector('.wizard-coat').style.fill = optionsSource.coatColor;
    clone.querySelector('.wizard-eyes').style.fill = optionsSource.eyesColor;
    return clone;
  };

  // Создаем элементы отображения волшебников
  for (var i = 0; i < wizards.length; i++) {
    wizardDocumentFragment.appendChild(createWizardElement(wizardTemplate, wizards[i]));
  }

  // Вставляем эмеленты отображения волшебников в документ
  document.querySelector('.setup-similar-list').appendChild(wizardDocumentFragment);

  // Показываем волшебников
  document.querySelector('.setup-similar').classList.remove('hidden');
};

openSetup();
