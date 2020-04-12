
import {COLORS} from "../const.js";

const descriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const defaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrElement = (arr) => {
  return arr[getRandomNumber(0, arr.length)];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diff = sign * getRandomNumber(0, 8);

  targetDate.getDate(targetDate.getDate() + diff);

  return targetDate;
};

const generateRepeatingDate = () => {
  const repeatingDate = {};
  for (const prop of Object.keys(defaultRepeatingDays)) {
    repeatingDate[prop] = Math.random() > 0.5;
  }
  return repeatingDate;
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrElement(descriptionItems),
    dueDate,
    repeatingDays: dueDate ? defaultRepeatingDays : generateRepeatingDate(),
    color: getRandomArrElement(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.round() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTask);
};

export {generateTask, generateTasks};
