import {dateTimeConverter} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createButtonMarkup = (name, isActive = true) => {
  const activeClass = isActive ? `` : `card__btn--disabled`;

  return (
    `<button type="button" class="card__btn card__btn--${name} ${activeClass}">
      ${name}
    </button>`
  );
};

const createTaskCardTemlate = (task) => {
  const {description, dueDate, repeatingDays, color} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const {date, time} = dateTimeConverter(isDateShowing, dueDate);

  const isRepeatingDays = Object.values(repeatingDays).some(Boolean);

  const isRepeatDaysClass = isRepeatingDays ? `card-repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const editButton = createButtonMarkup(`edit`);
  const archiveButton = createButtonMarkup(`archive`, !task.isArchive);
  const favoriteButton = createButtonMarkup(`favorites`, !task.isFavorite);

  return (
    `<article class="card card--${color} ${isRepeatDaysClass} ${deadlineClass}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  ${editButton}
                  ${archiveButton}
                  ${favoriteButton}
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">${description}</p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                          <span class="card__date">${date}</span>
                          <span class="card__time">${time}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>`
  );
};

export default class TaskComponent extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskCardTemlate(this._task);
  }

  setOnClick(onObjectClick) {
    this.getElement().querySelector(`.card__btn--edit`)
    .addEventListener(`click`, onObjectClick);
  }

  setOnFavoriteButtonClick(onObjectClick) {
    this.getElement().querySelector(`.card__btn--favorites`)
    .addEventListener(`click`, onObjectClick);
  }

  setOnArchiveButtonClick(onObjectClick) {
    this.getElement().querySelector(`.card__btn--archive`)
    .addEventListener(`click`, onObjectClick);
  }
}
