export class CdgPillBadge extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-pill-badge');
  }
}
