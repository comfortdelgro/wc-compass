import {CdgDocumentComponent} from '../../shared/document-component'
import template from './scroll-to-load.html'

export class CdgScrollToLoadDemo extends CdgDocumentComponent {
  color = ''

  colorConfig

  constructor() {
    super()
    this.template = template
  }

  onInit() {}
}
