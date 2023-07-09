import {CdgBaseComponent} from '../../../shared/base-component'
import template from './any-element.section.html'

import {bottomReached} from '@comfortdelgro/wc-compass/src/shared/dom'

export class CdgAnyElementSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const wrapper = this.querySelector('.my-wrapper')
    bottomReached(wrapper)

    wrapper.addEventListener('bottom', () => {
      cdgToastService.toast('Bottom reached')
    })
  }
}
