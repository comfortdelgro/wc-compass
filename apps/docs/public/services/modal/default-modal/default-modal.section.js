import {CdgBaseComponent} from '../../../shared/base-component'
import template from './default-modal.section.html'

export class CdgModalDefaultSection extends CdgBaseComponent {
  modal

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const defaultModalButton = this.querySelector('#defaultModalButton')
    defaultModalButton.addEventListener('click', this.showDefault.bind(this))

    this.modal = document
      .querySelector('[for="defaultModal"]')
      .content.firstElementChild.cloneNode(true)
    const cancelButton = this.modal.querySelector('#cancelButton')
    const okButton = this.modal.querySelector('#okButton')

    this.modal.addEventListener('close', () => {
      cdgToastService.toast('Dialog is closed!')
    })

    okButton.addEventListener('click', () => {
      this.modal.close()
      cdgToastService.toast("You've approved it!")
    })

    cancelButton.addEventListener('click', () => {
      this.modal.close()
      cdgToastService.toast("You've cancelled it!")
    })
  }

  showDefault() {
    cdgDialogService.show('sampleDefaultModal', this.modal)
  }
}
