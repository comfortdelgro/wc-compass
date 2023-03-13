export class CdgModalActions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-modal-actions');
  }
}
