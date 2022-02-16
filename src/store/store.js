class Store {
  // class that handle and manipulate with data

  constructor(data) {
    this.dataPartsCount = Math.ceil(data.length / 10);
    this.dataCopy = [...data];
    this.splittedData = this.splitDataToPages([...this.dataCopy]);
  }

  // sort data before splitting
  sortDataByValue = (value, isDescending) =>
    [...this.dataCopy].sort((s, f) => {
      if (value === 'firstName' || value === 'lastName') {
        f = f.name;
        s = s.name;
      }
      if (isDescending) {
        if (f[value].toLowerCase() < s[value].toLowerCase()) return 0;
        return -1;
      } else {
        if (f[value].toLowerCase() > s[value].toLowerCase()) return 0;
        return -1;
      }
    });


  splitDataToPages = newData => {
    let copy = [...newData];
    return [...Array(this.dataPartsCount).keys()].map(i => copy.splice(0, 10));
  };

  updateSplittedData = (value, isDescending) => {
    this.splittedData = this.splitDataToPages(
      this.sortDataByValue(value, isDescending)
    );
  };

  getRowById = rowId => {
    let requiredRow;
    this.dataCopy.map(row => {
      if (row.id === rowId) {
        requiredRow = row;
      }
    });
    return requiredRow;
  };

  updateDataCopy = (changedRow, rowId) => {
    let editedRow = this.getRowById(rowId);
    editedRow.name.firstName = changedRow[0];
    editedRow.name.lastName = changedRow[1];
    editedRow.about = changedRow[2];
    editedRow.eyeColor = changedRow[3];
  };

  getSplittedDataForCurrentPage = currentPage =>
    this.splittedData[currentPage - 1];

  // return data without sorting
  getOriginalSortedData = currentPage => {
    this.splittedData = this.splitDataToPages(this.dataCopy);
    return this.getSplittedDataForCurrentPage(currentPage);
  };
}
