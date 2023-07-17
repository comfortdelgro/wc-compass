import {CdgBaseComponent} from '../../shared/base-component'

const DROPDOWN_OPEN = `<cdg-dropdown
select-class="color-selector"
id="color-selector"
class="toolbar-selector"
>`
const DROPDOWN_CLOSE = `</cdg-dropdown>`

const DROPDOWN_OPTION = `
<cdg-dropdown-option
  value="{{value}}"
  current-color="{{value}}"
  selected="true"
></cdg-dropdown-option>`

export class CdgSelectColor extends CdgBaseComponent {
  static get observedAttributes() {
    return ['colors', 'selected']
  }

  get colors() {
    return this.getAttribute('colors').split(',') || []
  }

  set colors(colors) {
    this.setAttribute('colors', colors.join(','))
  }

  get selected() {
    return this.getAttribute('selected') || ''
  }

  set selected(selected) {
    this.setAttribute('selected', selected)
  }

  constructor() {
    super()
  }

  dropdown

  connectedCallback() {
    this.classList.add('cdg-select-color')
    this.attachSelect()
  }

  attributeChangedCallback(attr) {
    switch (attr) {
      case 'colors':
        break

      default:
        break
    }
  }

  attachSelect() {
    if (this.dropdown) {
      this.removeChild(this.dropdown)
    }
    const dropdown = DROPDOWN_OPEN + this.dropdownOptions() + DROPDOWN_CLOSE
    this.innerHTML = dropdown
    this.dropdown = this.querySelector('cdg-dropdown')
    this.dropdown.addEventListener('onchangevalue', (event) => {
      this.dispatchEvent(
        new CustomEvent('onchangevalue', {detail: event.detail}),
      )
    })
  }

  dropdownOptions() {
    let options = ''

    this.colors.forEach((color, index) => {
      let option = DROPDOWN_OPTION.replace(/{{value}}/g, color)
      if (!this.selected) {
        if (index !== 0) {
          option = option.replace('selected="true"', '')
        }
      } else if (this.selected !== color) {
        option = option.replace('selected="true"', '')
      }
      options += option
    })

    return options
  }
}
