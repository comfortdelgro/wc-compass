export class CdgLoading extends HTMLElement {
  get text() {
    return this.getAttribute('text');
  }

  set text(text) {
    return this.setAttribute('text', text);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.text) {
      this.classList.add('cdg-loading');
      const text = document.createElement('div');
      text.classList.add('spinner-text');
      text.textContent = this.text;
      this.appendChild(text);
    }
  }
}
