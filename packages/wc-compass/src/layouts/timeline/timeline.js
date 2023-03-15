export class CdgTimeline extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-timeline');
  }
}
