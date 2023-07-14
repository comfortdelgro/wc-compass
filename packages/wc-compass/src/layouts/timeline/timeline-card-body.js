import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTimelineCardBody extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-card-body')
  }
}
