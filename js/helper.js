const helper = {
  wrapWithDiv: node => {
    let div = document.createElement('div');
    div.appendChild(node);
    return div;
  },

  wrapWithBold: node => {
    let b = document.createElement('b');
    b.appendChild(node);
    return b;
  },

  wrapWithOption: node => {
    let opt = document.createElement('option');
    opt.appendChild(node);
    return opt;
  },

  wrapWithLi: node => {
    let li = document.createElement('li');
    li.appendChild(node);
    return li;
  },

};
