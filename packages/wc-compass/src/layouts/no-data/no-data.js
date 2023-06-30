export class CdgNoData extends HTMLElement {
  icon
  description
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-no-data')
    if (!this.icon) {
      this.icon = document.createElement('cdg-icon')
      this.icon.classList.add('cdg-no-data-icon')
      //   this.icon.setAttribute('source', 'host')
      this.icon.setAttribute('name', 'noData')
      this.appendChild(this.icon)
    }

    if (!this.description) {
      this.description = document.createElement('p')
      this.description.classList.add('cdg-no-data-description')
      this.description.textContent = this.getAttribute('description')
      this.appendChild(this.description)
    }
  }
}
