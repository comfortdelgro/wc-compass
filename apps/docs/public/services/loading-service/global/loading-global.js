import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './loading-global.html'

export class CdgLoadingGlobal extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const button = this.querySelector('#global-button')
    button.addEventListener('click', this.showLocal.bind(this))
  }

  showLocal() {
    const loadingId = cdgLoadingService.show('global')
    setTimeout(() => {
      cdgLoadingService.hide(loadingId)
    }, 3000)
  }
}
