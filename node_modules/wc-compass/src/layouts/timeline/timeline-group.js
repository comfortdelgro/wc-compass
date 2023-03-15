export class CdgTimelineGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-group');
  }
}
