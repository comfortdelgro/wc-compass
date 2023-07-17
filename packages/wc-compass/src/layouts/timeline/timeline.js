import {CdgBaseComponent} from '../../shared/base-component'

export class CdgTimeline extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-timeline')
  }
}
