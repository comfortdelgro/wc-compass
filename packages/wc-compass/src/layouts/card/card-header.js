export class CdgCardHeader extends HTMLElement {
  get title() {
    return this.getAttribute('title');
  }

  set title(title) {
    this.setAttribute('title', title);
  }

  titleElement;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['title'];
  }

  connectedCallback() {
    this.classList.add('cdg-card-header');
    this.titleElement = document.createElement('h3');
    this.titleElement.classList.add('cdg-card-title');
    this.titleElement.textContent = this.title;
    this.prepend(this.titleElement);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'title') {
      if (this.titleElement) {
        this.titleElement.textContent = newValue;
      }
    }
  }
}
