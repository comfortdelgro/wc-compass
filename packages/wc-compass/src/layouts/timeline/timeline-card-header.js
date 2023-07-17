import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTimelineCardHeader extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-card-header')
  }
}
