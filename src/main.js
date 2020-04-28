import MenuListComponent from "./components/menu-list";
import BoardComponent from "./components/board";
import FilterPanelComponent from "./components/filter-panel";
import LoadMoreButtonComponent from "./components/load-more-button";
import SortComponent from "./components/sort";
import TaskComponent from "./components/task-card";
import TasksComponent from "./components/tasks";
import TaskEditComponent from "./components/task-edit";
import {generateTasksArray} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {renderSection, RenderPosition} from "./utils.js";
import NoTaskComponent from "./components/no-task.js";

const CARDS_NUMBER = 22;
const CARDS_NUMBER_STEP = 8;

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderSection(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksInArchive = tasks.every((task) => task.isArchive);

  if (isAllTasksInArchive) {
    renderSection(boardComponent, new NoTaskComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  renderSection(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  renderSection(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListBoard = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = CARDS_NUMBER_STEP;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListBoard, task);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  renderSection(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + CARDS_NUMBER_STEP;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListBoard, task);
      });

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const tasks = generateTasksArray(CARDS_NUMBER);

const filters = generateFilters();

const pageMain = document.querySelector(`.main`);
const controlMenu = pageMain.querySelector(`.main__control`);

renderSection(controlMenu, new MenuListComponent().getElement(), RenderPosition.BEFOREEND);
renderSection(pageMain, new FilterPanelComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
renderSection(pageMain, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
