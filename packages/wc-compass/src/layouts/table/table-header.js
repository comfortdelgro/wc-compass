export class CdgTableHead extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role','thead')
  }
  connectedCallback() {
    this.classList.add('cdg-talbe-head');
  }
}


