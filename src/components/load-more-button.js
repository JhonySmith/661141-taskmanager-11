import {AbstractComponent} from "./abstract-component.js";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setOnClick(onObjectClick) {
    this.getElement().addEventListener(`click`, onObjectClick);
  }
}
