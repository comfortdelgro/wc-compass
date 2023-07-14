import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTimelineCard extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-card')
  }
}
