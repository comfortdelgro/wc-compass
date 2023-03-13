export class CdgTimelineCardTime extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-card-time');
    const icon = document.createElement('cdg-icon');
    icon.setAttribute('name', 'clock');
    icon.setAttribute('size', '16');
    this.prepend(icon);
  }
}
