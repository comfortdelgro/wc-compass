export class CdgTableBody extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role','tbody')
  }
  connectedCallback() {
    this.classList.add('cdg-talbe-body');
  }
}


