import {createMenuListTemlate} from "./components/menu-list";
import {createBoardTemplate} from "./components/board";
import {createFilterPanelTemplate} from "./components/filter-panel";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createTaskCardTemlate} from "./components/task-card";
import {createTaskEditTemplate} from "./components/task-edit";
import {generateTasksArray} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
const CARDS_NUMBER = 22;
const CARDS_NUMBER_STEP = 8;

const tasks = generateTasksArray(CARDS_NUMBER);
const filters = generateFilters();

const renderSection = (placeInDocument, section, position = `beforeend`) => {
  placeInDocument.insertAdjacentHTML(position, section);
};

const pageMain = document.querySelector(`.main`);
const controlMenu = pageMain.querySelector(`.main__control`);

renderSection(controlMenu, createMenuListTemlate());
renderSection(pageMain, createFilterPanelTemplate(filters));
renderSection(pageMain, createBoardTemplate());

const taskBoard = pageMain.querySelector(`.board`);
const taskListBoard = pageMain.querySelector(`.board__tasks`);

renderSection(taskListBoard, createTaskEditTemplate(tasks[0]));

let showingTasksCount = CARDS_NUMBER_STEP;

tasks.slice(1, showingTasksCount)
  .forEach((task) => renderSection(taskListBoard, createTaskCardTemlate(task), `beforeend`));

renderSection(taskBoard, createLoadMoreButtonTemplate());

const loadMoreButton = taskBoard.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + CARDS_NUMBER_STEP;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => renderSection(taskListBoard, createTaskCardTemlate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
