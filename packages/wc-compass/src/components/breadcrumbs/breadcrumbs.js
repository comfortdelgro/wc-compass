export class CdgBreadCrumbs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-breadcrumbs');
  }
}
