export class CdgInlineLoading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-inline-loading');

    if (this.hasAttribute('size')) {
      this.classList.add(this.getAttribute('size'));
    }

    const dot = document.createElement('div');
    dot.classList.add('loading-dot');
    this.appendChild(dot);
  }
}
