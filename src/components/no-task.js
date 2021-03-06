import AbstractComponent from "./abstract-component.js";

const createNoTaskTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};

export default class NoTask extends AbstractComponent {
  getTemplate() {
    return createNoTaskTemplate();
  }
}
