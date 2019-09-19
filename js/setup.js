'use strict';


var WIZARD_COUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];


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
  for (var i = 0; i < options.length; i++) {
    docFragment.appendChild(createWizardElement(template, options[i]));
  }
  return docFragment;
};

// Создаем массив настроек
var wizards = createWizards(WIZARD_COUNT);

// Ищем template для создания элементов отображения волшебнтков
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Показываем окно настроек
document.querySelector('.setup').classList.remove('hidden');

// Вставляем эмеленты отображения волшебников в документ
document.querySelector('.setup-similar-list')
  .appendChild(createDocumentFragment(wizardTemplate, wizards));

// Показываем волшебников
document.querySelector('.setup-similar').classList.remove('hidden');
