export class CdgTableCell extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role','td')
  }
  connectedCallback() {
    this.classList.add('cdg-talbe-cell');
  }
}


