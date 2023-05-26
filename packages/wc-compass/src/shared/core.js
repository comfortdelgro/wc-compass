export class CdgIconSize extends HTMLElement {
  get size() {
    return Number(this.getAttribute('size')) || 24
  }

  set size(size) {
    this.setAttribute('size', size)
  }

  constructor() {
    super()
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'size':
        this.addCustomSize()
        break

      default:
        break
    }
  }

  addCustomSize() {
    if (this.hasAttribute('size')) {
      const size = this.getAttribute('size')
      this.style.width = size + 'px'
      this.style.height = size + 'px'
      if (this.tagName.toLowerCase() !== 'cdg-avatar') {
        this.style.fontSize = size + 'px'
      } else {
        this.style.fontSize = size * 0.4 + 'px'
      }
    }
  }
}
