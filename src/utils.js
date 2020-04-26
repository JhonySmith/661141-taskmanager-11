import {MONTH_NAMES} from "./const.js";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const dateTimeConverter = (isDateShowing, dueDate) => {
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  return {
    date,
    time,
  };
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderSection = (placeInDocument, section, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      placeInDocument.prepend(section);
      break;
    case RenderPosition.BEFOREEND:
      placeInDocument.append(section);
      break;
  }
};
