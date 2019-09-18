'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Показываем окно настроек
var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

// ВЫдает случайный элемент массива
var getRandomElement = function (array) {
  var index = Math.round(Math.random() * (array.length - 1));
  return array[index];
};

// Создаем массив настроек
var wizards = new Array(4);
// Инициализируем массив настроек
for (var i = 0; i < wizards.length; i++) {
  wizards[i] = {
    name: getRandomElement(FIRST_NAMES) + ' ' + getRandomElement(SECOND_NAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
}

// Ищем template для создания элементов отображения волшебнтков
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizardDocumentFragment = document.createDocumentFragment();

// Инициализирует элемент отображения волшебника
var createWizardElement = function (template, optionsSource) {
  var clone = template.cloneNode(true);
  clone.querySelector('.setup-similar-label')
    .innerText = optionsSource.name;
  clone.querySelector('.wizard-coat').style.fill = optionsSource.coatColor;
  clone.querySelector('.wizard-eyes').style.fill = optionsSource.eyesColor;
  return clone;
};

// Создаем элементы отображения волшебников
for (i = 0; i < wizards.length; i++) {
  wizardDocumentFragment.appendChild(createWizardElement(wizardTemplate, wizards[i]));
}

// Вставляем эмеленты отображения волшебников в документ
var setupListElement = document.querySelector('.setup-similar-list');
setupListElement.appendChild(wizardDocumentFragment);

// Показываем волшебников
var setupSimilarElement = document.querySelector('.setup-similar');
setupSimilarElement.classList.remove('hidden');
