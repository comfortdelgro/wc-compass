import {CdgBaseDocsComponent} from '../../../shared/base-component'
import template from './count-textarea.section.html'

export class CdgCountTextareaSection extends CdgBaseDocsComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const wrapper = this.querySelector('.cdg-input-group')
    const textarea = this.querySelector('textarea')
    const count = this.querySelector('.cdg-input-char-count')
    textarea.addEventListener('input', (event) => {
      const length = event.target.value.length
      count.textContent = `${length}/50`
      if (length <= 50) {
        wrapper.classList.remove('error')
      } else {
        wrapper.classList.add('error')
      }
    })
  }
}
