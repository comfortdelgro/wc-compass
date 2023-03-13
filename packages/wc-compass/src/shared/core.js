export class CdgIconSize extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  get size() {
    return Number(this.getAttribute('size')) || 24;
  }

  set size(size) {
    this.setAttribute('size', size);
  }

  constructor() {
    super();
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'size':
        this.addCustomSize();
        break;

      default:
        break;
    }
  }

  addCustomSize() {
    if (this.hasAttribute('size')) {
      const size = this.getAttribute('size');
      this.style.width = size + 'px';
      this.style.height = size + 'px';
      this.style.fontSize = size * 0.333334 + 'px';
    }
  }
}
