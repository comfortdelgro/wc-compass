export class CdgAlertContent extends HTMLElement {
  alignment = 'start';

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-alert-content');
  }
}
