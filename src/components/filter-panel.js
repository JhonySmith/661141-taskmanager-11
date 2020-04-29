import {AbstractComponent} from "./abstract-component.js";

const defaultFilterName = `all`;

const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  const isChecked = (name.toLowerCase() === defaultFilterName);

  return (
    `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${ isChecked ? `checked` : ``}
        />
        <label for="filter__${name}" class="filter__label">
          ${name} <span class="filter__${name}-count">${count}</span></label
        >`
  );
};

const createFilterPanelTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};

export default class FilterPanel extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterPanelTemplate(this._filters);
  }
}
