import {CdgDocumentComponent} from '../../shared/document-component'
import template from './lazy-load-image.html'

export class CdgLazyLoadImageDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }
}
