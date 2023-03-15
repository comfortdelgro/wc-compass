export class CdgModalBody extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-modal-body');
  }
}
