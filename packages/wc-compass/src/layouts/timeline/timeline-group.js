import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTimelineGroup extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-timeline-group')
  }
}
