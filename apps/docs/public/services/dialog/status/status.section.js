import {CdgBaseComponent} from '../../../shared/base-component'
import template from './status.section.html'

export class CdgDialogStatusSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showSuccessButton = this.querySelector('#showSuccessButton')
    const showErrorButton = this.querySelector('#showErrorButton')

    showSuccessButton.addEventListener('click', this.showSuccess.bind(this))
    showErrorButton.addEventListener('click', this.showError.bind(this))
  }

  showSuccess() {
    cdgDialogService.showStatus({
      status: 'success',
      title: 'Successfully Completed',
      message: 'Lorem ipsum dolor sit amet, consectetur',
      executeLabel: 'Okay',
    })
  }

  showError() {
    cdgDialogService.showStatus({
      status: 'error',
      title: 'Sorry something went wrong',
      message: 'Lorem ipsum dolor sit amet, consectetur',
      executeLabel: 'Okay',
    })
  }
}
