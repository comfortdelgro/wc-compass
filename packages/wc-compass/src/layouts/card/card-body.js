export class CdgCardBody extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-card-body');
  }
}
