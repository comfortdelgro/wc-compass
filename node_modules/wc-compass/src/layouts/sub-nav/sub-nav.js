export class CdgSubNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-sub-nav');
  }
}
