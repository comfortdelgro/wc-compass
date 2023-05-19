import {CdgLoop} from '@comfortdelgro/wc-compass/src/shared/for-loop'
import {CdgDocumentComponent} from '../../../shared/document-component'
import template from './default-for-loop.section.html'

export class CdgForLoopDefaultDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const loopContainer = this.querySelector('.my-custom-loop-container')
    if (loopContainer) {
      const loop = new CdgLoop(loopContainer)
      loop.for(5)
    }
  }
}
