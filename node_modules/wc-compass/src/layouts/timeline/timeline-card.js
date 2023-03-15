export class CdgTimelineCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-card');
  }
}
