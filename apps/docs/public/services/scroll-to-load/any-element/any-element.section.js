import {CdgBaseComponent} from '../../../shared/base-component'
import template from './any-element.section.html'

import {listenOnBottom} from '@comfortdelgro/wc-compass/src/shared/dom'

export class CdgAnyElementSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const wrapper = this.querySelector('.my-wrapper')
    listenOnBottom(wrapper)

    wrapper.addEventListener('bottom', () => {
      cdgToastService.toast('Bottom reached')
    })
  }
}
