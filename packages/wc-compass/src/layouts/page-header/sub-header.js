export class CdgSubHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-sub-header');
  }
}
