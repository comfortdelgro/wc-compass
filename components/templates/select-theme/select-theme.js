import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './selecting-theme-modal.html'

export class CdgSelectThemeDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.useTableOfContent = false
    this.template = template
  }

  onInit() {
    const btnSelectTheme = this.querySelector('#btnSelectTheme')
    console.log(btnSelectTheme)
    const themeModal =
      this.querySelector(
        '#selectThemeModal',
      ).content.firstElementChild.cloneNode(true)

    const startButton = themeModal.querySelector('#startButton')

    startButton.addEventListener('click', () => {
      themeModal.close()
    })

    btnSelectTheme.addEventListener('click', () => {
      cdgDialogService.show('selectThemeModal', themeModal)
    })
  }
}
