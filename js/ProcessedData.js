class ProcessedData {
  constructor(data) {
    this.dataPartsCount = Math.ceil(data.length / 10);
    this.dataCopy = [...data];
    this.splittedData = this.splitDataToPages([...this.dataCopy]);
  }

  sortDataByValue = (value, isAscending) =>
    this.dataCopy.sort((s, f) => {
      if (value === 'firstName' || value === 'lastName') {
        f = f.name;
        s = s.name;
      }
      if (isAscending) {
        if (f[value].toLowerCase() < s[value].toLowerCase()) return 0;
        return -1;
      } else {
        if (f[value].toLowerCase() > s[value].toLowerCase()) return 0;
        return -1;
      }
    });

  splitDataToPages = newData => {
    let dataCopy = [...newData];
    return [...Array(this.dataPartsCount).keys()].map(i =>
      dataCopy.splice(0, 10)
    );
  };

  updateSplittedData = (value, isAscending) => {
    this.sortDataByValue(value, isAscending);

    this.splittedData = this.splitDataToPages(this.dataCopy);
  };

  updateDataCopy = (changedRow, currentPage, rowIndex) => {
    let editedRow = this.dataCopy[(currentPage - 1) * 10 + rowIndex - 1];
    editedRow.name.firstName = changedRow[0];
    editedRow.name.lastName = changedRow[1];
    editedRow.about = changedRow[2];
    editedRow.eyeColor = changedRow[3];
    this.dataCopy[(currentPage - 1) * 10 + rowIndex - 1] = editedRow;
  };
}
