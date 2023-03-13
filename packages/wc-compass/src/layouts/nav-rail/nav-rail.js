export class CdgNavRail extends HTMLElement {
  container;

  static get observedAttributes() {
    return ['open'];
  }

  get open() {
    return this.getAttribute('open') === 'true';
  }

  set open(open) {
    this.setAttribute('open', open);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-nav-rail');
    this.tabIndex = 0;
    this.container = document.createElement('div');
    this.container.classList.add('cdg-nav-rail-inner');
    this.container.innerHTML = this.innerHTML;

    // Clear all
    this.textContent = '';
    this.appendChild(this.container);

    this.addEventListener('blur', this.handleBlur.bind(this));
  }

  attributeChangedCallback(attr) {
    if (attr === 'open') {
      if (this.open) {
        this.focus();
      } else {
        document.body.focus();
      }
    }
  }

  handleBlur() {
    requestAnimationFrame(() => {
      if (!this.contains(document.activeElement)) {
        this.open = false;
      }
    });
  }
}
