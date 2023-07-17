import {CdgBaseComponent} from '../../shared/base-component'

export class CdgProgress extends CdgBaseComponent {
  percentBar

  static get observedAttributes() {
    return ['percentage']
  }

  get percentage() {
    return Number(this.getAttribute('percentage'))
  }

  set percentage(percentage) {
    if (this.percentBar) {
      this.percentBar.style.width = percentage + '%'
    }
    return this.setAttribute('percentage', percentage)
  }

  get color() {
    return this.getAttribute('color')
  }

  set color(color) {
    if (this.percentBar) {
      this.percentBar.style.backgroundColor = color
    }
    return this.setAttribute('color', color)
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.classList.add('cdg-progress')
    this.percentBar = document.createElement('div')
    this.percentBar.classList.add('cdg-progress-percent')
    this.appendChild(this.percentBar)

    // Initial states on view
    this.percentage = this.getAttribute('percentage')

    if (this.getAttribute('color')) {
      this.color = this.getAttribute('color')
    }

    if (isNaN(this.percentage)) {
      this.showAsIndetermindate()
    }
  }

  showAsIndetermindate() {
    this.percentBar.classList.add('indeterminate')
    this.percentBar.style.width = '100%'
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === 'percentage') {
      if (!isNaN(newValue)) {
        if (this.percentBar) {
          this.percentBar.classList.remove('indeterminate')
          this.percentBar.style.width = newValue + '%'
        }
      }
    }
  }
}
