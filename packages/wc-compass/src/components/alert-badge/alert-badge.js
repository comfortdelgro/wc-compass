import {CdgBaseComponent} from '../../shared/base-component'

export class CdgAlertBadge extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-alert-badge')
  }
}
