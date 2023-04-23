import {CdgBaseComponent} from '../../../shared/base-component'
import template from './alert.section.html'

export class CdgDialogAlertSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showAlertButton = this.querySelector('#showAlertButton')
    const showAlertWithTitleButton = this.querySelector(
      '#showAlertWithTitleButton',
    )

    showAlertButton.addEventListener('click', this.showAlert.bind(this))
    showAlertWithTitleButton.addEventListener(
      'click',
      this.showAlertWithTitle.bind(this),
    )
  }

  showAlert() {
    cdgDialogService.alert({
      message: 'This is a message that let you know everything is ok!',
    })
  }

  showAlertWithTitle() {
    cdgDialogService.alert({
      dialogTitle: 'Title of this alert',
      message: 'This is a message that let you know everything is ok!',
    })
  }
}
