export class CdgAlert extends HTMLElement {
  type = 'info';
  alignment = 'start';
  icon;
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-alert');
  }
}
