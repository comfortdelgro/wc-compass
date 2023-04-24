import {CdgBaseComponent} from '../../../shared/base-component'
import template from './confirm.section.html'

export class CdgDialogConfirmSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showConfirmButton = this.querySelector('#showConfirmButton')

    showConfirmButton.addEventListener('click', this.showConfirm.bind(this))
  }

  showConfirm() {
    const dialog = cdgDialogService.confirm({
      dialogTitle: 'Is this helpful?',
      message: 'This confirm dialog can help you to ask user.',
      executeLabel: 'Execute',
    })

    dialog.addEventListener('close', (event) => {
      cdgToastService.toast(
        'User says: ' + (event.detail ? 'Yes, delete it!' : 'Cancel'),
      )
    })
  }
}
