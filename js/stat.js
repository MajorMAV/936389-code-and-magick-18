'use strict';

window.renderStatistics = function (ctx, names, times) {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CONGRATULATION_X = 20;
  var CONGRATULATION_Y = 20;
  var LINE_HEIGHT = 20;
  var GISTOGRAM_X = 20;
  var GISTOGRAM_Y = 90;
  var GISTOGRAM_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var COLUMN_WHITESPASE = 50;
  var CLOUD_COLOR = '#ffffff';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var TEXT_COLOR = '#000000';
  var LEGENT_MARGIN_TOP = 5;

  // Рисуем тень облака
  ctx.fillStyle = CLOUD_SHADOW_COLOR;
  ctx.fillRect(CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);

  // Рисуем облако
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = TEXT_COLOR;
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);


  var getXInsideGamePlace = function (x) {
    return CLOUD_X + x;
  };

  var getYInsideGamePlace = function (y) {
    return CLOUD_Y + y;
  };

  // Пишем текст поздравления
  ctx.font = '16px PT Mono';
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', getXInsideGamePlace(CONGRATULATION_X), getYInsideGamePlace(CONGRATULATION_Y));
  ctx.fillText('Список результатов:', getXInsideGamePlace(CONGRATULATION_X), getYInsideGamePlace(CONGRATULATION_Y + LINE_HEIGHT));

  // Вычисляет высоту колонки в гистограмме
  var getColumnHeight = function (time, maxTime) {
    return GISTOGRAM_HEIGHT * time / maxTime;
  };

  // Вычисляет насчальную координату Y колонки гистограммы
  var getColumnY = function (columnHeight) {
    return GISTOGRAM_Y + GISTOGRAM_HEIGHT - columnHeight;
  };

  // Вычисляет цвет колонки гистограммы
  var getClomunColor = function (name) {
    var randomSaturation = Math.round(Math.random() * 100);
    return name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(250, ' + randomSaturation + '%, 50%)';
  };

  // Находим максимально время
  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  // Рисуем гистограмму
  for (i = 0; i < names.length; i++) {
    // Задаем цвет для легенды
    ctx.fillStyle = TEXT_COLOR;
    // Вычисляем высоту столбца
    var columnHeight = getColumnHeight(times[i], maxTime);
    // Ищем начальную точку столбца
    var columnX = getXInsideGamePlace(GISTOGRAM_X + i * (COLUMN_WIDTH + COLUMN_WHITESPASE));
    var columnY = getYInsideGamePlace(getColumnY(columnHeight));
    // Пишем легенду столбца
    ctx.fillText(names[i], columnX, getYInsideGamePlace(GISTOGRAM_Y + GISTOGRAM_HEIGHT + LEGENT_MARGIN_TOP));
    ctx.fillText(Math.round(times[i]), columnX, columnY - LINE_HEIGHT);
    // Задаем цвет столбца гистограммы
    ctx.fillStyle = getClomunColor(names[i]);
    // Рисуем столбец
    ctx.fillRect(columnX, columnY, COLUMN_WIDTH, columnHeight);
  }
};
