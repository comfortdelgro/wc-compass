export class CdgCardActions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-card-actions');
  }
}
