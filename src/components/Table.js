// create and update table content
class Table {
  isTableSorted = false;
  currentSortedColumn = null;
  isDescending = null;
  editingRowId = null;
  currentPage = 1;

  constructor(personsTable) {
    this.table = personsTable;
    this.headers = document.querySelectorAll('th');
    [...this.headers].map(s =>
      s.addEventListener('click', this.sortTableByColumn)
    );
  }

  // calling form for editing row data
  handleRowClick = e => {
    let rowId = e.currentTarget.id;
    this.editingRowId = rowId;
    e.currentTarget.className = 'editing-row';
    let [firstName, lastName, about, eyeColor] = [...e.currentTarget.cells].map(
      cell => {
        if (cell.cellIndex === 3)
          return cell.childNodes[0].childNodes[0].style.backgroundColor;
        return cell.innerText;
      }
    );
    new Form(rowId, firstName, lastName, about, eyeColor);

    [...personsTable.rows]
      .slice(1)
      .map(r => r.removeEventListener('click', this.handleRowClick));
  };

  // add row to end of table
  appendRow = ({ name: { firstName, lastName }, about, eyeColor, id }) => {
    let newRow = this.table.insertRow(-1);
    newRow.id = id;
    if (newRow.id === this.editingRowId) newRow.className = 'editing-row';

    if (this.editingRowId === null)
      newRow.addEventListener('click', this.handleRowClick);

    let values = [firstName, lastName, about, eyeColor].map((v, i) => {
      if (i === 3) {
        let div = document.createElement('div');
        div.style.textAlign = 'center';
        let colorCircle = document.createElement('span');
        colorCircle.className = 'eyeColor';
        colorCircle.style.backgroundColor = eyeColor;
        div.appendChild(colorCircle);
        return div;
      }
      let text = document.createTextNode(v);
      if (i === 2) {
        let div = document.createElement('div');
        div.className = 'about';
        div.appendChild(text);
        return div;
      }
      return text;
    });

    values.map((v, i) => {
      newRow.insertCell(i).appendChild(v);
      if (toggleMenu.isColumnHide[i]) newRow.cells[i].style.display = 'none';
    });
  };

  // render table with given data
  updateTableContent = newPersonsData => {
    if (this.table.rows.length > 1) this.#deleteTableRows();
    newPersonsData.map(p => this.appendRow(p));
  };

  sortTableByColumn = e => {
    let columnId = e.currentTarget.id;

    this.isTableSorted = true;

    if (this.currentSortedColumn === columnId) {
      this.isDescending = !this.isDescending;
      this.#setSwitcherIcon(columnId);
    } else {
      this.#setSwitcherIcon(columnId);
      this.currentSortedColumn = columnId;
      this.isDescending = true;
      this.#setSwitcherIcon(columnId);
    }

    this.#deleteTableRows();

    store.updateSplittedData(columnId, this.isDescending);

    this.updateTableContent(
      store.getSplittedDataForCurrentPage(this.currentPage)
    );
  };

  // return table to original state
  removeSorting = () => {
    this.updateTableContent(store.getOriginalSortedData(this.currentPage));
    let header = document.getElementById(this.currentSortedColumn);
    header.childNodes[1].childNodes[3].innerHTML = '▶';
    this.isTableSorted = false;
  };

  #deleteTableRows = () => {
    [...this.table.rows].slice(1).map(r => r.remove());
  };

  #setSwitcherIcon = columnId => {
    if (columnId === this.currentSortedColumn) {
      let header = document.getElementById(columnId);
      if (this.isDescending) header.childNodes[1].childNodes[3].innerHTML = '▼';
      else header.childNodes[1].childNodes[3].innerHTML = '▲';
    } else if (this.currentSortedColumn != null) {
      let header = document.getElementById(this.currentSortedColumn);
      header.childNodes[1].childNodes[3].innerHTML = '▶';
    }
  };
}
