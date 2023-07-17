import {CdgBaseDocsComponent} from '../../../shared/base-component'

import {REGEX_EMAIL} from '@comfortdelgro/wc-compass/src/shared/regex'

import template from './reg-email.section.html'

export class CdgRegEmailSection extends CdgBaseDocsComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const test1 = this.querySelector('#test1')
    const result1 = this.querySelector('#result1')
    result1.textContent = REGEX_EMAIL.test(test1.textContent)

    const test2 = this.querySelector('#test2')
    const result2 = this.querySelector('#result2')
    result2.textContent = REGEX_EMAIL.test(test2.textContent)
  }
}
