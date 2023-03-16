export class CdgToastMessage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-toast-message');
  }
}
