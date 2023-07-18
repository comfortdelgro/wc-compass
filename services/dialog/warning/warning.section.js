import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './warning.section.html'

export class CdgDialogWarningSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showWarningButton = this.querySelector('#showWarningButton')

    showWarningButton.addEventListener('click', this.showWarning.bind(this))
  }

  showWarning() {
    const dialog = cdgDialogService.warning({
      dialogTitle: 'Are you sure you want to delete this deal?',
      message: 'Only admin users can restore deleted deals.',
      executeLabel: 'Delete',
    })

    dialog.addEventListener('close', (event) => {
      cdgToastService.toast(
        'User says: ' + (event.detail ? 'Yes, delete it!' : 'Cancel'),
      )
    })
  }
}
