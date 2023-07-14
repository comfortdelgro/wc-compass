import {CdgBaseComponent} from '../../shared/base-component'

export class CdgDialogActions extends CdgBaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-dialog-actions')
  }
}
