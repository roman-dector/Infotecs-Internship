const app = document.getElementById('app');
const personsTable = document.getElementById('persons');
const pagination = document.getElementById('pagination');

const processedData = new ProcessedData(data);
const toggleMenu = new ToggleMenu();
const table = new Table(personsTable);
table.updateTableContent(processedData.splittedData[0]);

let p = new Pagination(pagination);
