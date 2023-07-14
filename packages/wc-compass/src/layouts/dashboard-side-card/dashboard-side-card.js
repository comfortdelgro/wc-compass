import {CdgBaseComponent} from '../../shared/base-component'

export class CdgDashboardSideCard extends CdgBaseComponent {
  static get observedAttributes() {
    return ['title']
  }

  get title() {
    return this.getAttribute('title')
  }

  set title(title) {
    this.setAttribute('title', title)
  }

  titleElement
  bodyElement

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-dashboard-side-card')
    this.attachElements()
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'title') {
      if (this.titleElement) {
        this.titleElement.textContent = this.title
      }
    }
  }

  attachElements() {
    this.titleElement = document.createElement('div')
    this.titleElement.classList.add('side-card-header')
    this.titleElement.textContent = this.title

    this.bodyElement = document.createElement('div')
    this.bodyElement.classList.add('side-card-body')

    this.bodyElement.append(...this.childNodes)

    this.textContent = ''
    this.appendChild(this.titleElement)
    this.appendChild(this.bodyElement)
  }
}
