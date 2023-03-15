export class CdgPageHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-page-header');
  }
}
