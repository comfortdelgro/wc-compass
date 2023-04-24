import {CdgBaseComponent} from '../../../shared/base-component'
import template from './shade-tints.section.html'

export class CdgShadeTintsSection extends CdgBaseComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const samples = this.querySelectorAll('.sample-color')
    if (samples && samples.length) {
      samples.forEach((item) => {
        item.addEventListener('click', (event) => {
          const color = item.querySelector('.sample-color-code').textContent
          navigator.clipboard.writeText(color)
          cdgToastService.toast('Copied: ' + color)
        })
      })
    }
  }
}
