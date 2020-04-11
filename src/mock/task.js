
import {COLORS} from "../const.js";

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DefaultRepeatingDays = {
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
  return Object.assign({}, DefaultRepeatingDays, {
    "mo": Math.random() > 0.5,
    "tu": Math.random() > 0.5,
    "we": Math.random() > 0.5,
    "th": Math.random() > 0.5,
    "fr": Math.random() > 0.5,
    "sa": Math.random() > 0.5,
    "su": Math.random() > 0.5,
  });
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrElement(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDate(),
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
