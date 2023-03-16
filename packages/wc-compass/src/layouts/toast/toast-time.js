export class CdgToastTime extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-toast-time');
  }
}
