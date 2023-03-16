export class CdgSidebarBody extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-sidebar-body');
  }
}
