import {createMenuListTemlate} from "./components/menu-list";
import {createBoardTemplate} from "./components/board";
import {createFilterPanelTemplate} from "./components/filter-panel";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createTaskCardTemlate} from "./components/task-card";
import {createTaskEditTemplate} from "./components/task-edit";

const CARDS_NUMBER = 3;

const renderSection = (placeInDocument, section, position = `beforeend`) => {
  placeInDocument.insertAdjacentHTML(position, section);
};

const pageMain = document.querySelector(`.main`);
const controlMenu = pageMain.querySelector(`.main__control`);

renderSection(controlMenu, createMenuListTemlate());
renderSection(pageMain, createFilterPanelTemplate());
renderSection(pageMain, createBoardTemplate());

const taskBoard = pageMain.querySelector(`.board`);
const taskListBoard = pageMain.querySelector(`.board__tasks`);

renderSection(taskListBoard, createTaskEditTemplate());

for (let i = 0; i < CARDS_NUMBER; i++) {
  renderSection(taskListBoard, createTaskCardTemlate());
}

renderSection(taskBoard, createLoadMoreButtonTemplate());
