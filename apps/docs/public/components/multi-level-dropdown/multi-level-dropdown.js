import {CdgDocumentComponent} from '../../shared/document-component'
import template from './multi-level-dropdown.html'

export class CdgMultiLevelDropdownDemo extends CdgDocumentComponent {
  constructor() {
    super()
    this.template = template
  }

  onInit() {
    const radios = this.querySelectorAll('input[name="sample2"]')
    const dropdownMenu = this.querySelector('cdg-dropdown-menu')
    if (radios.length > 0) {
      radios.forEach((radio) => {
        radio.addEventListener('change', function change(params) {
          const value = params.target.value
          console.log(value)
          dropdownMenu.setAttribute('event', value)
        })
      })
    }
  }
}
