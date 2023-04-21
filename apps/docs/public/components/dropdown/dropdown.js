import {CdgDocumentComponent} from '../../shared/document-component'
import template from './dropdown.html'

export class CdgDropdownDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const radios = this.querySelectorAll('input[name="sample2"]')
    const dropdown = this.querySelector('cdg-dropdown#disabledDropdown')
    if (radios.length > 0) {
      radios.forEach((radio) => {
        radio.addEventListener('change', function change(params) {
          const value = params.target.value
          if (value === '0') {
            dropdown.setAttribute('disabled', 'true')
          } else {
            dropdown.removeAttribute('disabled')
          }
        })
      })
    }
  }
}
