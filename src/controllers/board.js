import NoTaskComponent from "../components/no-task.js";
import LoadMoreButtonComponent from "../components/load-more-button";
import SortComponent, {SortType} from "../components/sort";
import TaskController from "../controllers/task.js";
import TasksComponent from "../components/tasks";
import {renderSection, RenderPosition, remove} from "../utils/render.js";

const CARDS_NUMBER_STEP = 8;

const renderTasks = (tasks, taskListElement, onDataChange, onViewChange, to, from = 0) => {
  return tasks.slice(from, to).map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  });
};

const getSortedTasks = (tasks, sortType) => {
  let sortedTasks = [];
  const copyOfTasks = [...tasks];

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = copyOfTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = copyOfTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    default:
      sortedTasks = copyOfTasks;
      break;
  }
  return sortedTasks;

};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingCards = CARDS_NUMBER_STEP;
    this._noTasksComponent = new NoTaskComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeClick(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      renderSection(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    renderSection(container, this._sortComponent, RenderPosition.BEFOREEND);
    renderSection(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    const newTasks = renderTasks(tasks, taskListElement, this._onDataChange, this._onViewChange, this._showingCards);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingCards >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();

    renderSection(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setOnClick(() => {
      const prevTasksCount = this._showingCards;
      const taskListElement = this._tasksComponent.getElement();

      this._showingCards = this._showingCards + CARDS_NUMBER_STEP;

      const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType());
      const newTasks = renderTasks(sortedTasks, taskListElement, this._onDataChange, this._onViewChange, this._showingCards, prevTasksCount);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingCards >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingCards = CARDS_NUMBER_STEP;

    const sortedTasks = getSortedTasks(this._tasks, sortType);
    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(sortedTasks, taskListElement, this._onDataChange, this._onViewChange, this._showingCards);
    this._showedTaskControllers = newTasks;
    remove(this._loadMoreButtonComponent);


    this._renderLoadMoreButton();
  }
}
