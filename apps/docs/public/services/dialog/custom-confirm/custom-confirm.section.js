import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './custom-confirm.section.html'

export class CdgDialogCustomConfirmSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showConfirmButton = this.querySelector('#showConfirmButton')

    showConfirmButton.addEventListener('click', this.showConfirm.bind(this))
  }

  showConfirm() {
    const content = document
      .querySelector('#customConfirmDialog')
      .content.firstElementChild.cloneNode(true)

    const textarea = content.querySelector('#sampleTextarea')

    const dialog = cdgDialogService.confirmCustom({
      content,
      executeLabel: 'Submit',
    })

    dialog.addEventListener('close', (event) => {
      cdgToastService.toast(
        event.detail
          ? 'Submit with message "' + textarea.value + '"'
          : 'Cancel',
      )
    })
  }
}
