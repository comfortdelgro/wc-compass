export class CdgPageHeaderRow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-page-header-row');
  }
}
