export class CdgTableHeadCell extends HTMLElement {
  get width() {
    return this.hasAttribute('width')
  }

  set width(value) {
    this.style.width = value || 'auto'
  }

  static get observedAttributes() {
    return ['width']
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-table-head-cell')
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue === newValue) return

    if (attr === 'width') {
      this.width = this.getAttribute('width')
    }
  }
}
