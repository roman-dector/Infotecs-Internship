class Form {
  constructor(rowId, firstName, lastName, about, eyeColor) {
    this.app = document.getElementById('app');
    this.formId = Math.random();
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
    form.id = this.formId;

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

  onFormSubmit = e => {
    e.preventDefault();
    let currentRow = document.getElementById(this.#getCurrentRowId());
    let newRowData = [
      ...e.currentTarget.parentNode.parentNode.parentNode.elements,
    ]
      .slice(0, 4)
      .map(e => e.value);

    [...currentRow.cells].map((c, i) => {
      if (i === 2) {
        c.childNodes[0].innerText = newRowData[i];
        return;
      }
      if (i === 3) {
        c.childNodes[0].childNodes[0].style.backgroundColor = newRowData[i];
        return;
      }
      c.innerText = newRowData[i];
    });

    processedData.updateDataCopy(
      newRowData,
      table.currentPage,
      currentRow.rowIndex
    );

    if (table.isTableSorted)
      processedData.updateSplittedData(
        table.currentSortedColumn,
        table.isAscending
      );

    table.updateTableContent(processedData.splittedData[table.currentPage - 1]);

    this.removeFormFromScreen();
  };

  onFormCansel = e => {
    e.preventDefault();
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
