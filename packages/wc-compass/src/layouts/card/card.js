export class CdgCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-card');
    // Make card focusable
    if (!this.hasAttribute('disabled')) {
      this.tabIndex = 0;
    }
  }
}
