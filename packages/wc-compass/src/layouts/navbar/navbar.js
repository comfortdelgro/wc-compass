export class CdgNavbar extends HTMLElement {
  container
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-navbar')
    this.container = document.createElement('div')
    this.container.classList.add('cdg-navbar-inner', 'cdg-container')
    this.container.innerHTML = this.innerHTML

    // Clear all
    this.textContent = ''
    this.appendChild(this.container)
  }
}
