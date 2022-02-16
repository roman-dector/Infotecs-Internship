class Table {
  isTableSorted = false;
  currentSortedColumn = null;
  isAscending = null;
  currentPage = 1;

  constructor(personsTable) {
    this.table = personsTable;
    this.switchers = document.getElementsByClassName('switcher');
    this.sortTableByColumn.bind(this);

    [...this.switchers].map(s =>
      s.addEventListener('click', this.sortTableByColumn)
    );
  }

  handleRowClick = e => {
    let rowId = e.currentTarget.id;
    e.currentTarget.className = 'editing-row';
    let [firstName, lastName, about, eyeColor] = [...e.currentTarget.cells].map(
      cell => {
        if (cell.cellIndex === 3)
          return cell.childNodes[0].childNodes[0].style.backgroundColor;
        return cell.innerText;
      }
    );
    let form = new Form(rowId, firstName, lastName, about, eyeColor);

    [...personsTable.rows]
      .slice(1)
      .map(r => r.removeEventListener('click', this.handleRowClick));
  };

  appendRow = ({ name: { firstName, lastName }, about, eyeColor }) => {
    let newRow = this.table.insertRow(-1);
    newRow.id = Math.random();
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

  updateTableContent = newPersonsData => {
    if (this.table.rows.length > 1) this.#deleteTableRows();
    newPersonsData.map(p => this.appendRow(p));
  };

  sortTableByColumn = e => {
    let columnId = e.currentTarget.id;

    this.isTableSorted = true;

    if (this.currentSortedColumn === columnId) {
      this.isAscending = !this.isAscending;
      this.#setSwitcherIcon(columnId);
    } else {
      this.#setSwitcherIcon(columnId);
      this.currentSortedColumn = columnId;
      this.isAscending = true;
      this.#setSwitcherIcon(columnId);
    }

    this.#deleteTableRows();

    processedData.updateSplittedData(columnId, this.isAscending);

    this.updateTableContent(processedData.splittedData[this.currentPage - 1]);
  };

  #deleteTableRows = () => {
    [...this.table.rows].slice(1).map(r => r.remove());
  };

  #setSwitcherIcon = switcherId => {
    if (switcherId === this.currentSortedColumn) {
      let switcher = document.getElementById(switcherId);
      if (this.isAscending) switcher.innerHTML = '▼';
      else switcher.innerHTML = '▲';
    } else if (this.currentSortedColumn != null) {
      let switcher = document.getElementById(this.currentSortedColumn);
      switcher.innerHTML = '▶';
    }
  };
}
