class ToggleMenu {
  isColumnHide = [false, false, false, false];
  constructor() {
    this.menuList = document.getElementById('columns-hide-list');

    this.appendColumnsItems(this.createColumnsItems());
  }

  appendColumnsItems = items => {
    items.map(i => this.menuList.appendChild(i));
  };

  createColumnsItems = () => {
    let headers = [...document.querySelectorAll('th')].map(
      h => h.childNodes[1].childNodes[1].innerText
    );

    let columnItems = headers.map((h, i) => {
      let label = document.createElement('label');
      let input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'checkbox'
      input.checked = true;

      input.addEventListener('change', e => {
        e.currentTarget.checked ? this.showColumn(i) : this.hideColumn(i);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(h));
      return helper.wrapWithLi(label);
    });
    return columnItems;
  };

  showColumn = index => {
    this.cells = [...document.querySelectorAll('td, th')];
    this.cells
      .filter(cell => {
        return cell.cellIndex === index;
      })
      .map(cell => {
        cell.style.display = '';
      });

    this.isColumnHide[index] = false;
  };

  hideColumn = index => {
    this.cells = [...document.querySelectorAll('td, th')];
    this.cells
      .filter(cell => {
        return cell.cellIndex === index;
      })
      .map(cell => {
        cell.style.display = 'none';
      });

    this.isColumnHide[index] = true;
  };
}
