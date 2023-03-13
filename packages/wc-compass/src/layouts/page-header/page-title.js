export class CdgPageTitle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-page-title');
  }
}
