// form for getting new value for row
class Form {
  constructor(rowId, firstName, lastName, about, eyeColor) {
    this.app = document.getElementById('app');
    this.currentRowId = rowId;

    this.app.appendChild(
      this.#createEditor(this.#createForm(firstName, lastName, about, eyeColor))
    );
  }

  #getCurrentRowId = () => this.currentRowId;

  #createEditor = form => {
    let div = helper.wrapWithDiv(form);
    div.className = 'editor';
    div.id = 'editor';
    return div;
  };

  #createForm = (firstName, lastName, about, eyeColor) => {
    let form = document.createElement('form');

    let firstNameForm = helper.wrapWithDiv(
      helper.wrapWithBold(document.createTextNode('Имя'))
    );
    firstNameForm.appendChild(document.createElement('br'));
    let firstNameInput = document.createElement('input');
    firstNameInput.value = firstName;
    firstNameForm.appendChild(firstNameInput);
    firstNameForm.className = 'firstNameForm';

    let lastNameForm = helper.wrapWithDiv(
      helper.wrapWithBold(document.createTextNode('Фамилия'))
    );
    lastNameForm.appendChild(document.createElement('br'));
    let lastNameInput = document.createElement('input');
    lastNameInput.value = lastName;
    lastNameForm.appendChild(lastNameInput);
    lastNameForm.className = 'lastNameForm';

    let aboutForm = helper.wrapWithDiv(
      helper.wrapWithBold(document.createTextNode('Описание'))
    );
    aboutForm.appendChild(document.createElement('br'));
    let aboutTextarea = document.createElement('textarea');
    aboutTextarea.value = about;
    aboutForm.appendChild(aboutTextarea);
    aboutForm.className = 'aboutForm';

    let eyeColorForm = helper.wrapWithDiv(
      helper.wrapWithBold(document.createTextNode('Цвет глаз '))
    );
    let select = document.createElement('select');

    ['blue', 'brown', 'green', 'red', 'gray'].map(color => {
      let option = helper.wrapWithOption(document.createTextNode(color));
      if (color === eyeColor) option.selected = 'selected';
      select.appendChild(option);
    });
    eyeColorForm.appendChild(select);
    eyeColorForm.className = 'eyeColorForm';

    let formSubmitButton = document.createElement('button');
    formSubmitButton.appendChild(document.createTextNode('Save'));
    formSubmitButton.addEventListener('click', this.onFormSubmit);
    let submit = helper.wrapWithDiv(formSubmitButton);
    submit.className = 'formButton';

    let formCanselButton = document.createElement('button');
    formCanselButton.appendChild(document.createTextNode('Cansel'));
    formCanselButton.addEventListener('click', this.onFormCansel);
    let cansel = helper.wrapWithDiv(formCanselButton);
    cansel.className = 'formButton';

    let buttons = helper.wrapWithDiv(submit);
    buttons.appendChild(cansel);
    buttons.style.display = 'flex';
    buttons.style.justifyContent = 'space-between';

    [firstNameForm, lastNameForm, aboutForm, eyeColorForm, buttons].map(e =>
      form.appendChild(e)
    );

    return form;
  };

  // on submit get new data, update store and rerender table
  onFormSubmit = e => {
    e.preventDefault();
    let newRowData = [
      ...e.currentTarget.parentNode.parentNode.parentNode.elements,
    ]
      .slice(0, 4)
      .map(e => e.value);

    store.updateDataCopy(newRowData, this.#getCurrentRowId());

    if (table.isTableSorted)
      store.updateSplittedData(table.currentSortedColumn, table.isDescending);

    table.editingRowId = null;

    table.updateTableContent(
      store.getSplittedDataForCurrentPage(table.currentPage)
    );

    this.removeFormFromScreen();
  };

  onFormCansel = e => {
    e.preventDefault();
    table.editingRowId = null;
    table.updateTableContent(
      store.getSplittedDataForCurrentPage(table.currentPage)
    );
    this.removeFormFromScreen();
  };

  removeFormFromScreen = () => {
    let editor = document.getElementById('editor');
    editor.remove();
    [...personsTable.rows]
      .slice(1)
      .map(r => r.addEventListener('click', table.handleRowClick));
  };
}
