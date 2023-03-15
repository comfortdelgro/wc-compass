export class CdgPortalNavbar extends HTMLElement {
  container;
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-portal-navbar');
    this.container = document.createElement('div');
    this.container.classList.add('cdg-portal-navbar-inner');
    this.container.innerHTML = this.innerHTML;

    // Clear all
    this.textContent = '';
    this.appendChild(this.container);
  }
}
