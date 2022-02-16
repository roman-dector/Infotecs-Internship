class Pagination {
  constructor(pagination) {
    this.pagination = pagination;
    this.createButtonsArray();
  }

  createButtonsArray = () => {
    let pagesCount = Math.ceil(data.length / 10);
    [...Array(pagesCount).keys()].map(i => this.#addButton(i + 1));
  };

  #addButton = buttonNumber => {
    let button = document.createElement('button');
    button.addEventListener('click', this.onPageButtonClick);
    button.appendChild(document.createTextNode(buttonNumber));
    button.className = buttonNumber === 1 ? 'current-button' : 'button'
    this.pagination.appendChild(button);
  };

  onPageButtonClick = e => {
    debugger;
    [...e.currentTarget.parentNode.childNodes].map(
      node => (node.className = 'button')
    );
    e.currentTarget.className = 'current-button';
    let currentPage = parseInt(e.currentTarget.innerText);
    table.updateTableContent(processedData.splittedData[currentPage - 1]);
    table.currentPage = currentPage;
    debugger;
  };
}
