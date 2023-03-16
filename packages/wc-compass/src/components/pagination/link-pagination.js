export class CdgLinkPagination extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-pagination');
    this.classList.add('cdg-link-pagination');
  }
}
