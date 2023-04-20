import {CdgBaseComponent} from '../../../shared/base-component'
import template from './loading-local.html'

export class CdgLoadingLocal extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const button = this.querySelector('#local-button')
    button.addEventListener('click', this.showLocal.bind(this))
  }

  showLocal() {
    const host = document.querySelector('.page-container')
    const loadingId = cdgLoadingService.show('local', host)
    setTimeout(() => {
      cdgLoadingService.hide(loadingId)
    }, 3000)
  }
}
