import NoTaskComponent from "../components/no-task.js";
import LoadMoreButtonComponent from "../components/load-more-button";
import SortComponent from "../components/sort";
import TaskComponent from "../components/task-card";
import TasksComponent from "../components/tasks";
import TaskEditComponent from "../components/task-edit";
import {renderSection, RenderPosition, replace, remove} from "../utils/render.js";

const CARDS_NUMBER_STEP = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  taskComponent.setOnClick(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setOnSubmit((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderSection(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTaskComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      renderSection(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    renderSection(container, this._sortComponent, RenderPosition.BEFOREEND);
    renderSection(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = CARDS_NUMBER_STEP;
    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    renderSection(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setOnClick(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + CARDS_NUMBER_STEP;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => {
          renderTask(taskListElement, task);
        });

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}