import {CdgBaseComponent} from '../../../shared/base-component'
import template from './large-modal.section.html'

export class CdgModalLargeSection extends CdgBaseComponent {
  modal

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const largeModalButton = this.querySelector('#largeModalButton')
    largeModalButton.addEventListener('click', this.showLarge.bind(this))

    this.modal = document
      .querySelector('[for="largeModal"]')
      .content.firstElementChild.cloneNode(true)
    const cancelButton = this.modal.querySelector('#cancelButton')
    const okButton = this.modal.querySelector('#okButton')

    this.modal.addEventListener('close', () => {
      cdgToastService.toast('Modal is closed!')
    })

    okButton.addEventListener('click', () => {
      const confirm = cdgDialogService.confirm({
        dialogTitle: 'Do you really want to approve it?',
        message: 'You can not rollback this action anymore.',
        executeLabel: 'Yeah, do it!',
      })

      confirm.addEventListener('close', (event) => {
        cdgToastService.toast(
          'User says: ' + (event.detail ? 'Yeah, do it!' : 'Cancel'),
        )
        if (event.detail) {
          // Going to close both
          this.modal.close()
        }
      })
    })

    cancelButton.addEventListener('click', () => {
      this.modal.close()
      cdgToastService.toast("You've cancelled it!")
    })

    const sizeDropdown = document.querySelector('#sizing')
    sizeDropdown.addEventListener('onchangevalue', (event) => {
      this.modal.setAttribute('size', event.detail)
    })
  }

  showLarge() {
    cdgDialogService.show('sampleLargeModal', this.modal)
  }
}
