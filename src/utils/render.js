export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderSection = (placeInDocument, component, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      placeInDocument.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      placeInDocument.append(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  parentElement.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
