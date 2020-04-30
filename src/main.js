import MenuListComponent from "./components/menu-list";
import BoardComponent from "./components/board";
import BoardController from "./controllers/board.js";
import FilterPanelComponent from "./components/filter-panel";
import {generateTasksArray} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {renderSection, RenderPosition} from "./utils/render.js";


const CARDS_NUMBER = 22;

const tasks = generateTasksArray(CARDS_NUMBER);

const filters = generateFilters();

const pageMain = document.querySelector(`.main`);
const controlMenu = pageMain.querySelector(`.main__control`);

renderSection(controlMenu, new MenuListComponent(), RenderPosition.BEFOREEND);
renderSection(pageMain, new FilterPanelComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

renderSection(pageMain, boardComponent, RenderPosition.BEFOREEND);

boardController.render(tasks);
