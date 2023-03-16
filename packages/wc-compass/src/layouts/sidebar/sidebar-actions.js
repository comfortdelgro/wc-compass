export class CdgSidebarActions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-sidebar-actions');
  }
}
