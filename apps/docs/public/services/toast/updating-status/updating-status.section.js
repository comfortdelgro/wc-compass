import {CdgBaseComponent} from '../../../shared/base-component'
import template from './updating-status.section.html'

export class CdgUpdatingStatusSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const showToastButton = this.querySelector('#showToastButton')

    showToastButton.addEventListener('click', this.showToast.bind(this))
  }

  showToast() {
    const toast =
      this.querySelector('#myToast').content.firstElementChild.cloneNode(true)
    const toastSuccess =
      this.querySelector(
        '#myCompleteToast',
      ).content.firstElementChild.cloneNode(true)

    const executeButton = toast.querySelector('#toast-stop-button')
    const okButton = toastSuccess.querySelector('#toast-ok-button')

    const id = 'header' + new Date().getTime()

    executeButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })

    okButton.addEventListener('click', () => {
      cdgToastService.close(id)
    })

    cdgToastService.show(id, toast, {
      autoHideAfter: 0,
    })

    setTimeout(() => {
      cdgToastService.update(id, toastSuccess)
    }, 3000)
  }
}
