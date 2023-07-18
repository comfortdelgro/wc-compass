import {CdgBaseDocsComponent} from '../../../shared/base-component'

import {REGEX_PHONE_NUMBER} from '@comfortdelgro/wc-compass/src/shared/regex'

import template from './reg-phone.section.html'

export class CdgRegPhoneSection extends CdgBaseDocsComponent {
  content
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const test1 = this.querySelector('#test1')
    const result1 = this.querySelector('#result1')
    result1.textContent = REGEX_PHONE_NUMBER.test(test1.textContent)

    const test2 = this.querySelector('#test2')
    const result2 = this.querySelector('#result2')
    result2.textContent = REGEX_PHONE_NUMBER.test(test2.textContent)

    const test3 = this.querySelector('#test3')
    const result3 = this.querySelector('#result3')
    console.log(REGEX_PHONE_NUMBER.test(test3.textContent))
    result3.textContent = REGEX_PHONE_NUMBER.test(test3.textContent)
  }
}
