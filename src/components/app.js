// main file that initiate our application

const personsTable = document.getElementById('persons');
const paginationArea = document.getElementById('pagination');

const store = new Store(data);
const toggleMenu = new ToggleMenu();
const table = new Table(personsTable);
table.updateTableContent(store.splittedData[0]);

const removeSorting = new RemoveSorting();
const pagination = new Pagination(paginationArea);
