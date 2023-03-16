export class CdgToastTitle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-toast-title');
  }
}
