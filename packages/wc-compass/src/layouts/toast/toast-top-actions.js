export class CdgToastTopActions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-toast-top-actions');
  }
}
