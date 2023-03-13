export class CdgCardActivity extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-card-activity');
  }
}
